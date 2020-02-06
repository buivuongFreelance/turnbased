import React, { Component, Fragment } from "react";

import { IS_MOBILE } from "../../config";
import withApp from "../../hoc/withApp.hoc";
import { historyRedirect } from "../../utils";

import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";

import { withRouter } from "react-router";
import DeviceUpdateAvailable from "../../components/device/DeviceUpdateAvailable.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectSelectedDeviceAvailable
} from "../../redux/device/device.selectors";

class DeviceUpdateAvailablePage extends Component {
  constructor(props) {
    super(props);
  }
  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  renderBreadcrumb() {
    const { screenWidth, device } = this.props;
    if (screenWidth !== IS_MOBILE) {
      if (device) {
        return (
          <CommonBreadcrumb list={[{ name: 'List Devices', uri: 'account/device' }, { name: 'Device Detail', uri: 'account/device/' + device.deviceId }, { name: 'Update Available' }]} />
        )
      }
    }
  }
  renderDesc() {
    const { device } = this.props;
    if (device) {
      return (
        <div className="uk-text-meta uk-margin-top uk-margin-small-bottom">Update Available For {device.modelDetailName}.</div>
      )
    }
  }
  renderMobile() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        {this.renderBreadcrumb()}
        <div className="uk-position-relative">
          {
            screenWidth === IS_MOBILE
              ?
              <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
                <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                  Update Available
                </div>
              </div>
              :
              <div className="uk-container uk-margin-top">
                <article className="uk-article">
                  <h3>Update Available</h3>
                  <hr />
                </article>
                {
                  this.renderDesc()
                }
              </div>
          }
          <div className="uk-container uk-margin-top">
            <div className="wc-block-wrapper">
              <DeviceUpdateAvailable />
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
  device: selectSelectedDeviceAvailable
});

export default withApp(connect(mapStateToProps)(withRouter(DeviceUpdateAvailablePage)));
