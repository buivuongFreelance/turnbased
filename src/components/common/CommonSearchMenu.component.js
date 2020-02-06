import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectListSearch, selectLoadingSearch } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTriggerSearch } from "../../redux/screen/screen.selectors";
import { listSearchStart } from "../../redux/device/device.action";

import { withRouter } from "react-router";
import CommonLoading from "./CommonLoading.component";
import CommonImage from "../common/CommonImage.component";
import NumberFormat from "react-number-format";

import { APPLE_ID, SAMSUNG_ID, SMARTPHONE_ID, TABLET_ID, SMARTWATCH_ID, IS_MOBILE } from "../../config";
import { displayStringExchangeBuyer } from "../../utils";

class CommonSearchMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isSearch: false
    }
  }
  componentDidMount() {
    this.input.focus();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.triggerSearch !== this.props.triggerSearch) {
      this.input.focus();
    }
  }
  handleKeyUp(ev) {
    const { key } = ev;

    if (key === 'Enter') {
      if (this.props.onSearch)
        this.props.onSearch(this.state.search);
    }
  }
  handleChange(ev) {
    this.setState({ search: ev.target.value }, () => {
      setTimeout(() => {
        const { search } = this.state;
        if (search) {
          if (search.length >= 2) {
            this.setState({ isSearch: true }, () => {
              const { listSearchStart } = this.props;
              listSearchStart(10, 0, search);
            });
          } else {
            this.setState({ isSearch: false });
          }
        }
      }, 500);
    });
  }
  handleCategory(name) {
    if (this.props.onFilterCategory) {
      this.setState({
        isSearch: true
      }, () => {
        this.props.onFilterCategory(name);
      });
    }
  }
  handleBrand(brand) {
    if (this.props.onFilterBrand) {
      this.setState({
        isSearch: true
      }, () => {
        this.props.onFilterBrand(brand);
      });
    }
  }
  renderImage(images) {
    let html = null;

    if (images) {
      if (images.length > 0) {
        html = (
          <CommonImage url={images[0].thumbnail_url}

            style={{ maxWidth: 'inherit' }}
            className="uk-img" />
        )
      } else {
        html = (
          <CommonImage url={''}
            style={{ maxWidth: 'inherit' }}
            className="uk-img" />
        )
      }
    } else {
      html = (
        <CommonImage url={''}
          style={{ maxWidth: 'inherit' }}
          className="uk-img" />
      )
    }
    return (
      <div className="wc-cart-item-img uk-width-img-popup">
        {html}
      </div>
    )
  }
  renderBlock(device) {
    const { availableDeviceExchangePrice,
      availableDeviceSalePrice, availableDeviceType,
      exchangeModelName, modelDetailName } = device;

    switch (availableDeviceType) {
      case 'sell':
        return (
          <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
            <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
            <div className="uk-margin-tiny-bottom">Available Type: Sale</div>
            <div className="uk-margin-tiny-bottom">Sale Price: <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
          </div>
        )
        break;
      case 'exchange':
        return (
          <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
            <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
            <div className="uk-margin-tiny-bottom">Available Type: Exchange</div>
            <div className="uk-margin-tiny-bottom">
              {
                displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)
              }
              <div className="uk-text-bold">
                <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
          </div >
        )
        break;
      case 'sell_exchange':
        return (
          <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
            <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
            <div className="uk-margin-tiny-bottom">Available Type: Sell Exchange</div>
            <div className="uk-margin-tiny-bottom">Sale Price: <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
            <div className="uk-margin-tiny-bottom">
              {
                displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)
              }
              <div className="uk-text-bold">
                <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
          </div>
        )
        break;
    }
  }
  renderQuicklink() {
    const { screenWidth } = this.props;

    if (screenWidth !== IS_MOBILE) {
      return (
        <Fragment>
          <h4>QUICK LINKS</h4>
          <ul className="uk-list">
            <li>
              <a className="uk-text-meta"
                onClick={() => this.handleCategory(SMARTPHONE_ID)}>Smart Phones</a>
            </li>
            <li>
              <a
                onClick={() => this.handleCategory(TABLET_ID)} className="uk-text-meta">Tablets</a>
            </li>
            <li>
              <a
                onClick={() => this.handleCategory(SMARTWATCH_ID)} className="uk-text-meta">Smart Watches</a>
            </li>
            <li>
              <a onClick={() => this.handleBrand(APPLE_ID)} className="uk-text-meta">Apple</a>
            </li>
            <li>
              <a onClick={() => this.handleBrand(SAMSUNG_ID)} className="uk-text-meta">Samsung</a>
            </li>
          </ul>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className="wc-sidebar-link">
            <a onClick={() => this.handleCategory(SMARTPHONE_ID)}>Smart Phones</a>
          </div>
          <div className="wc-sidebar-link">
            <a onClick={() => this.handleCategory(TABLET_ID)}>Tablets</a>
          </div>
          <div className="wc-sidebar-link">
            <a onClick={() => this.handleCategory(SMARTWATCH_ID)}>Smart Watches</a>
          </div>
          <div className="wc-sidebar-link">
            <a onClick={() => this.handleBrand(APPLE_ID)}>Apple</a>
          </div>
          <div className="wc-sidebar-link">
            <a onClick={() => this.handleBrand(SAMSUNG_ID)}>Samsung</a>
          </div>
        </Fragment>
      )
    }
  }
  renderDevices() {
    const { devices, history, screenWidth, loading } = this.props;
    if (devices) {
      if (screenWidth !== IS_MOBILE) {
        if (devices.length === 0) {
          return (
            <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no items
            </div>
          )
        } else {
          return (
            <div>
              {
                devices.map(device => {
                  const { availableDeviceId, images } = device;
                  return (
                    <div key={availableDeviceId} className="wc-cart-item uk-text-normal uk-flex uk-margin-medium-bottom uk-cursor"
                      onClick={() => {
                        history.push('/empty');
                        setTimeout(() => {
                          history.replace('/device/' + device.availableDeviceId);
                        }, 500);
                      }}>
                      {this.renderImage(images)}
                      {this.renderBlock(device)}
                    </div>
                  )
                })
              }
            </div>
          )
        }
      } else {
        if (devices.length === 0) {
          if (!loading)
            return (
              <div className="wc-sidebar-link">
                <a>There are no items</a>
              </div>
            )
        } else {
          if (!loading)
            return (
              <Fragment>
                {
                  devices.map(device => {
                    const { availableDeviceId } = device;
                    return (
                      <div className="wc-sidebar-link" key={availableDeviceId}>
                        <a
                          onClick={() => {
                            this.setState({
                              isSearch: false
                            }, () => {
                              this.props.onClickSearchItem(device.availableDeviceId)
                            })
                          }}>
                          {device.modelName}
                        </a>
                      </div>
                    )
                  })
                }
              </Fragment>
            )
        }
      }
    }
  }
  renderMobile() {
    const { loading } = this.props;
    const { isSearch } = this.state;

    return (
      <Fragment>
        <div className="wc-sidebar-search uk-search uk-search-default wc-sidebar-search uk-margin-xsmall-bottom">
          <span className="uk-icon uk-search-icon">
            <img src="icons/iconmonstr-search-thin-240.png" alt="search" width="20" height="20" />
          </span>
          <input className="uk-search-input" type="search" placeholder="Search..."
            onChange={(ev) => this.handleChange(ev)}
            onKeyUp={(ev) => this.handleKeyUp(ev)} ref={(instance => this.input = instance)} />
        </div>
        <div className="uk-margin-bottom">
          <a className="uk-text-active" onClick={() => {
            if (this.props.onCancelSearch)
              this.props.onCancelSearch();
          }}>Cancel</a>
        </div>
        {
          loading
          &&
          <div className="wc-sidebar-link uk-position-relative"
            style={{ height: '40vh', backgroundColor: '#000' }}>
            <CommonLoading color="#fff" classNameOverlay={'uk-overlay-dark uk-position-cover'} />
          </div>
        }
        {
          isSearch
            ?
            this.renderDevices()
            :
            this.renderQuicklink()
        }
      </Fragment>
    )
  }
  renderPC() {
    const { loading } = this.props;
    const { isSearch } = this.state;

    return (
      <div>
        <div className="wc-search-menu">
          <img src="icons/iconmonstr-search-thin-240.png" alt="search" width="20" height="20" />
          <input type="search" placeholder="Search Dingtoi" onChange={(ev) => this.handleChange(ev)}
            onKeyUp={(ev) => this.handleKeyUp(ev)} ref={(instance => this.input = instance)} />
        </div>
        <div className="wc-quick-link uk-text-black">
          <div className="uk-position-relative">
            {loading && <CommonLoading />}
            {
              isSearch
                ?
                this.renderDevices()
                :
                this.renderQuicklink()
            }
          </div>
        </div>
      </div>
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
  loading: selectLoadingSearch,
  devices: selectListSearch,
  triggerSearch: selectTriggerSearch,
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  listSearchStart: (limit, offset, textSearch) => dispatch(listSearchStart({ limit, offset, textSearch }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonSearchMenu));
