import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import Slider from "react-slick";

import { withRouter } from "react-router-dom";
import { IS_MOBILE, IS_PC } from "../../config";

import { historyRedirect } from "../../utils";
import CommonImage from "./CommonImage.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class CommonBaseAccount extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.scrollIntoView();
  }
  scrollIntoView() {
    const { screenWidth, history: { location: { pathname } } } = this.props;
    if (screenWidth === IS_MOBILE) {
      if (pathname.includes('transaction')) {
        this.slider.slickGoTo(1);
      }
    }
  }
  renderMobile() {
    const settings = {
      infinite: false,
      autoplay: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false
    }
    const { user, children, active, history, translator } = this.props;

    return (
      <Fragment>
        <div className="uk-text-center uk-padding-large uk-background-blend-multiply uk-background-account uk-background-cover">
          <div>
            <CommonImage
              className="uk-margin-xsmall-bottom"
              url={'images/nouser.png'}
              width={50}
              height={50} />
            <h2 className="uk-text-bold uk-text-white uk-text-large uk-margin-remove-top uk-margin-large-bottom">
              {user.email}
            </h2>
          </div>
        </div>
        <div>
          <div className="uk-padding-small uk-padding-remove-top">
            <div className="uk-text-center uk-box-shadow-medium uk-background-default uk-margin-top-negative">
              <Slider {...settings}
                ref={slider => { this.slider = slider }}>
                <div>
                  <a className="uk-padding-small uk-link-reset"
                    onClick={() => historyRedirect({ history, uri: 'account/device' })}>
                    <div>
                      <div className="uk-inline uk-margin-xsmall-bottom">
                        <img
                          src={active === 'device' ? 'icons/iconmonstr-smartphone-16-240-active.png' : 'icons/iconmonstr-smartphone-16-240.png'}
                          width="20" height="20" />
                      </div>
                      <p
                        className={active === 'device'
                          ? 'uk-margin-remove uk-text-meta uk-text-active uk-text-uppercase'
                          : 'uk-margin-remove uk-text-meta uk-text-uppercase'}>
                        {translator.translate('title_device_list')}
                      </p>
                    </div>
                  </a>
                </div>
                <div>
                  <a className="uk-padding-small uk-link-reset"
                    onClick={() => historyRedirect({ history, uri: 'account/wishlist' })}>
                    <div>
                      <div className="uk-inline uk-text-muted uk-margin-xsmall-bottom">
                        <img
                          src={active === 'wishlist' ? 'icons/icon-heart-clicked.png' : 'icons/iconmonstr-heart-thin-240.png'}
                          width="20" height="20" />
                      </div>
                      <p
                        className={active === 'wishlist'
                          ? 'uk-margin-remove uk-text-meta wc-tab-active-item uk-text-active'
                          : 'uk-margin-remove uk-text-meta wc-tab-item'}>
                        WISHLIST
                  </p>
                    </div>
                  </a>
                </div>
                <div>
                  <a className="uk-padding-small uk-link-reset"
                    onClick={() => historyRedirect({ history, uri: 'account/received-proposal' })}>
                    <div>
                      <div className="uk-inline uk-text-muted uk-margin-xsmall-bottom">
                        <img
                          src={active === 'proposal' ? 'icons/iconmonstr-file-2-240-active.png' : 'icons/iconmonstr-file-2-240.png'}
                          width="20" height="20" />
                      </div>
                      <p
                        className={active === 'proposal'
                          ? 'uk-margin-remove uk-text-meta wc-tab-active-item uk-text-active'
                          : 'uk-margin-remove uk-text-meta wc-tab-item'}>
                        PROPOSAL
                  </p>
                    </div>
                  </a>
                </div>
                <div>
                  <a className="uk-padding-small uk-link-reset"
                    onClick={() => historyRedirect({ history, uri: 'account/transaction' })}>
                    <div>
                      <div className="uk-inline uk-text-muted uk-margin-xsmall-bottom">
                        <img
                          src={active === 'transaction' ? 'icons/iconmonstr-banknote-3-240-active.png' : 'icons/iconmonstr-banknote-3-240.png'}
                          width="20" height="20" />
                      </div>
                      <p
                        className={active === 'transaction'
                          ? 'uk-margin-remove uk-text-meta wc-tab-active-item uk-text-active'
                          : 'uk-margin-remove uk-text-meta wc-tab-item'}>
                        TRANSACTION
                  </p>
                    </div>
                  </a>
                </div>
                <div>
                  <a className="uk-padding-small uk-link-reset"
                    onClick={() => historyRedirect({ history, uri: 'account/transaction-buyer' })}>
                    <div>
                      <div className="uk-inline uk-text-muted uk-margin-xsmall-bottom">
                        <img
                          src={active === 'transaction-buyer' ? 'icons/iconmonstr-banknote-3-240-active.png' : 'icons/iconmonstr-banknote-3-240.png'}
                          width="20" height="20" />
                      </div>
                      <p
                        className={active === 'transaction-buyer'
                          ? 'uk-margin-remove uk-text-meta wc-tab-active-item uk-text-active'
                          : 'uk-margin-remove uk-text-meta wc-tab-item'}>
                        TRANSACTION BUYER
                  </p>
                    </div>
                  </a>
                </div>
              </Slider>
            </div>
          </div>
          {children}
        </div>
      </Fragment >
    )
  }
  renderPC() {
    const { user, screenWidth, translator } = this.props;

    return (
      <Fragment>
        <div className="uk-background-account">
          <div className="uk-container uk-height-medium uk-flex uk-flex-middle">
            <div className="uk-cursor">
              <CommonImage
                replace_loader={<img src="images/nouser.png" width="50" height="50" />}
                replace_unloader={<img src="images/nouser.png" width="50" height="50" />}
                className="uk-border-circle" url=""
                width="80" height="80" />
            </div>
            <div className="uk-light uk-margin-small-left">
              <h3 className="uk-margin-xsmall-bottom">{user.email}</h3>
              <div className="uk-margin-xsmall-bottom uk-text-small">Dingtoi Dear Buyer</div>
              <a className="uk-text-meta uk-link-reset" >Edit Profile</a>
            </div>
          </div>
        </div>
        <div className="uk-container uk-margin-top uk-margin-bottom">
          <ul className="uk-tab">
            <li className={this.props.location.pathname === '/account/device' ? 'uk-active' : null}>
              <a onClick={() => this.props.history.push('/account/device')}>{translator.translate('title_device_list')}</a>
            </li>
            <li className={this.props.location.pathname === '/account/wishlist' ? 'uk-active' : null}>
              <a onClick={() => this.props.history.push('/account/wishlist')}>My Wishlist</a>
            </li>
            <li className={this.props.location.pathname === '/account/received-proposal' ? 'uk-active' : null}>
              <a onClick={() => this.props.history.push('/account/received-proposal')}>Received Proposal</a>
            </li>
            <li>
              <Popup
                trigger={<a className={
                  this.props.location.pathname === "/account/order"
                    ? 'uk-text-active'
                    : ''
                }>More
                <span className="uk-margin-small-left uk-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="5 7 15 7 10 12"></polygon></svg>
                  </span>
                </a>}
                on={screenWidth === IS_PC ? 'hover' : 'click'}
                closeOnDocumentClick
                mouseLeaveDelay={0}
                mouseEnterDelay={0}
                contentStyle={{ border: "none" }}
                arrow={false}>
                <div className="uk-padding-small" >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <a
                        className={
                          this.props.location.pathname === "/account/transaction"
                            ? 'uk-text-active'
                            : ''
                        }
                        onClick={() => this.props.history.push('/account/transaction')}>Transaction History
                      </a>
                    </li>
                    <li>
                      <a
                        className={
                          this.props.location.pathname === "/account/transaction-buyer"
                            ? 'uk-text-active'
                            : ''
                        }
                        onClick={() => this.props.history.push('/account/transaction-buyer')}>Transaction Buyer
                      </a>
                    </li>
                  </ul>
                </div>
              </Popup>
            </li>
          </ul>
        </div>
        <div className="uk-container uk-padding uk-padding-remove-top">
          {this.props.children}
        </div>
      </Fragment>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth !== IS_MOBILE)
      return this.renderPC();
    else
      return this.renderMobile();
  }
}

CommonBaseAccount.propTypes = {
  active: PropTypes.string.isRequired
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default connect(mapStateToProps)(withRouter(CommonBaseAccount));
