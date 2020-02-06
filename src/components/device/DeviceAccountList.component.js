import React, { Component } from "react";

import DeviceItem from "./DeviceItem.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingMyDevices, selectMyDevices, selectCountMyDevices } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { listMyDevicesStart, clearMyDevices } from "../../redux/device/device.action";
import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

import { withRouter } from "react-router";
import { historyRedirect } from "../../utils";
import CommonLoading from "../common/CommonLoading.component";
import ReactPaginate from "react-paginate";

class DeviceAccountList extends Component {
  constructor(props) {
    super(props);

    const { screenWidth } = this.props;

    this.state = {
      limit: screenWidth === IS_MOBILE ? 6 : 20,
      staticLimit: screenWidth === IS_MOBILE ? 6 : 20,
      initLimit: 100,
      filteredDevices: [],
      filteredDisplayDevices: [],
      filteredCountDevices: 0,
      page: 0,
      offset: 0
    }
  }
  componentDidMount() {
    this.resetListMyDevices();
  }
  componentWillUnmount() {
    this.props.clearMyDevices();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filterType !== this.props.filterType) {
      this.setState({
        offset: 0,
        filteredCountDevices: 0
      }, () => {
        this.resetListMyDevices();
      });
    }
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading === false) {
        this.setState({ filteredDevices: this.props.devices, filteredCountDevices: this.props.countDevices }, () => {
          this.resetDisplayDevices();
        });
      }
    }
  }
  resetDisplayDevices() {
    const { filteredDevices, offset, staticLimit, filteredCountDevices } = this.state;
    let filteredDisplayDevices = [];
    const rangeDisplay = (offset + staticLimit);
    if (rangeDisplay < filteredCountDevices) {
      filteredDisplayDevices = filteredDevices.slice(offset, rangeDisplay);
    } else
      filteredDisplayDevices = filteredDevices.slice(offset);
    this.setState({ filteredDisplayDevices });
  }
  resetListMyDevices() {
    const { listMyDevicesStart, devices, countDevices } = this.props;
    const { page, initLimit } = this.state;

    if (devices.length === 0)
      listMyDevicesStart(initLimit, page);
    else {
      const { filterType } = this.props;

      if (filterType === '') this.setState({ filteredDevices: devices, filteredCountDevices: countDevices }, () => {
        this.resetDisplayDevices();
      });
      else {
        let arr = [];
        for (let device of devices) {
          const { availableDevice } = device;
          switch (filterType) {
            case 'sale':
              if (availableDevice) {
                const { availableDeviceType } = availableDevice;
                if (availableDeviceType === 'sell') {
                  arr.push(device);
                }
              }
              break;
            case 'exchange':
              if (availableDevice) {
                const { availableDeviceType } = availableDevice;
                if (availableDeviceType === 'exchange')
                  arr.push(device);
              }
              break;
            case 'no':
              if (!availableDevice) {
                arr.push(device);
              }
              break;
          }
        }

        this.setState({ filteredDevices: arr, filteredCountDevices: arr.length }, () => {
          this.resetDisplayDevices();
        });
      }
    }
  }
  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.staticLimit);

    this.setState({ offset }, () => {
      this.resetListMyDevices();
    });
  }
  loadMore() {
    const { offset, staticLimit, limit, filteredCountDevices, filteredDevices } = this.state;

    this.setState({ limit: staticLimit + limit }, () => {
      const rangeDisplay = (offset + this.state.limit);
      let filteredDisplayDevices = [];
      if (rangeDisplay < filteredCountDevices) {
        filteredDisplayDevices = filteredDevices.slice(offset, rangeDisplay);
      } else
        filteredDisplayDevices = filteredDevices.slice(offset);
      this.setState({ filteredDisplayDevices });
    });
  }
  renderPreviousBtn() {
    const { offset } = this.state;

    if (offset > 0)
      return (
        <button type="button" className="wc-pagination-circle">
          <i className="fa fa-angle-left"></i>
        </button>
      )
    else
      return null;
  }
  renderNextBtn() {
    const { offset, staticLimit, filteredCountDevices: countDevices } = this.state;

    if ((offset + staticLimit) < countDevices)
      return (
        <button type="button" className="wc-pagination-circle">
          <i className="fa fa-angle-right"></i>
        </button>
      )
    else
      return null;
  }
  renderLoadMore() {
    const { limit, staticLimit, offset, filteredCountDevices: countDevices } = this.state;
    const { translator } = this.props;

    if ((offset + limit) < countDevices)
      return (
        <div className="uk-width-1-1 uk-text-center uk-margin-top uk-margin-large-bottom">
          <a className="uk-text-emphasis"
            onClick={() => this.loadMore()}>
            {translator.translate('lbl_more_devices', {
              number: staticLimit
            })}
          </a>
        </div>
      )
    else return null;
  }
  renderPagination(classPagination) {
    const { staticLimit, filteredCountDevices: countDevices } = this.state;

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
    const { history, screenWidth, loading, translator } = this.props;
    const { filteredDisplayDevices: devices } = this.state;

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
                        <DeviceItem {...device} available
                          key={device.deviceId}
                          onClick={() => {
                            historyRedirect({ history, uri: 'account/device/' + device.deviceId });
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
                {translator.translate('title_no_items')}
              </div>
          }
        </div>
      </div >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingMyDevices,
  devices: selectMyDevices,
  countDevices: selectCountMyDevices,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  listMyDevicesStart: (limit, offset) => dispatch(listMyDevicesStart({ limit, offset })),
  clearMyDevices: () => dispatch(clearMyDevices())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceAccountList));
