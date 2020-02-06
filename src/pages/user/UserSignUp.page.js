import React, { Component, Fragment } from "react";

import SignUp from "../../components/user/UserSignUp.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class UserSignUpPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { screenWidth, translator } = this.props;

    return (
      <Fragment>
        {screenWidth !== IS_MOBILE && <CommonBreadcrumb list={[{ id: "cy-breadcrumb-register", name: translator.translate('title_register') }]} />}
        {
          screenWidth === IS_MOBILE
            ?
            <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
              <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                {translator.translate('btn_register')}
              </div>
            </div>
            :
            <div className="uk-container uk-margin-top">
              <article className="uk-article" id="cy-title-register">
                <h3>{translator.translate('btn_register')}</h3>
                <hr />
              </article>
              <div className="uk-text-meta uk-margin-top uk-margin-small-bottom"
                id="cy-desc-register">
                {translator.translate('dsc_register')}
              </div>
            </div>
        }
        <div className="uk-container uk-margin-top">
          <div className="wc-block-wrapper">
            <SignUp />
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default withApp(connect(mapStateToProps)(UserSignUpPage));
