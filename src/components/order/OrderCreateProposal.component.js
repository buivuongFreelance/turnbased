import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingProposal, selectSelectedReceiverProposal } from "../../redux/order/order.selectors";
import { selectLoadingMyDevices, selectMyDevices } from "../../redux/device/device.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { listMyDevicesStart } from "../../redux/device/device.action";
import CommonLoading from "../common/CommonLoading.component";
import CommonModalSlider from "../common/CommonModalSlider.component";

import {
  addProposalExchangeStart
} from "../../redux/order/order.actions";

import CommonImage from "../common/CommonImage.component";

import DeviceItem from "../device/DeviceItem.component";
import check from "check-types";
import NumberFormat from "react-number-format";

import { displayStringExchangeBuyer } from "../../utils";
import { IS_MOBILE } from "../../config";
import CommonButton from "../common/CommonButton.component";

import { addProposalFirebase } from "../../firebase/firebase.utils";

class OrderCreateProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMyDevice: null,
      isSelectMyDevices: false,
      selectedCheckPrice: '',
      priceExchange: ''
    }
  }
  componentDidMount() {
    const { listMyDevicesStart } = this.props;
    listMyDevicesStart(100, 1);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingProposal !== this.props.loadingProposal) {
      if (this.props.loadingProposal === false) {
        const { onOk } = this.props;
        onOk();
        this.addNotificationOnFirebase();
      }
    }
  }
  addNotificationOnFirebase() {
    const { cart, proposal } = this.props;

    if (cart && proposal) {
      const { seller_id } = cart;
      const { id, status } = proposal;
      addProposalFirebase({ receiver_id: seller_id, proposal_id: id, status });
    }
  }
  handleSelectMyDevice(device) {
    this.setState({
      selectedMyDevice: device
    });
  }
  handleChangeChecked(ev) {
    const { target: { value } } = ev;
    this.setState({ selectedCheckPrice: value });
  }
  handleAccept() {
    const { selectedMyDevice, selectedCheckPrice, priceExchange } = this.state;
    if (selectedMyDevice) {
      if (selectedCheckPrice) {
        const { cart } = this.props;
        if (selectedCheckPrice === 'no') {
          const device = {
            cartId: cart.cartId,
            sellerId: cart.seller_id,
            exchangePrice: 0,
            exchangeDevice: selectedMyDevice.deviceId
          }
          this.props.addProposalExchangeStart(device);
        } else {
          if (check.positive(parseFloat(priceExchange))) {
            const device = {
              cartId: cart.cartId,
              sellerId: cart.seller_id,
              exchangePrice: selectedCheckPrice === 'pay' ? parseFloat(priceExchange) : parseFloat(-priceExchange),
              exchangeDevice: selectedMyDevice.deviceId
            }
            this.props.addProposalExchangeStart(device);
          }
          else
            alertify.error('Price Exchange Must be number and positive');
        }
      }
      else
        alertify.error('You must select 1 of 3 options');
    } else
      alertify.error('You must select one exchange device');
  }
  handleClose() {
    const { onClose } = this.props;

    this.setState({
      selectedMyDevice: null,
      isSelectMyDevices: false,
      selectedCheckPrice: '',
      priceExchange: ''
    }, () => onClose());
  }
  renderImage(images) {
    if (images) {
      if (images.length > 0) {
        return (
          <CommonImage url={images[0].thumbnail_url}
            width="110px"
            className="uk-img" />
        )
      } else {
        return (
          <CommonImage url={''} width="110px"
            className="uk-img" />
        )
      }
    } else {
      return (
        <CommonImage url={''} width="110px"
          className="uk-img" />
      )
    }
  }
  renderDevice(cart) {
    const { screenWidth } = this.props;

    const { availableDeviceExchangePrice,
      exchangeModelName,
      images,
      modelDetailName
    } = cart;

    return (
      <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
        <div className="uk-text-lead uk-text-bold">Device In Cart</div>
        <div className="uk-flex">
          <div className="wc-cart-wrapper uk-margin-top">
            <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
              {this.renderImage(images)}
              <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
                <div className="uk-margin-tiny-bottom">Available Type: Exchange</div>
                <div className="uk-margin-tiny-bottom">
                  {displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)}
                </div>
                {
                  availableDeviceExchangePrice !== 0
                  &&
                  <div className="uk-margin-tiny-bottom wc-price">
                    <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderDeviceExchange() {
    const { selectedMyDevice, isSelectMyDevices, selectedCheckPrice } = this.state;
    const { screenWidth } = this.props;

    return (
      <Fragment>
        <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
          <div className="uk-text-lead uk-text-bold">Your Device To Exchange</div>
          {
            selectedMyDevice
              ?
              (
                <div className="wc-cart-wrapper uk-margin-top">
                  <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
                    {this.renderImage(selectedMyDevice.images)}
                    <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                      <div className="uk-text-bold uk-margin-tiny-bottom">{selectedMyDevice.modelDetailName}</div>
                      <div className="uk-margin-tiny-bottom">IMEI: {selectedMyDevice.imeiImei}</div>
                      <div className="uk-margin-tiny-bottom">Condition: {selectedMyDevice.deviceCondition} %</div>
                      <div className="uk-margin-tiny-bottom">RAM: {selectedMyDevice.ramName}</div>
                      <div className="uk-margin-tiny-bottom">
                        <a className="uk-text-active" onClick={() => this.setState({ selectedMyDevice: null })}>Select Other Device</a>
                      </div>
                    </div>
                  </div>
                  <div className="uk-margin uk-text-small">
                    <label className="uk-margin-bottom uk-flex uk-flex-middle">
                      <input className="uk-radio" value="pay" type="radio" name="exchange"
                        checked={selectedCheckPrice === 'pay'}
                        onChange={(ev) => this.handleChangeChecked(ev)}
                      />
                      <div className="uk-margin-xsmall-left">Pay money</div>
                    </label>
                    <label className="uk-margin-bottom uk-flex uk-flex-middle">
                      <input className="uk-radio" value="receive" type="radio" name="exchange"
                        checked={selectedCheckPrice === 'receive'}
                        onChange={(ev) => this.handleChangeChecked(ev)}
                      />
                      <div className="uk-margin-xsmall-left">Get money</div>
                    </label>
                    <label className="uk-margin-bottom uk-flex uk-flex-middle">
                      <input className="uk-radio" value="no" type="radio" name="exchange"
                        checked={selectedCheckPrice === 'no'}
                        onChange={(ev) => this.handleChangeChecked(ev)}
                      />
                      <div className="uk-margin-xsmall-left">No exchange price</div>
                    </label>
                    {
                      selectedCheckPrice !== 'no' && selectedCheckPrice !== ''
                      &&
                      <div className="wc-form-group">
                        <label>
                          <span>Price Exchange</span>
                          <em>*</em>
                        </label>
                        <NumberFormat name="price_exchange" thousandSeparator={true} prefix={'$'}
                          onValueChange={(values) => {
                            const { value } = values;
                            this.setState({ priceExchange: value });
                          }} />
                      </div>
                    }
                  </div>
                </div>
              )
              :
              <div>
                <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                  You do not select any device to exchange
                <br />
                  <a className="uk-text-active" onClick={() => this.setState({ isSelectMyDevices: true })}>Select One</a>
                </div>
                {
                  isSelectMyDevices
                    ?
                    this.renderMyDeviceList()
                    : null
                }
              </div>
          }
        </div>
      </Fragment>
    )
  }
  renderMyDeviceList() {
    const { myDevices, screenWidth } = this.props;

    return (
      <Fragment>
        <div className="uk-text-lead uk-text-bold">Select A Device To Exchange</div>
        {
          myDevices.length
            ?
            <CommonModalSlider
              devices={myDevices}
              screenWidth={screenWidth}>
              {
                myDevices.map((device) => {
                  return (
                    <DeviceItem {...device} available
                      onClick={() => {
                        this.handleSelectMyDevice(device)
                      }}
                      key={device.deviceId} />
                  )
                })
              }
            </CommonModalSlider>
            :
            (
              <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                There are no items
              </div>
            )
        }
      </Fragment>
    )
  }
  render() {
    const { onClose, isOpen, cart, loadingMyDevices, loadingProposal, screenWidth } = this.props;

    if (cart) {
      return (
        <Popup modal
          lockScroll={true}
          open={isOpen}
          onClose={onClose}
          closeOnDocumentClick={false}
          closeOnEscape={false}
          contentStyle={{ width: '90%', border: 'none', padding: 0 }}>
          <div>
            <a className="uk-badge uk-position-top-right uk-position-cart wc-close-modal"
              onClick={this.props.onClose}>
              <i className="fa fa-close" />
            </a>
            <div className="uk-position-relative wc-modal-body-scroll">
              {(loadingMyDevices || loadingProposal) && <CommonLoading />}
              <div className="uk-container uk-margin-top uk-margin-bottom">
                <div className="uk-grid uk-margin-bottom">
                  {this.renderDevice(cart)}
                  {this.renderDeviceExchange()}
                </div>
                <div className="uk-flex uk-flex-middle uk-flex-center">
                  <CommonButton className="wc-btn" type="inverted"
                    screenWidth={screenWidth}
                    onClick={() => this.handleClose()}>
                    {
                      screenWidth === IS_MOBILE
                        ?
                        <span>Cancel</span>
                        :
                        <span>Cancel Proposal</span>
                    }
                  </CommonButton>
                  <CommonButton className="wc-btn uk-margin-tiny-left"
                    screenWidth={screenWidth}
                    onClick={() => this.handleAccept()}>
                    {
                      screenWidth === IS_MOBILE
                        ?
                        <span>Make Offer</span>
                        :
                        <span>Make Offer</span>
                    }
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )
    } else return null;
  }
}

OrderCreateProposal.propTypes = {
  screenWidth: PropTypes.any.isRequired
}

const mapStateToProps = createStructuredSelector({
  loadingMyDevices: selectLoadingMyDevices,
  loadingProposal: selectLoadingProposal,
  myDevices: selectMyDevices,
  screenWidth: selectScreenWidth,
  proposal: selectSelectedReceiverProposal
});

const mapDispatchToProps = dispatch => ({
  listMyDevicesStart: (limit, offset) => dispatch(listMyDevicesStart({ limit, offset })),
  addProposalExchangeStart: (device) => dispatch(addProposalExchangeStart({ device })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateProposal);
