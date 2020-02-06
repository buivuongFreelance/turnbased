import React, { Component, Fragment } from "react";

import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE } from "../../config";
import { historyRedirect } from "../../utils";

import { withRouter } from "react-router";
import SignIn from "../../components/user/UserSignIn.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import CommonButton from "../../components/common/CommonButton.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class UserSignInAndSignUpPage extends Component {
  constructor(props) {
    super(props);
  }
  renderSignIn() {
    const { translator } = this.props;

    return (
      <div className="uk-width-1-1 uk-margin-top">
        <div className="wc-wrapper-title">
          <div className="wc-title uk-flex uk-flex-middle uk-flex-center">
            {translator.translate('title_returning_customer')}
          </div>
        </div>
        <SignIn />
      </div>
    )
  }
  renderSignUp() {
    const { history, screenWidth, translator } = this.props;

    return (
      <div className="uk-width-1-1 uk-margin-top">
        <div className="wc-wrapper-title">
          <div className="wc-title uk-flex uk-flex-middle uk-flex-center">
            {translator.translate('title_new_customer')}
          </div>
        </div>
        <div className="uk-flex uk-flex-center">
          <div className="wc-registration-desc uk-flex uk-flex-center uk-text-center uk-flex-column">
            <div className="uk-margin-bottom">
              {translator.translate('dsc_login_register_first')}
              <br />
              {translator.translate('dsc_login_register_last')}
            </div>
            <div>
              <CommonButton className="wc-btn uk-width-1-1"
                id="loginRegister-btn-register"
                screenWidth={screenWidth}
                type={'inverted'}
                onClick={() => historyRedirect({ history, uri: 'signUp' })}>
                {translator.translate('btn_register')}
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        {screenWidth !== IS_MOBILE && <CommonBreadcrumb list={[{ name: 'Sign In' }]} />}
        <div className="uk-container">
          <div className="wc-block-wrapper">
            {
              screenWidth === IS_MOBILE
                ?
                <React.Fragment>
                  <div className="uk-flex">
                    {this.renderSignIn()}
                  </div>
                  <div className="uk-flex">
                    {this.renderSignUp()}
                  </div>
                </React.Fragment>
                :
                <div className="uk-flex">
                  {this.renderSignIn()}
                  {this.renderSignUp()}
                </div>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default withApp(connect(mapStateToProps)(withRouter(UserSignInAndSignUpPage)));
