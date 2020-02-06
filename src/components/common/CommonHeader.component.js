import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { IS_MOBILE, IS_PC, IS_TABLET, SMARTPHONE_ID, TABLET_ID, SMARTWATCH_ID } from "../../config";
import CommonHeaderWrapper from "./CommonHeaderWrapper.component";
import Logo from "./CommonLogo.component";
import CommonBrandMenu from "./CommonBrandMenu.component";
import { historyRedirect } from "../../utils";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { selectCartCount } from "../../redux/storage/storage.selectors";
import { selectTypes, selectTranslator } from "../../redux/screen/screen.selectors";

import { toggleSidebar, setCategoryId, setBrandByCategory, triggerSearchMenu } from "../../redux/screen/screen.actions";
import { logoutStart } from "../../redux/user/user.actions";

import Popup from "reactjs-popup";
import MegaPopup from "../../plugins/popup";
import CommonSearchMenu from "./CommonSearchMenu.component";
import { createStructuredSelector } from "reselect";
import OrderPopupCart from "../order/OrderPopupCart.component";

class CommonHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false
    }
    this.execNav = this.execNav.bind(this);
    this.openSearchNavbar = this.openSearchNavbar.bind(this);
    this.closeSearchNavbar = this.closeSearchNavbar.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    const { logoutStart, history } = this.props;
    logoutStart(history);
    history.push('/empty');
    setTimeout(() => {
      history.replace('/');
    }, 500);
  }
  execNav() {
    const { toggleSidebar } = this.props;
    toggleSidebar(true);
  }
  openSearchNavbar() {
    this.setState({ isSearch: true });
  }
  closeSearchNavbar() {
    this.setState({ isSearch: false });
  }
  handleInnerSearch() {
    const { toggleSidebar, triggerSearchMenu } = this.props;
    toggleSidebar(true);
    triggerSearchMenu(true);
  }
  handleSearch(value) {
    this.setState({ isSearch: false }, () => {
      const { setCategoryId, history } = this.props;
      setCategoryId('categoryTitle', {
        type: 'bestMatch',
        value
      });
      history.push('/empty');
      setTimeout(() => {
        history.replace('/category');
      }, 500);
    });
  }
  handleFilterOneCategory(name) {
    const { setCategoryId } = this.props;

    setCategoryId('categoryIds', [name]);

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  handleFilterBrand(brand) {
    const { setCategoryId } = this.props;
    setCategoryId('brandIds', [brand]);

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  handleFilterCategory(type) {
    const { setCategoryId } = this.props;
    if (type === 'all')
      setCategoryId('types', []);
    else
      setCategoryId('types', [type]);

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  handleBrandMenu(name, brand) {
    const { setBrandByCategory } = this.props;

    switch (name) {
      case 'Smart Phones':
        setBrandByCategory(SMARTPHONE_ID, brand.id);
        break;
      case 'Tablets':
        setBrandByCategory(TABLET_ID, brand.id);
        break;
      case 'Smart Watches':
        setBrandByCategory(SMARTWATCH_ID, brand.id);
        break;
    }

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  renderHome() {
    return (
      <div className="wc-navbar-link-wrapper"
        onClick={() => historyRedirect({ history: this.props.history, uri: '' })}>
        <div className="uk-flex uk-flex-middle wc-navbar-link-inner">
          <a className="wc-navbar-link-logo">
            <Logo type="header" />
          </a>
        </div>
      </div>
    )
  }
  renderPurpose() {
    return (
      <div className="wc-navbar-link-wrapper">
        <Popup
          trigger={<div className="uk-flex uk-flex-middle wc-navbar-div-inner uk-cursor">Your Purpose</div>}
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={0}
          mouseEnterDelay={0}
          contentStyle={{ border: "none" }}
          arrow={false}>
          <ul className="uk-nav-sub">
            <li>
              <a onClick={() => this.handleFilterCategory('all')}>All</a>
            </li>
            <li>
              <a onClick={() => this.handleFilterCategory('sale')}>Buy</a>
            </li>
            <li>
              <a onClick={() => this.handleFilterCategory('exchange')}>Exchange</a>
            </li>
          </ul>
        </Popup>
      </div>
    )
  }
  renderCategory(name) {
    return (
      <div className="wc-navbar-link-wrapper">
        <MegaPopup
          trigger={<div className="uk-flex uk-flex-middle wc-navbar-div-inner uk-cursor">{name}</div>}
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={0}
          mouseEnterDelay={0}
          contentStyle={{ padding: 0, border: 'none', width: '100%' }}
          arrow={false}>
          <div className="wc-navbar-mega">
            <CommonBrandMenu onClick={(brand) => {
              this.handleBrandMenu(name, brand);
            }} />
          </div>
        </MegaPopup>
      </div>
    )
  }
  renderRegister() {
    const { user, translator } = this.props;
    if (!user)
      return (
        <div className="wc-navbar-link-wrapper"
          id="common-header-register"
          onClick={() => historyRedirect({ history: this.props.history, uri: 'signUp' })}>
          <div className="uk-flex uk-flex-middle wc-navbar-link-inner">
            <div className="wc-navbar-link-logo uk-text-white uk-cursor">
              {translator.translate('title_register')}
            </div>
          </div>
        </div>
      )
    else
      this.renderUser();
  }
  renderUser() {
    const { user } = this.props;

    return (
      <div className="wc-navbar-link-wrapper"
        onClick={() => {
          if (user)
            historyRedirect({ history: this.props.history, uri: 'account/device' })
          else
            historyRedirect({ history: this.props.history, uri: 'signInAndSignUp' })
        }}>
        <div className="uk-flex uk-flex-middle wc-navbar-link-inner">
          <a className="wc-navbar-link-logo">
            <img src="icons/iconmonstr-user-circle-thin-240.png" alt="bag" width="28" height="28" style={{ marginTop: '0px' }} />
          </a>
        </div>
      </div>
    )
  }
  renderInstantSearch() {
    return (
      <div className="wc-navbar-link-wrapper">
        <div className="uk-flex uk-flex-middle wc-navbar-div-inner">
          <div className="wc-navbar-div">
            <div className="uk-flex uk-flex-middle wc-navbar-div-inner">
              <CommonSearchMenu onSearch={(value) => this.handleSearch(value)}
                onFilterCategory={(name) => this.handleFilterOneCategory(name)}
                onFilterBrand={((brand) => this.handleFilterBrand(brand))} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderSearch() {
    return (
      <div className="wc-navbar-link-wrapper" onClick={this.openSearchNavbar}>
        <div className="uk-flex uk-flex-middle wc-navbar-link-inner">
          <a className="wc-navbar-link-logo">
            <img src="icons/iconmonstr-search-thin-240.png" alt="search" width="20" height="20" style={{ marginTop: '-6px' }} />
          </a>
        </div>
      </div>
    )
  }
  renderPCHeader() {
    const { user, history, screenWidth, translator } = this.props;

    return (
      <div className="wc-header-top">
        <div className="uk-container">
          <div className="uk-flex uk-flex-between wc-header-container">
            <div className="uk-flex uk-flex-middle">
              <a className="uk-link" onClick={() => historyRedirect({ history, uri: '' })}>
                <Logo />
              </a>
            </div>
            <div className="uk-flex uk-flex-middle">
              <div className="uk-flex wc-header-breadcrumb-wrapper">
                <a className="uk-flex-middle uk-flex"
                  onClick={() => {
                    if (!user) {
                      historyRedirect({ history, uri: 'signInAndSignUp' });
                    } else {
                      historyRedirect({ history, uri: 'account/check-imei' });
                    }
                  }}>
                  <div className="uk-flex-middle uk-flex">
                    <img src="icons/iconmonstr-mobile-thin-240.png" width="20" height="20" />
                  </div>
                  <div className="uk-flex-middle uk-flex uk-margin-tiny-left">
                    {translator.translate('title_sell_on_dingtoi')}
                  </div>
                </a>
                <a className="uk-flex-middle uk-flex uk-margin-small-left"
                  onClick={() => {
                    if (!user) {
                      historyRedirect({ history, uri: 'signInAndSignUp' });
                    } else {
                      historyRedirect({ history, uri: 'account/wishlist' });
                    }
                  }}>
                  <div className="uk-flex-middle uk-flex">
                    <img src="icons/iconmonstr-heart-thin-240.png" width="15" height="15" />
                  </div>
                  <div className="uk-flex-middle uk-flex uk-margin-tiny-left">
                    My Wishlist
                </div>
                </a>
                {
                  !user
                    ?
                    <a className="uk-flex-middle uk-flex uk-margin-small-left"
                      id="common-header-login-or-register"
                      onClick={() => historyRedirect({ history, uri: 'signInAndSignUp' })}>
                      <div className="uk-flex-middle uk-flex">
                        <img src="icons/iconmonstr-user-male-thin-240.png" width="15" height="15" />
                      </div>
                      <div className="uk-flex-middle uk-flex uk-margin-tiny-left">
                        {translator.translate('title_login_or_register')}
                      </div>
                    </a>
                    : null
                }
                {
                  user
                  &&
                  <Popup
                    trigger={
                      <a className="uk-flex-middle uk-flex uk-margin-small-left"
                        id="common-header-auth-user">
                        <div className="uk-flex-middle uk-flex">
                          <img src="icons/iconmonstr-user-male-thin-240.png" width="15" height="15" />
                        </div>
                        <div className="uk-flex-middle uk-flex uk-margin-tiny-left">
                          {user.email}
                        </div>
                      </a>
                    }
                    on={screenWidth === IS_PC ? 'hover' : 'click'}
                    closeOnDocumentClick
                    mouseLeaveDelay={0}
                    mouseEnterDelay={0}
                    contentStyle={{ border: "none" }}
                    arrow={false}>
                    <ul className="uk-nav-sub">
                      <li className="uk-margin-top">
                        <a onClick={() => historyRedirect({ history, uri: 'account/device' })}>
                          {translator.translate('title_my_account')}
                        </a>
                      </li>
                      <li>
                        <a id="common-header-logout" onClick={this.onLogout}>{translator.translate('btn_logout')}</a>
                      </li>
                    </ul>
                  </Popup>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderPC() {
    const { isSearch } = this.state;

    return (
      <Fragment>
        {this.renderPCHeader()}
        {
          isSearch
            ?
            <CommonHeaderWrapper isClickOutside
              onClickOutside={this.closeSearchNavbar}
              style={{ marginTop: '65px' }}>
              {this.renderHome()}
              {this.renderInstantSearch()}
              {this.renderBag()}
            </CommonHeaderWrapper>

            :
            <CommonHeaderWrapper style={{ marginTop: '65px' }}>
              {this.renderHome()}
              {this.renderPurpose()}
              {this.renderCategory('Smart Phones')}
              {this.renderCategory('Tablets')}
              {this.renderCategory('Smart Watches')}
              {this.renderRegister()}
              {this.renderSearch()}
              {this.renderBag()}
            </CommonHeaderWrapper>
        }
      </Fragment>
    )
  }
  renderTablet() {
    const { isSearch } = this.state;
    return (
      <Fragment>
        {this.renderPCHeader()}
        {
          isSearch
            ?
            <CommonHeaderWrapper isClickOutside
              onClickOutside={this.closeSearchNavbar}
              style={{ marginTop: '65px' }}>
              {this.renderNav()}
              {this.renderInstantSearch()}
              {this.renderBag()}
            </CommonHeaderWrapper>
            :
            <CommonHeaderWrapper style={{ marginTop: '65px' }}>
              {this.renderNav()}
              {this.renderSearch()}
              {this.renderUser()}
              {this.renderBag()}
            </CommonHeaderWrapper>
        }
      </Fragment>
    )
  }
  renderBack() {
    const { history: { location: { pathname } }, screenWidth } = this.props;

    if (screenWidth === IS_MOBILE) {
      if (pathname !== '/')
        return <div className="uk-flex uk-flex-middle wc-navbar-link-inner uk-margin-medium-left">
          <a className="wc-navbar-link-logo"
            onClick={() => history.back()}>
            <img src="icons/iconmonstr-angel-left-thin-240.png" width="24" height="24" />
          </a>
        </div>
      else return null;
    } else return null;
  }
  renderNav() {
    return (
      <div className="wc-navbar-link-wrapper uk-flex">
        <div className="uk-flex uk-flex-middle wc-navbar-link-inner"
          id="common-header-nav"
          onClick={this.execNav}>
          <a className="wc-navbar-link-logo">
            <img src="icons/iconmonstr-menu-thin-240.png"
              alt="menu" width="28" height="28"
              style={{ marginTop: '0px' }} />
          </a>
        </div>
        {
          this.renderBack()
        }
      </div>
    )
  }
  renderBagCount() {
    const { history, cartCount, screenWidth, user } = this.props;

    if (screenWidth === IS_MOBILE)
      return (
        <div className="uk-flex uk-flex-middle wc-navbar-div-inner" onClick={() => historyRedirect({ history, uri: 'bags' })}>
          <div className="uk-position-relative">
            <img src="icons/iconmonstr-shopping-bag-4-240-white.png" alt="bag" width="25" height="25" style={{ marginTop: '-8px' }} />
            {
              cartCount > 0
              && <span className="uk-badge uk-position-top-right uk-position-cart uk-background-active">{cartCount}</span>
            }
          </div>
        </div>
      );
    else {
      if (user) {
        if (screenWidth === IS_PC) {
          return (
            <div className="uk-flex uk-flex-middle wc-navbar-div-inner wc-popup-bag-wrapper">
              <div className="uk-position-relative">
                <img src="icons/iconmonstr-shopping-bag-4-240-white.png" alt="bag" width="25" height="25" style={{ marginTop: '-8px' }} />
                {
                  cartCount > 0
                  && <span className="uk-badge uk-position-top-right uk-position-cart uk-background-active">{cartCount}</span>
                }
              </div>
              <div className="popup-content wc-popup-bag">
                <OrderPopupCart />
              </div>
            </div>
          )
        } else {
          return (<Popup
            trigger={
              <div className="uk-flex uk-flex-middle wc-navbar-div-inner">
                <div className="uk-position-relative">
                  <img src="icons/iconmonstr-shopping-bag-4-240-white.png" alt="bag" width="25" height="25" style={{ marginTop: '-8px' }} />
                  {
                    cartCount > 0
                    && <span className="uk-badge uk-position-top-right uk-position-cart uk-background-active">{cartCount}</span>
                  }
                </div>
              </div>
            }
            on={'click'}
            closeOnDocumentClick
            mouseLeaveDelay={0}
            position="bottom right"
            mouseEnterDelay={0}
            contentStyle={{ border: "none", width: '300px' }}
            arrow={false}>
            {
              () => {
                if (user)
                  return <OrderPopupCart />
              }
            }
          </Popup>)
        }
      } else {
        return (
          <div className="uk-flex uk-flex-middle wc-navbar-div-inner">
            <div className="uk-position-relative">
              <img src="icons/iconmonstr-shopping-bag-4-240-white.png" alt="bag" width="25" height="25" style={{ marginTop: '-8px' }} />
              {
                cartCount > 0
                && <span className="uk-badge uk-position-top-right uk-position-cart uk-background-active">{cartCount}</span>
              }
            </div>
          </div>
        )
      }
    }
  }
  renderBag() {
    const { history: { location: { pathname } }, screenWidth } = this.props;

    return (
      <div className="wc-navbar-link-wrapper uk-flex">
        {
          pathname !== '/' && screenWidth === IS_MOBILE
          &&
          <div className="uk-flex uk-flex-middle wc-navbar-link-inner uk-margin-medium-right">
            <a className="wc-navbar-link-logo" onClick={() => this.handleInnerSearch()}>
              <img src="icons/iconmonstr-search-thin-240.png" alt="search" width="20" height="20" style={{ marginTop: '-4px' }} />
            </a>
          </div>
        }
        <div className="uk-flex uk-flex-middle wc-navbar-div-inner">
          <div className="wc-navbar-div">
            {
              this.renderBagCount()
            }
          </div>
        </div>
      </div>
    )
  }
  renderMobile() {
    return (
      <CommonHeaderWrapper>
        {this.renderNav()}
        {this.renderHome()}
        {this.renderBag()}
      </CommonHeaderWrapper>
    )
  }
  render() {
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        return this.renderMobile();
        break;
      case IS_TABLET:
        return this.renderTablet();
        break;
      case IS_PC:
        return this.renderPC();
        break;
    }
  }
}

CommonHeader.propTypes = {
  screenWidth: PropTypes.string.isRequired,
  user: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
  cartCount: selectCartCount,
  types: selectTypes,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: status => dispatch(toggleSidebar(status)),
  logoutStart: history => dispatch(logoutStart({ history })),
  setCategoryId: (field, value) => dispatch(setCategoryId(field, value)),
  setBrandByCategory: (value, valueBrand) => dispatch(setBrandByCategory(value, valueBrand)),
  triggerSearchMenu: (status) => dispatch(triggerSearchMenu(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonHeader));
