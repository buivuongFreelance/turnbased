import React, { Component } from "react";
import CommonBaseAccount from "../../components/common/CommonBaseAccount.component";
import { withRouter } from "react-router-dom";
import withApp from "../../hoc/withApp.hoc";

import { IS_MOBILE } from "../../config";
import { historyRedirect } from "../../utils";
import MyDevices from "../../components/device/DeviceAccountList.component";

import CommonButton from "../../components/common/CommonButton.component";
import FilterMyDeviceType from "../../components/common/filter/FilterMyDeviceType.component";
import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class UserDeviceListPage extends Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);
    this.state = {
      filterType: ''
    }
  }
  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  handleChange(value) {
    this.setState({ filterType: value });
  }
  renderActions(close) {
    return (
      <div>
        <FilterMyDeviceType defaultValue={this.state.filterType} onChange={(value) => {
          this.handleChange(value);
          close();
        }} />
      </div>
    )
  }
  renderMobile() {
    const { user, screenWidth, translator } = this.props;
    const { filterType } = this.state;

    return (
      <CommonBaseAccount active="device" user={user} screenWidth={screenWidth}>
        <div className="uk-position-relative">
          <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
            <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
              {translator.translate('title_device_list')}
            </div>
          </div>
        </div>
        <MyDevices filterType={filterType} />
        <div className="wc-navbar-wrapper-footer">
          <div className="uk-flex">
            <div className="uk-width-1-2">
              <Popup
                trigger={
                  <div>
                    <CommonButton screenWidth={screenWidth}
                      className="wc-btn navbar-button uk-margin-remove">
                      {translator.translate('title_filter_by')}
                    </CommonButton>
                  </div>
                }
                on="click"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                position="top left"
                contentStyle={{ border: "none", padding: 0, zIndex: 9999, paddingLeft: '15px', paddingTop: '15px' }}
                arrow={false}>
                {close => this.renderActions(close)}
              </Popup>
            </div>
            <div className="uk-width-1-2">
              <CommonButton className="wc-btn navbar-button uk-margin-remove uk-text-white" screenWidth={screenWidth}
                type="inverted"
                onClick={this.onRedirect.bind(this, 'account/check-imei')}>
                {translator.translate('btn_add_device')}
              </CommonButton>
            </div>

          </div>
        </div>
      </CommonBaseAccount>
    )
  }
  renderPC() {
    const { screenWidth, user, translator } = this.props;
    const { filterType } = this.state;

    return (
      <CommonBaseAccount active="device" user={user} screenWidth={screenWidth}>
        <div>
          <div className="uk-margin-bottom uk-flex uk-flex-between">
            <div>
              <CommonButton className="wc-btn"
                screenWidth={screenWidth}
                type="inverted"
                onClick={() => this.props.history.push('/account/check-imei')}>
                {translator.translate('btn_add_device')}
              </CommonButton>
            </div>
            <div>
              <FilterMyDeviceType type="select" onChange={(value) => this.handleChange(value)} />
            </div>
          </div>
          <MyDevices filterType={filterType} />
        </div>
      </CommonBaseAccount>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default withApp(connect(mapStateToProps)((withRouter(UserDeviceListPage))));

