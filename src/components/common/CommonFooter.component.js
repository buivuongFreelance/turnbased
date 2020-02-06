import React, { Component } from "react";
import PropTypes from "prop-types";

import { IS_MOBILE, IS_PC, IS_TABLET, LANG } from "../../config";
import QuickAccess from "./CommonQuickAccess.component";
import CommonLogo from "./CommonLogo.component";
import CommonStayConnected from "./CommonStayConnected.component";
import { historyRedirect } from "../../utils";

import { withRouter } from "react-router";
import CommonSelect from "./CommonSelect.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLang } from "../../redux/storage/storage.selectors";
import { setLanguage } from "../../redux/screen/screen.actions";

class CommonFooter extends Component {
  constructor() {
    super();
  }
  handleLanguage(lang) {
    const { setLanguage } = this.props;
    setLanguage(lang);
    /*setTimeout(() => {
      location.reload(true);
    }, 500);*/
  }
  renderMobile() {
    const { screenWidth, lang, history: { location: { pathname } } } = this.props;

    const styleFooterWrapper = {
      marginBottom:
        pathname === '/account/device'
          || pathname.includes('account/device')
          || pathname.includes('device')
          ? '80px' : 0
    }

    return (
      <div className="uk-margin-bottom">
        <QuickAccess />
        <div className="uk-container uk-margin-top" style={
          styleFooterWrapper
        }>
          <div>
            <p className="uk-text-bold uk-text-muted uk-text-small"><span className="uk-text-emphasis">Contact</span> Dingtoi customer service professionals by phone or email.</p>
          </div>
          <div>
            <p className="uk-text-bold uk-text-muted uk-text-small">Copyright © 2019 Dingtoi Inc. All rights reserved.</p>
          </div>
          <div className="uk-flex uk-flex-wrap">
            <div><a className="uk-link-reset uk-border-link uk-text-small uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-padding-remove-left uk-margin-small-right">Privacy</a></div>
            <div><a className="uk-link-reset uk-border-link uk-text-small uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-padding-remove-left uk-margin-small-right">Terms of Use</a></div>
            <div><a className="uk-link-reset uk-border-link uk-text-small uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-padding-remove-left uk-margin-small-right">Sales and Retunds</a></div>
            <div><a className="uk-link-reset uk-border-link uk-text-small uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-padding-remove-left uk-margin-small-right">Legal</a></div>
            <div><a className="uk-link-reset uk-border-link uk-text-small uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-padding-remove-left uk-margin-small-right">Site Map </a></div>
          </div>
          <div className="uk-margin-top">
            <div className="uk-width-small">
              <CommonSelect screenWidth={screenWidth}
                options={LANG}
                selectedValue={lang}
                onChange={(value) => this.handleLanguage(value)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderPC() {
    const { screenWidth, history, lang } = this.props;
    return (
      <div className="wc-footer-wrapper uk-margin-large-top">
        <div className="wc-footer-top">
          <div className="uk-container">
            <div className="uk-flex uk-flex-between">
              <ul className="uk-list">
                <li>
                  <CommonLogo type="footer" />
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Buy</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Buy Phones</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Buy iPhones</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Buy Tablets</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Buy Watches</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Buy Cheap Devices</a>
                </li>
              </ul>
              <ul className="uk-list">
                <li>
                  SELL
                </li>
                <li>
                  <a className="uk-text-meta wc-link">How To Sell</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Check IMEI</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Check Serial Number</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Dingtoi vs. eBay</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Dingtoi vs. Craiglist</a>
                </li>
              </ul>
              <ul className="uk-list">
                <li>
                  INFORMATION
                </li>
                <li>
                  <a onClick={() => historyRedirect({ history, uri: 'job-opportunities' })}
                    className="uk-text-meta wc-link">Job Opportunities</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link"
                    onClick={() => historyRedirect({ history, uri: 'support' })}>Customer Service</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link">Shipping & Returns</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link"
                    onClick={() => historyRedirect({ history, uri: 'privacy' })}>Privacy Policy</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link"
                    onClick={() => historyRedirect({ history, uri: 'term-of-use' })}>Terms & Conditions</a>
                </li>
                <li>
                  <a className="uk-text-meta wc-link"
                    onClick={() => historyRedirect({ history, uri: 'contact-us' })}>Contact Us</a>
                </li>
              </ul>
              {
                screenWidth === IS_PC
                  ?
                  <CommonStayConnected /> : null
              }

            </div>
            {
              screenWidth === IS_TABLET
                ?
                <CommonStayConnected /> : null
            }
          </div>
        </div>

        <div className="wc-footer-bottom">
          <div className="uk-container">
            <div className="uk-flex uk-flex-bottom uk-flex-between">
              <div>
                <div className="uk-text-small">© Dingtoi 2019. All Rights Reserved.</div>
                <div className="uk-grid uk-grid-small uk-margin-top">
                  <img src="//cdn.shopify.com/s/files/1/0071/4755/2866/files/Visa_Inverted_x32.png" alt="visa" />
                  <img src="//cdn.shopify.com/s/files/1/0071/4755/2866/files/MasterCard_x32.png" alt="master card" />
                  <img src="//cdn.shopify.com/s/files/1/0071/4755/2866/files/PayPal_x32.png" alt="PayPal" />
                </div>
              </div>
              <div>
                <CommonSelect screenWidth={screenWidth}
                  options={LANG}
                  selectedValue={lang}
                  onChange={(value) => this.handleLanguage(value)} />
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
  render() {
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        return this.renderMobile();
        break;
      default:
        return this.renderPC();
        break;
    }
  }
}

CommonFooter.propTypes = {
  screenWidth: PropTypes.string.isRequired,
}

const mapStateToProps = createStructuredSelector({
  lang: selectLang
});

const mapDispatchToProps = dispatch => ({
  setLanguage: (lang) => dispatch(setLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonFooter));
