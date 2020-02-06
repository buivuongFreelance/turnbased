import React, { Component } from "react";

import { connect } from "react-redux";
import { selectScreenAPIInstance, selectScreenWidth, selectTranslator } from "../redux/screen/screen.selectors";
import { selectCurrentUser, selectBearer, selectAnonymousId, selectLang } from "../redux/storage/storage.selectors";

import { initHeader, addClientHeader, addBearerHeader, changeScreen, resetProposal, setNotifyProposal, setLanguage } from "../redux/screen/screen.actions";

import { createStructuredSelector } from "reselect";

import { withRouter } from "react-router";

import { IS_SCREEN_LOADING, NODE_ENV, IS_MOBILE, CLIENT_ROUTES } from "../config";
import CommonBase from "../components/common/CommonBase.component";
import CommonPageHolder from "../components/common/CommonPageHolder.component";
import { listCartStart, getOrderActiveStart, removeOrderActiveStart } from "../redux/order/order.actions";
import { createAnonymousId } from "../redux/storage/storage.actions";

import uuidV1 from "uuid/v1";

import { baseDB } from "../firebase/firebase.utils";
import CommonWindowConfirm from "../components/common/CommonWindowConfirm.component";
import { historyRedirect } from "../utils";
import { selectSelectedOrder, selectLoadingSelectedOrder } from "../redux/order/order.selectors";

const withApp = (Composed) => {
  class HOCApp extends Component {
    constructor() {
      super();
      this.events = [
        'resize', 'pageshow', 'load'
      ];

      this.notifySubscribers = this.notifySubscribers.bind(this);
      this.handleResponsive = this.handleResponsive.bind(this);

      this.unsubscribeFromProposal = null;
      this.state = {
        isOpenOrder: false
      }
    }
    componentDidMount() {
      const { initHeader, apiInstance, bearer, user, addBearerHeader, addClientHeader,
        listCartStart, anonymousId, createAnonymousId } = this.props;
      const pathname = this.props.history.location.pathname;

      if (user) {
        if (CLIENT_ROUTES.includes(pathname))
          return this.props.history.push('/');
      } else {
        if (pathname.includes('account'))
          return this.props.history.push('/signInAndSignUp');
      }

      window.scrollTo(0, 0);
      this.setLanguage();

      if (!apiInstance) {
        initHeader();
        if (!bearer) {
          addClientHeader();
          if (!anonymousId)
            createAnonymousId(uuidV1());
        } else if (bearer) {
          addBearerHeader(user.accessToken);
          if (pathname !== '/order/shipping'
            && pathname !== '/order/billing'
            && pathname !== '/order/payment')
            this.checkBefore();
          listCartStart(100, 0);
        }
      } else {
        if (bearer) {
          if (pathname !== '/order/shipping'
            && pathname !== '/order/billing'
            && pathname !== '/order/payment')
            this.checkBefore();
        }
      }

      if (user) {
        this.getFirebaseUser(user);
      }

      this.events.forEach(event =>
        window.addEventListener(event, this.notifySubscribers)
      )
    }
    renderConfirmModalOrder() {
      const { screenWidth, removeOrderActiveStart, listCartStart, selectedOrder, history } = this.props;
      const { isOpenOrder } = this.state;

      return <CommonWindowConfirm
        screenWidth={screenWidth}
        message="You just checkout. Do you want to continue ?"
        onOk={() => {
          historyRedirect({ history, uri: 'order/shipping' });
        }}
        onClose={() => {
          const { id } = selectedOrder;
          removeOrderActiveStart(id);
          listCartStart(100, 0);
          this.setState({ isOpenOrder: false });
        }}
        isOpen={isOpenOrder}
      />
    }
    setLanguage() {
      const { lang, setLanguage } = this.props;
      setLanguage(lang || 'en');
    }
    checkBefore() {
      this.props.getOrderActiveStart();
    }
    getFirebaseUser(user) {
      this.addFirebaseUser(user)
        .then(() => {
          const { id } = user;
          this.unsubscribeFromProposal = baseDB.collection('users').doc(id)
            .collection('proposals')
            .orderBy('date', 'desc')
            .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
              const pathname = this.props.history.location.pathname;
              if (pathname.includes('received-proposal') || pathname === '/bags')
                this.props.resetProposal();
              let arr = [];
              snapshot.forEach((doc) => {
                const data = doc.data();
                if (data) {
                  if (data.status !== 'removed')
                    arr.push(data);
                }
              });
              this.props.setNotifyProposal(arr);
            });
        });
    }
    addFirebaseUser(user) {
      const { id, email } = user;
      return new Promise((resolve, reject) => {
        baseDB.collection('users').doc(id).set({
          username: email
        }, { merge: true })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    componentDidUpdate(prevProps) {
      const { user, bearer, addClientHeader, addBearerHeader, listCartStart, anonymousId, createAnonymousId, lang } = this.props;
      const pathname = this.props.history.location.pathname;

      if (prevProps.bearer !== bearer) {
        if (!bearer) {
          addClientHeader();
          if (!anonymousId)
            createAnonymousId(uuidV1());
        } else if (bearer) {
          addBearerHeader(user.accessToken);
          this.getFirebaseUser(user);
          listCartStart(100, 0);
        }
      }

      if (prevProps.lang !== lang) {
        this.setLanguage();
      }

      if (prevProps.loadingSelectedOrder !== this.props.loadingSelectedOrder) {
        if (this.props.loadingSelectedOrder === false) {
          const { selectedOrder } = this.props;
          if (selectedOrder) {
            if (pathname !== '/order/confirm')
              this.setState({ isOpenOrder: true });
          }
        }
      }
    }
    componentWillUnmount() {
      if (this.debounceHandle) {
        clearTimeout(this.debounceHandle);
        this.debounceHandle = null;
      }

      this.events.forEach(event =>
        window.removeEventListener(event, this.notifySubscribers)
      )

      if (this.unsubscribeFromProposal)
        this.unsubscribeFromProposal();
    }
    notifySubscribers() {
      clearTimeout(this.debounceHandle);
      this.debounceHandle = setTimeout(this.handleResponsive, 500);
    }
    handleResponsive() {
      this.props.changeScreen(window.innerWidth);
    }
    render() {
      if (NODE_ENV === 'development')
        console.log('--------------- HOC WITH APP UPDATE -------------');

      const { apiInstance, screenWidth, user, history, translator } = this.props;

      if (apiInstance && screenWidth !== IS_SCREEN_LOADING) {
        if (translator) {
          switch (screenWidth) {
            case IS_MOBILE:
              return (
                <CommonBase screenWidth={screenWidth} user={user} history={history}>
                  {this.renderConfirmModalOrder()}
                  <Composed screenWidth={screenWidth} user={user} history={history} />
                </CommonBase>
              )
              break;
            default:
              return (
                <CommonBase screenWidth={screenWidth} user={user} history={history}>
                  {this.renderConfirmModalOrder()}
                  <Composed screenWidth={screenWidth} user={user} history={history} />
                </CommonBase>
              )
              break;

          }
        }
      }
      else return <CommonPageHolder />;
    }
  }
  const mapStateToProps = createStructuredSelector({
    apiInstance: selectScreenAPIInstance,
    user: selectCurrentUser,
    screenWidth: selectScreenWidth,
    bearer: selectBearer,
    anonymousId: selectAnonymousId,
    selectedOrder: selectSelectedOrder,
    loadingSelectedOrder: selectLoadingSelectedOrder,
    lang: selectLang,
    translator: selectTranslator
  });

  const mapDispatchToProps = dispatch => ({
    initHeader: () => dispatch(initHeader()),
    changeScreen: width => dispatch(changeScreen(width)),
    addBearerHeader: bearer => dispatch(addBearerHeader(bearer)),
    addClientHeader: () => dispatch(addClientHeader()),
    listCartStart: (limit, offset) => dispatch(listCartStart({ limit, offset })),
    createAnonymousId: (id) => dispatch(createAnonymousId(id)),
    resetProposal: () => dispatch(resetProposal()),
    setNotifyProposal: (list) => dispatch(setNotifyProposal(list)),
    getOrderActiveStart: () => dispatch(getOrderActiveStart()),
    removeOrderActiveStart: (id) => dispatch(removeOrderActiveStart({ id })),
    setLanguage: (lang) => dispatch(setLanguage(lang))
  });

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(HOCApp));
}

export default withApp;
