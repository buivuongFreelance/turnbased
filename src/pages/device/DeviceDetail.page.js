import React, { Component, Fragment } from "react";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingSelectedDevice, selectSelectedDeviceAvailable, selectLoadingWishlist } from "../../redux/device/device.selectors";
import { getDeviceAvailableStart, addWishlistStart, deleteWishlistStart } from "../../redux/device/device.action";

import { selectLoadingAddToCart, selectLoadingDeleteCart, selectLoadingAddToCartTracing } from "../../redux/order/order.selectors";
import { addToCartStart, deleteCartStart, listCartStart, addToCartTracingStart } from "../../redux/order/order.actions";

import { selectCurrentUser, selectAnonymousId } from "../../redux/storage/storage.selectors";

import { IS_MOBILE, DEVICE_GRADE_TITLE } from "../../config";
import withApp from "../../hoc/withApp.hoc";
import { historyRedirect, displayStringExchangeBuyer, displayStringExchangeSellerShort } from "../../utils";

import CommonModalConfirm from "../../components/common/CommonModalConfirm.component";
import DeviceImages from "../../components/device/DeviceImages.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import CommonLoading from "../../components/common/CommonLoading.component";
import NumberFormat from "react-number-format";
import CommonPageHolder from "../../components/common/CommonPageHolder.component";
import CommonButton from "../../components/common/CommonButton.component";
import Popup from "reactjs-popup";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class DeviceDetailPage extends Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);

    this.state = {
      selectedChecked: 'sale'
    }
  }
  componentDidMount() {
    const { getDeviceAvailableStart, match: { params: { id } } } = this.props;
    getDeviceAvailableStart(id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingWishlist !== this.props.loadingWishlist) {
      if (this.props.loadingWishlist === false) {
        const { getDeviceAvailableStart, match: { params: { id } } } = this.props;
        getDeviceAvailableStart(id);
      }
    }

    if (prevProps.loadingAddToCart !== this.props.loadingAddToCart) {
      if (this.props.loadingAddToCart === false) {
        const { getDeviceAvailableStart, listCartStart, match: { params: { id } } } = this.props;
        getDeviceAvailableStart(id);
        listCartStart(100, 0);
      }
    }

    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        const { getDeviceAvailableStart, listCartStart, match: { params: { id } } } = this.props;
        getDeviceAvailableStart(id);
        listCartStart(100, 0);
      }
    }

    if (prevProps.loadingAddToCartTracing !== this.props.loadingAddToCartTracing) {
      if (this.props.loadingAddToCartTracing === false) {
        const { getDeviceAvailableStart, listCartStart, match: { params: { id } } } = this.props;
        getDeviceAvailableStart(id);
        listCartStart(100, 0);
      }
    }
  }
  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  deleteWishlist() {
    const { deleteWishlistStart, match: { params: { id } } } = this.props;
    deleteWishlistStart(id);
  }
  addWishlist() {
    const { addWishlistStart, user, history, match: { params: { id } } } = this.props;
    if (!user) {
      historyRedirect({ history, uri: 'signInAndSignUp' });
    } else
      addWishlistStart(id);
  }
  deleteCart() {
    const { deleteCartStart, device: { cart: { id } } } = this.props;
    deleteCartStart(id);
  }

  addToCart() {
    const { addToCartStart, user, device, match: { params: { id } } } = this.props;
    const { selectedChecked } = this.state;

    if (!user) {
      /*const { availableDeviceType } = device;
      if (availableDeviceType === 'sell')
        addToCartTracingStart(id, 'sale', anonymous);
      else if (availableDeviceType === 'exchange')
        addToCartTracingStart(id, 'exchange', anonymous);
      else {
        if (selectedChecked)
          addToCartTracingStart(id, selectedChecked, anonymous);
      }*/
    } else {
      const { availableDeviceType } = device;
      if (availableDeviceType === 'sell')
        addToCartStart(id, 'sale');
      else if (availableDeviceType === 'exchange')
        addToCartStart(id, 'exchange');
      else {
        if (selectedChecked)
          addToCartStart(id, selectedChecked);
      }
    }
  }
  handleChangeChecked(ev) {
    switch (ev.target.value) {
      case 'sale':
        this.setState({
          selectedChecked: ev.target.value,
        });
        break;
      case 'exchange':
        this.setState({
          selectedChecked: ev.target.value,
        });
        break;
    }
  }
  renderSale() {
    const { device, screenWidth, translator } = this.props;
    const { availableDeviceSalePrice } = device;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if (screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <Fragment>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
            <div>{translator.translate('title_sale')}</div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_sale_price')}</div>
            <div>
              <div className="uk-width-small">
                <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
          </div>
        </li>
      </Fragment>
    )
  }
  renderDeviceExchange() {
    const { device, translator } = this.props;
    const { availableDeviceExchangePrice, exchangeModelName } = device;

    return (
      <div className="uk-width-small">
        {displayStringExchangeSellerShort(availableDeviceExchangePrice, 0, translator)}
        <b>
          <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
        </b>
        {displayStringExchangeSellerShort(availableDeviceExchangePrice, 1, translator)}
        <b>{exchangeModelName}</b>
      </div>
    )
  }

  renderExchange() {
    const { screenWidth, translator } = this.props;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if (screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <Fragment>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
            <div>{translator.translate('title_exchange')}</div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>
              {translator.translate('title_exchange_device')}
            </div>
            <div>
              {this.renderDeviceExchange()}
            </div>
          </div>
        </li>
      </Fragment>
    )
  }

  renderAll() {
    const { device, screenWidth, translator } = this.props;
    const { availableDeviceSalePrice } = device;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if (screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <Fragment>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
            <div className="uk-width-small">{translator.translate('title_sale_exchange')}</div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_sale_price')}</div>
            <div>
              <div className="uk-width-small">
                <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>
              {translator.translate('title_exchange_device')}
            </div>
            <div className="uk-width-small">
              {this.renderDeviceExchange()}
            </div>
          </div>
        </li>
      </Fragment>
    )
  }
  renderState() {
    const { screenWidth, translator, device } = this.props;

    if (device) {
      const { deviceGrade } = device;

      let classWidth = ['uk-flex'];
      let classTitleHeader = ['uk-text-bold'];

      if (screenWidth !== IS_MOBILE) {
        classTitleHeader.push('uk-width-small');
      } else {
        classWidth.push('uk-flex-between');
      }

      return (
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_grade')}</div>
            <div>{translator.translate(DEVICE_GRADE_TITLE[deviceGrade])}</div>
          </div>
        </li>
      )
    }
  }
  renderAvailable() {
    const { device, screenWidth } = this.props;
    const { modelDetailName, availableDeviceType } = device;
    let blockAvailable = null;

    let classUL = ['uk-list uk-text-small'];
    if (screenWidth === IS_MOBILE)
      classUL.push('uk-list-striped');

    switch (availableDeviceType) {
      case 'exchange':
        blockAvailable = (
          this.renderExchange()
        )
        break;
      case 'sell':
        blockAvailable = (
          this.renderSale()
        )
        break;
      case 'sell_exchange':
        blockAvailable = (
          this.renderAll()
        )
      default:
        break;
    }

    return (
      <Fragment>
        <div className="uk-text-bold uk-text-lead">{modelDetailName}</div>

        <ul className={classUL.join(' ')}>
          {blockAvailable}
          {this.renderState()}
        </ul>
      </Fragment>
    )
  }
  renderSpecs() {
    const { device, screenWidth } = this.props;

    if (device) {
      const { categoryName, imeiImei, brandName, colorName, deviceCondition, deviceOriginalPrice,
        modelName, ramName, capacityName } = device;
      let arrSpec = [
        { t: 'Imei', v: imeiImei },
        { t: 'Category', v: categoryName },
        { t: 'Brand', v: brandName },
        { t: 'Model', v: modelName },
        { t: 'Color', v: colorName },
        { t: 'Capacity', v: capacityName },
        { t: 'RAM', v: ramName },
        { t: 'Original Price', v: <NumberFormat value={deviceOriginalPrice} displayType="text" thousandSeparator={true} prefix={'$'} /> },
        { t: 'Device Condition', v: deviceCondition + ' %' }
      ];

      if (screenWidth === IS_MOBILE)
        return (
          <Fragment>
            <div className="uk-text-bold uk-text-lead">System Configuration</div>
            <ul className="uk-list uk-text-small uk-list-striped">
              {
                arrSpec.map((spec, index) => {
                  return (
                    <li key={index}>
                      <div className="uk-flex uk-flex-between uk-width-1-1">
                        <div className="uk-text-bold">{spec.t}</div>
                        <div className="uk-text-right">{spec.v}</div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </Fragment>
        )
      else
        return (
          <Fragment>
            <div className="uk-text-bold uk-text-lead">System Configuration</div>
            <ul className="uk-list uk-text-small">
              {
                arrSpec.map((spec, index) => {
                  return (
                    <li key={index}>
                      <div className="uk-flex uk-flex-between uk-width-medium">
                        <div className="uk-text-bold">{spec.t}</div>
                        <div className="uk-text-right">{spec.v}</div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </Fragment>
        )
    }
  }
  renderCommands() {
    const { screenWidth, loading, loadingWishlist, loadingAddToCart, loadingAddToCartTracing, loadingDeleteCart, device, history } = this.props;
    const { wishlist, cart, availableDeviceType } = device;

    if (screenWidth === IS_MOBILE)
      return (
        <div className="wc-navbar-wrapper-footer">
          <div className="uk-flex uk-position-relative">
            {(loading || loadingWishlist || loadingAddToCart || loadingAddToCartTracing || loadingDeleteCart) && <CommonLoading />}
            <div className="wc-navbar-link-wrapper uk-width-1-1">
              <div className="uk-flex">
                <div className="uk-width-1-2">
                  {
                    wishlist
                      ?
                      <CommonModalConfirm
                        screenWidth={screenWidth}
                        message="Do you really want to remove wishlist ?"
                        onOk={close => {
                          this.deleteWishlist();
                          close();
                        }}
                        trigger={
                          <CommonButton screenWidth={screenWidth}
                            onClick={() => this.deleteWishlist()}
                            className="wc-btn navbar-button uk-margin-remove">
                            <div className="uk-flex uk-flex-middle uk-flex-center">
                              <i className="fa fa-heart-o" />
                              <div className="uk-margin-xsmall-left">Remove</div>
                            </div>
                          </CommonButton>
                        }
                      />
                      :
                      <CommonButton screenWidth={screenWidth}
                        onClick={() => this.addWishlist()}
                        className="wc-btn navbar-button uk-margin-remove">
                        <div className="uk-flex uk-flex-middle uk-flex-center">
                          <i className="fa fa-heart-o" />
                          <div className="uk-margin-xsmall-left">Add Wishlist</div>
                        </div>
                      </CommonButton>
                  }
                </div>
                <div className="uk-width-1-2">
                  {
                    cart
                      ?
                      <CommonButton screenWidth={screenWidth}
                        onClick={() => historyRedirect({ history, uri: 'bags' })}
                        className="wc-btn navbar-button uk-margin-remove" type="inverted">
                        <div className="uk-flex uk-flex-middle uk-flex-center">
                          <i className="fa fa-shopping-bag" />
                          <div className="uk-margin-xsmall-left">Go To Cart</div>
                        </div>
                      </CommonButton>
                      :
                      <Fragment>
                        {
                          availableDeviceType === 'sell_exchange'
                            ?
                            <Popup
                              trigger={
                                <CommonButton screenWidth={screenWidth}
                                  className="wc-btn navbar-button uk-margin-remove" type="inverted">
                                  <div className="uk-flex uk-flex-middle uk-flex-center">
                                    <i className="fa fa-shopping-bag" />
                                    <div className="uk-margin-xsmall-left">Add To Cart</div>
                                  </div>
                                </CommonButton>
                              }
                              modal
                              contentStyle={{ width: 'auto', border: 'none', padding: '10px' }}
                              closeOnDocumentClick
                            >
                              {
                                close => {
                                  return this.renderPopup(close);
                                }
                              }
                            </Popup>
                            :
                            <CommonButton screenWidth={screenWidth}
                              onClick={() => this.addToCart()}
                              className="wc-btn navbar-button uk-margin-remove" type="inverted">
                              <div className="uk-flex uk-flex-middle uk-flex-center">
                                <i className="fa fa-shopping-bag" />
                                <div className="uk-margin-xsmall-left">Add To Cart</div>
                              </div>
                            </CommonButton>
                        }
                      </Fragment>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    else {
      return (
        <div>
          <div>
            {
              wishlist
                ?
                <CommonModalConfirm
                  screenWidth={screenWidth}
                  message="Do you really want to remove wishlist ?"
                  onOk={close => {
                    this.deleteWishlist();
                    close();
                  }}
                  trigger={
                    <CommonButton screenWidth={screenWidth}
                      onClick={() => this.addWishlist()}
                      className="wc-btn uk-width-medium uk-margin-small-bottom">
                      <div className="uk-flex uk-flex-middle uk-flex-center">
                        <i className="fa fa-heart-o" style={{ marginTop: '-2px' }} />
                        <div className="uk-margin-xsmall-left">Remove Wishlist</div>
                      </div>
                    </CommonButton>
                  }
                />
                :
                <CommonButton screenWidth={screenWidth}
                  onClick={() => this.addWishlist()}
                  className="wc-btn uk-width-medium uk-margin-small-bottom">
                  <div className="uk-flex uk-flex-middle uk-flex-center">
                    <i className="fa fa-heart-o" style={{ marginTop: '-2px' }} />
                    <div className="uk-margin-xsmall-left">Add Wishlist</div>
                  </div>
                </CommonButton>
            }
          </div>
          <div>
            {
              cart
                ?
                <CommonButton screenWidth={screenWidth}
                  onClick={() => historyRedirect({ history, uri: 'bags' })}
                  type="inverted"
                  className="wc-btn uk-width-medium">
                  <div className="uk-flex uk-flex-middle uk-flex-center">
                    <i className="fa fa-shopping-bag" style={{ marginTop: '-4px' }} />
                    <div className="uk-margin-xsmall-left">Go To Cart</div>
                  </div>
                </CommonButton>
                :
                <Fragment>
                  {
                    availableDeviceType === 'sell_exchange'
                      ?
                      <Popup
                        trigger={
                          <CommonButton screenWidth={screenWidth}
                            type="inverted"
                            className="wc-btn uk-width-medium">
                            <div className="uk-flex uk-flex-middle uk-flex-center">
                              <i className="fa fa-shopping-bag" style={{ marginTop: '-4px' }} />
                              <div className="uk-margin-xsmall-left">Add To Cart</div>
                            </div>
                          </CommonButton>
                        }
                        modal
                        contentStyle={{ width: 'auto', border: 'none', padding: '10px' }}
                        closeOnDocumentClick
                      >
                        {
                          close => {
                            return this.renderPopup(close);
                          }
                        }
                      </Popup>
                      :
                      <CommonButton screenWidth={screenWidth}
                        onClick={() => this.addToCart()}
                        type="inverted"
                        className="wc-btn uk-width-medium">
                        <div className="uk-flex uk-flex-middle uk-flex-center">
                          <i className="fa fa-shopping-bag" style={{ marginTop: '-4px' }} />
                          <div className="uk-margin-xsmall-left">Add To Cart</div>
                        </div>
                      </CommonButton>
                  }
                </Fragment>
            }
          </div>
        </div>
      )
    }
  }
  renderPopup(close) {
    const { device, screenWidth } = this.props;
    const { availableDeviceSalePrice, availableDeviceExchangePrice, exchangeModelName } = device;
    const { selectedChecked } = this.state;

    return (
      <Fragment>
        <a className="uk-badge uk-position-top-right uk-position-cart wc-close-modal"
          onClick={() => close()}>
          <i className="fa fa-close" />
        </a>
        <div className="uk-padding-small">
          <div className="uk-text-lead uk-text-bold">
            Choose 1 of 2 options
        </div>
          <div className="uk-margin">
            <label>
              <input className="uk-radio" value="sale" type="radio" name="available"
                checked={selectedChecked === 'sale'}
                onChange={(ev) => this.handleChangeChecked(ev)} /> Buy with&nbsp;
              <span className="uk-text-bold">
                <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
              </span>
            </label>
          </div>
          <div className="uk-margin">
            <label>
              <input className="uk-radio" value="exchange" type="radio" name="available"
                checked={selectedChecked === 'exchange'}
                onChange={(ev) => this.handleChangeChecked(ev)} /> {displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)}
              &nbsp;<span className="uk-text-bold">
                {
                  availableDeviceExchangePrice !== 0
                  &&
                  <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
                }
              </span>
            </label>
          </div>
          <CommonButton screenWidth={screenWidth}
            onClick={() => {
              close();
              if (selectedChecked) {
                this.addToCart();
              } else {
                alertify.error('Please Select Sale Or Exchange');
              }
            }}
            type="inverted"
            className="wc-btn">
            <div className="uk-flex uk-flex-middle uk-flex-center">
              <i className="fa fa-shopping-bag" style={{ marginTop: '-4px' }} />
              <div className="uk-margin-xsmall-left">Add To Cart</div>
            </div>
          </CommonButton>
        </div>
      </Fragment>
    )
  }
  renderPC() {
    const { device, screenWidth, loadingAddToCart, loadingAddToCartTracing,
      loading, loadingWishlist, loadingDeleteCart } = this.props;

    if (device) {
      return (
        <Fragment>
          <CommonBreadcrumb list={[{ name: 'Device' }]} />
          <div className="uk-container uk-margin-medium-top uk-margin-medium-bottom uk-position-relative">
            {
              (loading || loadingWishlist || loadingDeleteCart || loadingAddToCart || loadingAddToCartTracing) && <CommonLoading />
            }
            <div className="uk-grid">
              <div className="uk-width-1-2 uk-position-relative">
                <DeviceImages device={device} screenWidth={screenWidth} />
              </div>
              <div className="uk-width-1-2">
                {this.renderAvailable()}
                {this.renderCommands()}
                {this.renderSpecs()}
              </div>
            </div>
          </div>
        </Fragment>
      )
    } else return <CommonPageHolder />;
  }
  renderMobile() {
    const { device, screenWidth, loadingAddToCart, loadingDeleteCart, loadingAddToCartTracing,
      loading, loadingWishlist, translator } = this.props;

    if (device) {
      return (
        <Fragment>
          <div className="uk-position-relative">
            <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
              <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                {translator.translate('title_device_detail')}
              </div>
            </div>
            <div className="uk-container uk-margin-top">
              {
                (loading || loadingWishlist || loadingAddToCart || loadingDeleteCart || loadingAddToCartTracing) && <CommonLoading />
              }
              <div className="wc-block-wrapper">
                <div className="uk-padding uk-position-relative">
                  <DeviceImages device={device} screenWidth={screenWidth} />
                </div>
                {this.renderAvailable()}
                <hr />
                {this.renderSpecs()}
              </div>
            </div>
          </div>
          {this.renderCommands()}
        </Fragment>
      )
    } else return <CommonPageHolder />;

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
  loading: selectLoadingSelectedDevice,
  loadingWishlist: selectLoadingWishlist,
  device: selectSelectedDeviceAvailable,
  loadingAddToCart: selectLoadingAddToCart,
  loadingDeleteCart: selectLoadingDeleteCart,
  user: selectCurrentUser,
  anonymous: selectAnonymousId,
  loadingAddToCartTracing: selectLoadingAddToCartTracing,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  getDeviceAvailableStart: (id) => dispatch(getDeviceAvailableStart({ id })),
  addWishlistStart: (id) => dispatch(addWishlistStart({ availableDeviceId: id })),
  deleteWishlistStart: (id) => dispatch(deleteWishlistStart({ availableDeviceId: id })),
  addToCartStart: (id, type) => dispatch(addToCartStart({ availableDeviceId: id, availableDeviceType: type })),
  deleteCartStart: (id) => dispatch(deleteCartStart({ id })),
  listCartStart: (limit, offset) => dispatch(listCartStart({ limit, offset })),
  addToCartTracingStart: (id, type, token) => dispatch(addToCartTracingStart({ availableDeviceId: id, availableDeviceType: type, token })),
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceDetailPage)));
