import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCategoryTitle, selectCategoryIds, selectBrandIds, selectTypes, selectCondition,
  selectColorIds
} from "../../redux/screen/screen.selectors";

import {
  selectLoadingListDeviceHome, selectDevicesHome,
  selectFilteredDevices, selectLoadingListDeviceAvailable, selectCountFilteredDevices
} from "../../redux/device/device.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { listDeviceHomeStart, listDeviceAvailableStart } from "../../redux/device/device.action";
import { clearAllCategory } from "../../redux/screen/screen.actions";

import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";
import DeviceItemAvailable from "./DeviceItemAvailable.component";
import { historyRedirect, getCategoryParams } from "../../utils";

import { withRouter } from "react-router";
import CommonMultipleCarousel from "../common/CommonMultipleCarousel.component";
import CommonLoading from "../common/CommonLoading.component";
import CommonImageHolder from "../common/CommonImageHolder.component";
import CommonButton from "../common/CommonButton.component";
import SortOrder from "../common/sort/SortOrder.component";
import FilterType from "../common/filter/FilterType.component";
import { selectLoadingAddToCart, selectLoadingDeleteCart } from "../../redux/order/order.selectors";
import DeviceDetailPopup from "./DeviceDetailPopup.component";

class DeviceSellExchangeList extends Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.swiping = false;
    this.state = {
      selectedTab: 'sell_exchange',
      isOpenQuickView: false,
      selectedDevice: null
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingAddToCart !== this.props.loadingAddToCart) {
      if (this.props.loadingAddToCart === false) {
        this.resetListDevicePC(10, 0);
      }
    }
    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        this.resetListDevicePC(10, 0);
      }
    }
  }
  onClickTab(type) {
    const { listDeviceHomeStart } = this.props;
    this.setState({
      selectedTab: type
    }, () => {
      listDeviceHomeStart(10, 0, this.state.selectedTab);
    })
  }
  resetListDevicePC(limit, page) {
    const { categoryTitle, categoryIds, brandIds, types, condition, listDeviceAvailableStart, colorIds } = this.props;
    const params = getCategoryParams({ title: categoryTitle, ids: categoryIds, brandIds, types, condition, colorIds });
    listDeviceAvailableStart(limit, page, params);
  }
  componentDidMount() {
    const { listDeviceHomeStart, screenWidth, clearAllCategory } = this.props;

    if (screenWidth === IS_MOBILE) {
      const { selectedTab } = this.state;
      listDeviceHomeStart(10, 0, selectedTab);
    } else {
      clearAllCategory();
      setTimeout(() => {
        if (screenWidth === IS_PC)
          this.resetListDevicePC(10, 0);
        else
          this.resetListDevicePC(8, 0);
      }, 500);
    }
  }
  handleFilter() {
    const { screenWidth } = this.props;
    if (screenWidth === IS_PC)
      this.resetListDevicePC(10, 0);
    else
      this.resetListDevicePC(8, 0);
  }
  handleQuickView(device) {
    this.setState({
      isOpenQuickView: true,
      selectedDevice: device
    });
  }
  renderHeader() {
    const { screenWidth } = this.props;
    const { selectedTab } = this.state;
    let headerHTML = null;

    switch (screenWidth) {
      case IS_MOBILE:
        headerHTML = (
          <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle">
            <div className="uk-flex uk-flex-between uk-width-1-1 uk-text-muted">
              <div className={'wc-mobile-tab-item uk-flex uk-flex-middle uk-flex-center ' + (selectedTab === 'sell_exchange' ? 'uk-text-active' : '')}
                onClick={() => this.onClickTab('sell_exchange')}>
                All
              </div>
              <div className={'wc-mobile-tab-item uk-flex uk-flex-middle uk-flex-center ' + (selectedTab === 'sell' ? 'uk-text-active' : '')}
                onClick={() => this.onClickTab('sell')}>
                Sale
              </div>
              <div className={'wc-mobile-tab-item uk-flex uk-flex-middle uk-flex-center ' + (selectedTab === 'exchange' ? 'uk-text-active' : '')}
                onClick={() => this.onClickTab('exchange')}>
                Exchange
              </div>
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
                  New Arrivals
                </span>
              </h3>
            </div>
          </div>
        )
        break;
    }

    return headerHTML;
  }
  renderContentPC() {
    const { devicesPC: devices, screenWidth, history } = this.props;
    const { isOpenQuickView, selectedDevice } = this.state;

    if (devices) {
      if (devices.length > 0) {
        let classGridDevices = ['uk-grid'];
        switch (screenWidth) {
          case IS_TABLET:
            classGridDevices.push('uk-child-width-1-4');
            break;
          case IS_PC:
            classGridDevices.push('uk-child-width-1-5');
            break;
        }

        return (
          <div>
            <DeviceDetailPopup isOpen={isOpenQuickView}
              availableDevice={selectedDevice}
              onClose={() => this.setState({ isOpenQuickView: false })} />
            <div className="uk-background-light uk-padding-tiny uk-flex uk-flex-between uk-flex-middle">
              <SortOrder onFilter={() => this.handleFilter()} />
              <FilterType onFilter={() => this.handleFilter()} type="select" />
            </div>
            <div className={classGridDevices.join(' ')}>
              {
                devices.map((device) => {
                  return (
                    <DeviceItemAvailable {...device}
                      key={device.availableDeviceId}
                      onClick={() => {
                        historyRedirect({ history, uri: 'device/' + device.availableDeviceId });
                      }}
                      onQuickView={(device) => {
                        this.handleQuickView(device);
                      }} />
                  )
                })
              }
            </div>
            <div className="uk-flex uk-flex-center uk-flex-middle">
              <CommonButton screenWidth={screenWidth} type="inverted"
                className="wc-btn" onClick={() => historyRedirect({ history, uri: 'category' })}>
                View More
              </CommonButton>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
            There are no items
          </div>
        )
      }
    } else {
      return (
        <div className="uk-padding-small">
          <CommonImageHolder />
        </div>
      )
    }
  }
  renderBodyPC() {
    return (
      <div>
        {this.renderContentPC()}
      </div>
    )
  }
  renderBody() {
    const { devices, screenWidth, history } = this.props;

    if (screenWidth === IS_MOBILE) {
      if (devices) {
        if (devices.length > 0) {
          return (
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
                      onClickCapture={() => {
                        if (this.swiping) {
                          event.preventDefault();
                        } else {
                          historyRedirect({ history, uri: 'device/' + device.availableDeviceId });
                        }
                      }}
                    />
                  )
                })
              }
            </CommonMultipleCarousel>
          )
        } else {
          return (
            <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no items
            </div>
          )
        }
      } else
        return <CommonImageHolder />;
    } else {
      return this.renderBodyPC();
    }
  }
  render() {
    const { loading, loadingPC } = this.props;

    return (
      <div className="wc-related-device">
        {this.renderHeader()}
        <div className="uk-container uk-position-relative">
          {
            (loading || loadingPC) ? <CommonLoading /> : null
          }
          {
            this.renderBody()
          }
        </div>
      </div >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingListDeviceHome,
  devices: selectDevicesHome,
  loadingPC: selectLoadingListDeviceAvailable,
  devicesPC: selectFilteredDevices,
  screenWidth: selectScreenWidth,
  categoryTitle: selectCategoryTitle,
  categoryIds: selectCategoryIds,
  brandIds: selectBrandIds,
  types: selectTypes,
  condition: selectCondition,
  countDevices: selectCountFilteredDevices,
  colorIds: selectColorIds,
  loadingAddToCart: selectLoadingAddToCart,
  loadingDeleteCart: selectLoadingDeleteCart
});

const mapDispatchToProps = dispatch => ({
  listDeviceHomeStart: (limit, offset, type) => dispatch(listDeviceHomeStart({ limit, offset, type })),
  listDeviceAvailableStart: (limit, offset, data) => dispatch(listDeviceAvailableStart({ limit, offset, params: data })),
  clearAllCategory: () => dispatch(clearAllCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceSellExchangeList));
