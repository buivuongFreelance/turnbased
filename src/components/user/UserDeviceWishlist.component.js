import React, { Component } from "react";

import DeviceItemAvailable from "../device/DeviceItemAvailable.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingWishlist, selectWishlist, selectCountWishlist } from "../../redux/device/device.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { listWishlistStart } from "../../redux/device/device.action";
import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

import { withRouter } from "react-router";
import { historyRedirect } from "../../utils";
import CommonLoading from "../common/CommonLoading.component";
import ReactPaginate from "react-paginate";

class UserDeviceWishlist extends Component {
  constructor(props) {
    super(props);

    const { screenWidth } = this.props;

    this.state = {
      limit: screenWidth === IS_MOBILE ? 6 : 20,
      staticLimit: screenWidth === IS_MOBILE ? 6 : 20,
      page: 0
    }
  }
  componentDidMount() {
    const { listWishlistStart } = this.props;
    const { limit, page } = this.state;
    listWishlistStart(limit, page);
  }
  handlePageClick(data) {
    const { staticLimit } = this.state;
    const { listMyDevicesStart } = this.props;

    let selected = data.selected;
    this.setState({ page: selected }, () => {
      listMyDevicesStart(staticLimit, this.state.page);
    });
  }
  loadMore() {
    const { limit, staticLimit } = this.state;
    const { listMyDevicesStart } = this.props;

    this.setState({ limit: limit + staticLimit }, () => {
      listMyDevicesStart(this.state.limit, this.state.page);
    });
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
  renderLoadMore() {
    const { staticLimit, limit } = this.state;
    const { countDevices } = this.props;
    if (limit < countDevices)
      return (
        <div className="uk-width-1-1 uk-text-center uk-margin-top uk-margin-large-bottom">
          <a className="uk-text-emphasis"
            onClick={() => this.loadMore()}>See {staticLimit} more devices</a>
        </div>
      )
    else return null;
  }
  renderPagination(classPagination) {
    const { countDevices } = this.props;
    const { staticLimit } = this.state;

    const pageCount = Math.ceil(countDevices / staticLimit);

    if (pageCount > 1)
      return <div className={classPagination.join(' ')}>
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
    const { devices, history, screenWidth, loading } = this.props;

    let classGridDevices = ['uk-grid'];
    let classPagination = ['uk-width-1-1 uk-margin-top'];

    switch (screenWidth) {
      case IS_MOBILE:
        classGridDevices.push('uk-child-width-1-2');
        break;
      case IS_TABLET:
        classGridDevices.push('uk-child-width-1-4');
        classPagination.push('uk-text-center');
        break;
      case IS_PC:
        classGridDevices.push('uk-child-width-1-5');
        classPagination.push('uk-text-right');
        break;
    }

    return (
      <div className="wc-related-device">
        <div className={screenWidth === IS_MOBILE ? 'uk-container uk-position-relative uk-margin-top' : 'uk-position-relative'}>
          {loading && <CommonLoading />}
          {
            devices.length
              ?
              <div>
                <div className={classGridDevices.join(' ')}>
                  {
                    devices.map((device) => {
                      return (
                        <DeviceItemAvailable {...device}
                          key={device.availableDeviceId}
                          onClick={() => {
                            historyRedirect({ history, uri: 'device/' + device.availableDeviceId });
                          }} />
                      )
                    })
                  }
                </div>
                {
                  screenWidth === IS_MOBILE
                    ? this.renderLoadMore()
                    :
                    this.renderPagination(classPagination)
                }
              </div>
              :
              <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                There are no items
              </div>
          }
        </div>
      </div >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingWishlist,
  devices: selectWishlist,
  countDevices: selectCountWishlist,
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  listWishlistStart: (limit, offset) => dispatch(listWishlistStart({ limit, offset }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDeviceWishlist));
