import React, { Component, Fragment } from "react";
import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE } from "../../config";
import DeviceUpload from "../../components/device/DeviceUpload.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectSelectedDevice } from "../../redux/device/device.selectors";

import { withRouter } from "react-router";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";

class DeviceImages extends Component {
  constructor(props) {
    super(props);
  }
  renderBreadcrumb() {
    const { device, screenWidth, translator } = this.props;
    if (screenWidth !== IS_MOBILE) {
      if (device) {
        const { deviceId } = device;
        return (
          <CommonBreadcrumb list={[{ name: translator.translate('title_device_list'), uri: 'account/device' }, { name: translator.translate('title_device_detail'), uri: 'account/device/' + deviceId }, { name: translator.translate('title_device_images') }]} />
        )
      }
    }
  }
  renderUploadName() {
    const { device, translator } = this.props;
    if (device) {
      const { modelDetailName } = device;
      return (
        <div className="uk-text-meta uk-margin-top uk-margin-small-bottom">
          {translator.translate('dsc_device_images', {
            field: modelDetailName
          })}
        </div>
      )
    }
  }
  renderMobile() {
    const { device, screenWidth, translator } = this.props;

    return (
      <Fragment>
        <div className="uk-position-relative">
          {this.renderBreadcrumb()}
          {screenWidth === IS_MOBILE
            ?
            <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
              <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                {translator.translate('title_device_images')}
              </div>
            </div>
            :
            <div className="uk-container uk-margin-top">
              <article className="uk-article">
                <h3>{translator.translate('title_device_images')}</h3>
                <hr />
              </article>
              {this.renderUploadName()}
            </div>
          }
          <div className="uk-container uk-margin-top">
            <DeviceUpload device={device} />
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
  screenWidth: selectScreenWidth,
  device: selectSelectedDevice,
  translator: selectTranslator
});

export default withApp(connect(mapStateToProps)(withRouter(DeviceImages)));
