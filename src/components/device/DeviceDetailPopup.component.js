import React, { Component, Fragment } from "react";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingSelectedDevice, selectSelectedDeviceAvailable, selectLoadingWishlist } from "../../redux/device/device.selectors";
import { getDeviceAvailableStart, addWishlistStart, deleteWishlistStart, clearSelectedDeviceAvailable } from "../../redux/device/device.action";

import { selectLoadingAddToCart, selectLoadingDeleteCart, selectLoadingAddToCartTracing } from "../../redux/order/order.selectors";
import { addToCartStart, deleteCartStart, listCartStart, addToCartTracingStart } from "../../redux/order/order.actions";

import { selectCurrentUser, selectAnonymousId } from "../../redux/storage/storage.selectors";

import { IS_MOBILE, DEVICE_GRADE_TITLE } from "../../config";
import { historyRedirect, displayStringExchangeBuyer, displayStringExchangeSellerShort } from "../../utils";

import CommonModalConfirm from "../../components/common/CommonModalConfirm.component";
import DeviceImages from "../../components/device/DeviceImages.component";
import CommonLoading from "../../components/common/CommonLoading.component";
import NumberFormat from "react-number-format";
import CommonButton from "../../components/common/CommonButton.component";
import CommonImageHolder from "../../components/common/CommonImageHolder.component";
import Popup from "reactjs-popup";

import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";

class DeviceDetailPopup extends Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);

    this.state = {
      selectedChecked: 'sale'
    }
  }

  handleOpen() {
    const { getDeviceAvailableStart, availableDevice } = this.props;
    getDeviceAvailableStart(availableDevice.availableDeviceId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadingWishlist !== this.props.loadingWishlist) {
      if (this.props.loadingWishlist === false) {
        this.resetDeviceAvailable();
      }
    }

    if (prevProps.loadingAddToCart !== this.props.loadingAddToCart) {
      if (this.props.loadingAddToCart === false) {
        this.resetDeviceAvailable();
        this.resetListCart();
        this.props.onClose();
      }
    }

    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        this.resetDeviceAvailable();
        this.resetListCart();
      }
    }

    if (prevProps.loadingAddToCartTracing !== this.props.loadingAddToCartTracing) {
      if (this.props.loadingAddToCartTracing === false) {
        this.resetDeviceAvailable();
        this.resetListCart();
      }
    }
  }

  resetListCart() {
    this.props.listCartStart(20, 0);
  }

  resetDeviceAvailable() {
    const { getDeviceAvailableStart, device } = this.props;
    if (device)
      getDeviceAvailableStart(device.availableDeviceId);
  }

  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  deleteWishlist() {
    const { deleteWishlistStart, device } = this.props;
    deleteWishlistStart(device.availableDeviceId);
  }
  addWishlist() {
    const { addWishlistStart, user, history, device } = this.props;
    if (!user) {
      historyRedirect({ history, uri: 'signInAndSignUp' });
    } else
      addWishlistStart(device.availableDeviceId);
  }
  deleteCart() {
    const { deleteCartStart, device: { cart: { id } } } = this.props;
    deleteCartStart(id);
  }

  addToCart() {
    const { addToCartStart, user, device } = this.props;
    const { availableDeviceId: id } = device;
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
  renderPriceExchange() {
    const { device } = this.props;
    const { availableDeviceExchangePrice, exchangeModelName } = device;

    return (
      <div className="uk-text-right">
        <div>
          {displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)}
        </div>
        {
          availableDeviceExchangePrice !== 0
          &&
          <div className="wc-price">
            <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </div>
        }
      </div>
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
            <div>{translator.translate('title_sale_exchange')}</div>
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
            <div>
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
    const { device, screenWidth, translator } = this.props;

    if (device) {
      const { categoryName, imeiImei, brandName, colorName,
        modelName, ramName, capacityName } = device;
      let arrSpec = [
        { t: translator.translate('lbl_imei'), v: imeiImei },
        { t: translator.translate('lbl_category'), v: categoryName },
        { t: translator.translate('lbl_brand'), v: brandName },
        { t: translator.translate('lbl_model'), v: modelName },
        { t: translator.translate('lbl_color'), v: colorName },
        { t: translator.translate('lbl_capacity'), v: capacityName },
        { t: translator.translate('lbl_ram'), v: ramName }
      ];

      if (screenWidth === IS_MOBILE)
        return (
          <Fragment>
            <div className="uk-text-bold uk-text-lead">{translator.translate('title_system_config')}</div>
            <ul className="uk-list uk-text-small uk-list-striped">
              {
                arrSpec.map((spec, index) => {
                  return (
                    <li key={index}>
                      <div className="uk-flex uk-flex-between uk-width-1-1">
                        <div className="uk-text-bold">{spec.t}</div>
                        <div>{spec.v}</div>
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
            <div className="uk-text-bold uk-text-lead">{translator.translate('title_system_config')}</div>
            <ul className="uk-list">
              {
                arrSpec.map((spec, index) => {
                  return (
                    <li key={index}>
                      <div className="uk-flex">
                        <div className="uk-text-bold uk-width-small">{spec.t}</div>
                        <div className="uk-width-small">{spec.v}</div>
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
    const { screenWidth, device, history, translator } = this.props;
    const { wishlist, cart, availableDeviceType } = device;

    return (
      <div>
        <div>
          {
            wishlist
              ?
              <CommonModalConfirm
                screenWidth={screenWidth}
                message={translator.translate('lbl_confirm_question', {
                  field: translator.translate('title_wishlist')
                })}
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
                      <div className="uk-margin-xsmall-left">
                        {translator.translate('btn_remove_common', {
                          field: translator.translate('title_wishlist')
                        })}
                      </div>
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
                  <div className="uk-margin-xsmall-left">
                    {translator.translate('btn_add_common', {
                      field: translator.translate('title_wishlist')
                    })}
                  </div>
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
                  <div className="uk-margin-xsmall-left">{translator.translate('btn_go_to_cart')}</div>
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
                            <div className="uk-margin-xsmall-left">{translator.translate('btn_add_to_cart')}</div>
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
                        <div className="uk-margin-xsmall-left">{translator.translate('btn_add_to_cart')}</div>
                      </div>
                    </CommonButton>
                }
              </Fragment>
          }
        </div>
      </div>
    )

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
                alertify.success('Please Select Sale Or Exchange');
              }
            }}
            type="inverted"
            className="wc-btn">
            <div className="uk-flex uk-flex-middle uk-flex-center">
              <i className="fa fa-shopping-bag" style={{ marginTop: '-4px' }} />
              <div className="uk-margin-xsmall-left">{translator.translate('btn_add_to_cart')}</div>
            </div>
          </CommonButton>
        </div>
      </Fragment>
    )
  }
  renderPC() {
    const { device, loadingAddToCart, loadingAddToCartTracing,
      loading, loadingWishlist, loadingDeleteCart, isOpen, onClose, clearSelectedDeviceAvailable } = this.props;

    return (
      <Popup modal
        lockScroll={true}
        open={isOpen}
        onOpen={() => this.handleOpen()}
        onClose={() => {
          clearSelectedDeviceAvailable();
          onClose();
        }}
        closeOnDocumentClick
        contentStyle={{ width: '80%', border: 'none', padding: 0 }}>
        {
          device
            ?
            <div>
              <a className="uk-badge uk-position-top-right uk-position-cart wc-close-modal"
                onClick={onClose}>
                <i className="fa fa-close" />
              </a>
              <div className="uk-container uk-margin-medium-top uk-margin-medium-bottom uk-position-relative wc-modal-body-scroll">
                {
                  (loading || loadingWishlist || loadingDeleteCart || loadingAddToCart || loadingAddToCartTracing) && <CommonLoading />
                }
                <div className="uk-grid">
                  <div className="uk-width-1-2 uk-position-relative">
                    <DeviceImages device={device} screenWidth={IS_MOBILE} />
                  </div>
                  <div className="uk-width-1-2">
                    {this.renderAvailable()}
                    {this.renderCommands()}
                    {this.renderSpecs()}
                  </div>
                </div>
              </div>
            </div>
            : <div className="uk-container uk-margin-medium-top uk-margin-medium-bottom uk-position-relative wc-modal-body-scroll">
              <div style={{ height: '70vh' }}>
                <CommonImageHolder />
              </div>
            </div>
        }
      </Popup>
    )
  }
  render() {
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
  screenWidth: selectScreenWidth,
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
  clearSelectedDeviceAvailable: () => dispatch(clearSelectedDeviceAvailable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceDetailPopup));
