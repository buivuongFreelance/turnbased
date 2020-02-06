import React, { Component, Fragment } from "react";
import withApp from "../../hoc/withApp.hoc";
import { withRouter } from "react-router-dom";

import { IS_MOBILE } from "../../config";
import CheckImei from "../../components/device/DeviceCheckImei.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class CheckImeiPage extends Component {
  constructor(props) {
    super(props);
  }
  renderMobile() {
    const { screenWidth, translator } = this.props;

    return (
      <Fragment>
        {screenWidth !== IS_MOBILE && <CommonBreadcrumb list={[{ name: translator.translate('title_device_list'), uri: 'account/device' }, { name: translator.translate('title_check_imei') }]} />}
        {
          screenWidth === IS_MOBILE
            ?
            <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
              <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                {translator.translate('title_check_imei')}
              </div>
            </div>
            :
            <div className="uk-container uk-margin-top">
              <article className="uk-article">
                <h3>{translator.translate('title_check_imei')}</h3>
                <hr />
              </article>
              <div className="uk-text-meta uk-margin-top uk-margin-small-bottom">
                {translator.translate('dsc_check_imei')}
              </div>
            </div>
        }
        <div className="uk-container uk-margin-top">
          <div className="wc-block-wrapper">
            <CheckImei />
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

export default withApp(connect(mapStateToProps)(withRouter(CheckImeiPage)));
