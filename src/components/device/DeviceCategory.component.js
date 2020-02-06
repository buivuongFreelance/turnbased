import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectScreenWidth, selectCategoryTitle, selectCategoryIds, selectBrandIds, selectTypes, selectCondition,
  selectColorIds
} from "../../redux/screen/screen.selectors";
import { selectFilteredDevices, selectLoadingListDeviceAvailable, selectCountFilteredDevices } from "../../redux/device/device.selectors";

import { listDeviceAvailableStart } from "../../redux/device/device.action";

import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";
import CommonFilterCategory from "../common/CommonFilterCategory.component";
import CommonSortCategory from "../common/CommonSortCategory.component";
import { getCategoryParams, historyRedirect } from "../../utils";
import CommonLoading from "../common/CommonLoading.component";
import CommonImageHolder from "../common/CommonImageHolder.component";
import DeviceItemAvailable from "./DeviceItemAvailable.component";

import { withRouter } from "react-router";
import ReactPaginate from "react-paginate";
import CommonCategoryLabel from "../common/CommonCategoryLabel.component";
import { selectLoadingAddToCart, selectLoadingDeleteCart } from "../../redux/order/order.selectors";
import DeviceDetailPopup from "./DeviceDetailPopup.component";

class DeviceCategory extends Component {
  constructor(props) {
    super(props);

    const { screenWidth } = this.props;
    let limit = 6;

    if (screenWidth === IS_TABLET)
      limit = 9;
    else if (screenWidth === IS_PC)
      limit = 12;

    this.state = {
      limit: limit,
      staticLimit: limit,
      page: 0,
      isOpenQuickView: false,
      selectedDevice: null
    }
  }
  componentDidMount() {
    const { limit } = this.state;
    this.resetListDevice(limit, 0);
  }
  componentDidUpdate(prevProps) {
    const { limit } = this.state;
    if (prevProps.loadingAddToCart !== this.props.loadingAddToCart) {
      if (this.props.loadingAddToCart === false) {
        this.resetListDevice(limit, 0);
      }
    }
    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        this.resetListDevice(limit, 0);
      }
    }
  }
  resetListDevice(limit, page) {
    const { categoryTitle, categoryIds, brandIds, types, condition, listDeviceAvailableStart, colorIds } = this.props;
    const params = getCategoryParams({ title: categoryTitle, ids: categoryIds, brandIds, types, condition, colorIds });
    listDeviceAvailableStart(limit, page, params);
  }
  handleFilter() {
    const { staticLimit } = this.state;
    this.resetListDevice(staticLimit, 0);
  }
  handlePageClick(data) {
    const { staticLimit } = this.state;

    let selected = data.selected;
    this.setState({ page: selected }, () => {
      this.resetListDevice(staticLimit, this.state.page);
    });
  }
  loadMore() {
    const { limit, staticLimit } = this.state;

    this.setState({ limit: limit + staticLimit }, () => {
      this.resetListDevice(this.state.limit, this.state.page);
    });
  }
  handleQuickView(device) {
    this.setState({
      isOpenQuickView: true,
      selectedDevice: device
    });
  }
  renderLoadMore() {
    const { staticLimit, limit } = this.state;
    const { countDevices } = this.props;
    if (limit < countDevices)
      return (
        <div className="uk-width-1-1 uk-text-center uk-margin-top uk-margin-large-bottom">
          <a className="uk-text-active"
            onClick={() => this.loadMore()}>See {staticLimit} more devices</a>
        </div>
      )
    else return null;
  }
  renderMobile() {
    const { loading } = this.props;
    return (
      <div className="uk-position-relative">
        {
          loading && <CommonLoading />
        }
        <div className="uk-margin-xsmall-bottom">
          <CommonCategoryLabel
            clearSearch={
              () => {
                const { limit, page } = this.state;
                this.resetListDevice(limit, page);
              }} />
        </div>
        {
          this.renderContentPC()
        }
      </div>
    )
  }
  renderContentPC() {
    const { devices, screenWidth, history } = this.props;

    if (devices) {
      if (devices.length > 0) {
        let classGridDevices = ['uk-grid'];
        switch (screenWidth) {
          case IS_MOBILE:
            classGridDevices.push('uk-child-width-1-2');
            break;
          case IS_TABLET:
            classGridDevices.push('uk-child-width-1-3');
            break;
          case IS_PC:
            classGridDevices.push('uk-child-width-1-4');
            break;
        }

        return (
          <div>
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
            {
              screenWidth === IS_MOBILE
                ?
                this.renderLoadMore()
                :
                this.renderPagination()
            }
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
  renderPC() {
    const { loading } = this.props;
    const { isOpenQuickView, selectedDevice } = this.state;

    return (
      <div className="uk-grid">
        <DeviceDetailPopup isOpen={isOpenQuickView}
          availableDevice={selectedDevice}
          onClose={() => this.setState({ isOpenQuickView: false })} />
        <div className="uk-width-1-5">
          <CommonFilterCategory onFilter={() => this.handleFilter()} />
        </div>
        <div className="uk-width-4-5">
          <div>
            <CommonSortCategory onFilter={() => this.handleFilter()} />
          </div>
          <CommonCategoryLabel
            clearSearch={
              () => {
                const { limit, page } = this.state;
                this.resetListDevice(limit, page);
              }} />
          <div className="uk-margin-top uk-position-relative">
            {
              loading && <CommonLoading />
            }
            {
              this.renderContentPC()
            }
          </div>
        </div>
      </div>
    )
  }
  renderPreviousBtn() {
    const { page } = this.state;

    if (page > 0)
      return (
        <button type="button" className="wc-pagination-circle">
          <i className="fa fa-angle-left"></i>
        </button>
      )
    else
      return null;
  }
  renderNextBtn() {
    const { page, staticLimit } = this.state;
    const { countDevices } = this.props;

    if (((page + 1) * staticLimit) <= countDevices)
      return (
        <button type="button" className="wc-pagination-circle">
          <i className="fa fa-angle-right"></i>
        </button>
      )
    else
      return null;
  }
  renderPagination() {
    const { countDevices } = this.props;
    const { staticLimit } = this.state;

    const pageCount = Math.ceil(countDevices / staticLimit);

    if (pageCount > 1)
      return <div className="uk-text-center uk-margin-top">
        <ReactPaginate
          previousLabel={this.renderPreviousBtn()}
          nextLabel={this.renderNextBtn()}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => this.handlePageClick(data)}
          containerClassName={'pagination uk-padding-remove'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    else return null;
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
  screenWidth: selectScreenWidth,
  loading: selectLoadingListDeviceAvailable,
  devices: selectFilteredDevices,
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
  listDeviceAvailableStart: (limit, offset, data) => dispatch(listDeviceAvailableStart({ limit, offset, params: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceCategory));
