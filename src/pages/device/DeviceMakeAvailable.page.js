import React, { Component, Fragment } from "react";

import { IS_MOBILE } from "../../config";
import withApp from "../../hoc/withApp.hoc";
import { historyRedirect } from "../../utils";

import DeviceMakeAvailable from "../../components/device/DeviceMakeAvailable.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class DeviceMakeAvailablePage extends Component {
  constructor(props) {
    super(props);
  }
  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  renderMobile() {
    const { screenWidth, match: { params: { id } }, translator } = this.props;

    return (
      <Fragment>
        {screenWidth !== IS_MOBILE && <CommonBreadcrumb list={[
          { name: translator.translate('title_device_list'), uri: 'account/device' },
          { name: translator.translate('title_device_detail'), uri: 'account/device/' + id }, { name: translator.translate('btn_make_available') }]} />}
        <div className="uk-position-relative">
          {
            screenWidth === IS_MOBILE
              ?
              <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
                <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                  {translator.translate('btn_make_available')}
                </div>
              </div>
              :
              <div className="uk-container uk-margin-top">
                <article className="uk-article">
                  <h3>{translator.translate('btn_make_available')}</h3>
                  <hr />
                </article>
                <div className="uk-text-meta uk-margin-top uk-margin-small-bottom">{translator.translate('dsc_make_available')}</div>
              </div>
          }
          <div className="uk-container uk-margin-top">
            <div className="wc-block-wrapper">
              <DeviceMakeAvailable />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return this.renderMobile();
  }
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default withApp(connect(mapStateToProps)(withRouter(DeviceMakeAvailablePage)));
