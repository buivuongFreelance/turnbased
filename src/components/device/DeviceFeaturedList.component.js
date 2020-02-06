import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectFeaturedDevices, selectLoadingFeaturedDevices } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { featuredDeviceStart, featuredDeviceAnonymousStart } from "../../redux/device/device.action";
import { IS_MOBILE, LIMIT_FEATURED_DEVICES } from "../../config";
import DeviceItemAvailable from "./DeviceItemAvailable.component";
import { historyRedirect } from "../../utils";

import { withRouter } from "react-router";
import CommonMultipleCarousel from "../common/CommonMultipleCarousel.component";
import CommonLoading from "../common/CommonLoading.component";
import DeviceDetailPopup from "./DeviceDetailPopup.component";
import { selectCurrentUser } from "../../redux/storage/storage.selectors";
import { selectLoadingAddToCart, selectLoadingDeleteCart } from "../../redux/order/order.selectors";

class DeviceFeaturedList extends Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.swiping = false;
    this.state = {
      isOpenQuickView: false,
      selectedDevice: null
    }
  }
  componentDidMount() {
    this.resetList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingAddToCart !== this.props.loadingAddToCart) {
      if (this.props.loadingAddToCart === false) {
        this.resetList();
      }
    }
    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        this.resetList();
      }
    }
  }
  resetList() {
    const { featuredDeviceStart, featuredDeviceAnonymousStart, user } = this.props;

    if (user)
      featuredDeviceStart(LIMIT_FEATURED_DEVICES, 0);
    else
      featuredDeviceAnonymousStart(LIMIT_FEATURED_DEVICES, 0);
  }
  handleQuickView(device) {
    this.setState({
      isOpenQuickView: true,
      selectedDevice: device
    });
  }
  render() {
    const { devices, screenWidth, history, loading, translator } = this.props;
    const { isOpenQuickView, selectedDevice } = this.state;

    let headerHTML = null;
    switch (screenWidth) {
      case IS_MOBILE:
        headerHTML = (
          <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
            <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
              {translator.translate('title_featured_devices')}
            </div>
          </div>
        )
        break;
      default:
        headerHTML = (
          <div className="uk-container uk-margin-bottom">
            <div className="wc-widget-title">
              <h3>
                <span className="wc-title">
                  {translator.translate('title_featured_devices')}
                </span>
              </h3>
            </div>
          </div>
        )
        break;
    }

    return (
      <div className="wc-related-device">
        {headerHTML}
        <DeviceDetailPopup isOpen={isOpenQuickView}
          availableDevice={selectedDevice}
          onClose={() => this.setState({ isOpenQuickView: false })} />
        <div className="uk-container uk-position-relative">
          {loading && <CommonLoading />}
          {
            devices.length > 0
              ?
              <CommonMultipleCarousel carouselRef={this.carouselRef} screenWidth={screenWidth}
                devices={devices}>
                {
                  devices.map((device) => {
                    return (
                      <DeviceItemAvailable key={device.availableDeviceId} {...device}
                        onMouseDownCapture={(e) => e.preventDefault()}
                        onMouseUpCapture={() => {
                          this.swiping = this.carouselRef.current.innerSlider.state.swiping;
                        }}
                        onClick={() => {
                          if (this.swiping) {
                            event.preventDefault();
                          } else {
                            historyRedirect({ history, uri: 'device/' + device.availableDeviceId });
                          }
                        }}
                        onQuickView={(device) => {
                          this.handleQuickView(device);
                        }}
                      />
                    )
                  })
                }
              </CommonMultipleCarousel>
              :
              <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                {translator.translate('title_no_items')}
              </div>

          }
        </div>
      </div >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingFeaturedDevices,
  loadingAddToCart: selectLoadingAddToCart,
  loadingDeleteCart: selectLoadingDeleteCart,
  devices: selectFeaturedDevices,
  screenWidth: selectScreenWidth,
  user: selectCurrentUser,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  featuredDeviceStart: (limit, offset) => dispatch(featuredDeviceStart({ limit, offset })),
  featuredDeviceAnonymousStart: (limit, offset) => dispatch(featuredDeviceAnonymousStart({ limit, offset }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceFeaturedList));
