import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingProposal, selectLoadingDetailCart, selectSelectedCart } from "../../redux/order/order.selectors";
import { selectLoadingMyDevices, selectMyDevices } from "../../redux/device/device.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { listMyDevicesStart } from "../../redux/device/device.action";
import {
  buyerRemoveProposalExchangeStart, clearSelectedCart, buyerReplyProposalExchangeStart,
  buyerAcceptProposalExchangeStart
} from "../../redux/order/order.actions";
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
import { NODE_ENV, IS_MOBILE, DISPLAY_PROPOSAL, SELLER_REPLIED, SELLER_ACCEPTED, SELLER_REJECTED, BUYER_REPLIED, BUYER_ACCEPTED } from "../../config";
import CommonModalConfirm from "../common/CommonModalConfirm.component";
import CommonButton from "../common/CommonButton.component";

import { addProposalFirebase, deleteProposalFirebase } from "../../firebase/firebase.utils";

class OrderViewProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMyDevice: null,
      selectedMyDeviceClone: null,
      isSelectMyDevices: false,
      selectedCheckPrice: '',
      priceExchange: '',
      reset: false
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingProposal !== this.props.loadingProposal) {
      if (this.props.loadingProposal === false) {
        const { onOk } = this.props;
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE REPLY PROPOSAL------------------');
        this.addNotificationOnFirebase();
        onOk();
      }
    }

    if (prevProps.loadingDetailCart !== this.props.loadingDetailCart) {
      if (this.props.loadingDetailCart === false) {
        this.cart = this.props.cart;
      }
    }

    if (this.props.cart) {
      if (this.state.reset) {
        if (NODE_ENV === 'development')
          console.log('-----------------------RESET ORDER VIEW PROPOSAL COMPONENT --------------------');
        const { proposalExchangeDevices, proposal_exchange_price } = this.props.cart;
        const proposalExchangeDevice = proposalExchangeDevices[0];
        let selectedCheckPrice = '';
        if (check.positive(parseFloat(proposal_exchange_price)))
          selectedCheckPrice = 'pay';
        else if (check.negative(parseFloat(proposal_exchange_price)))
          selectedCheckPrice = 'receive';
        else if (parseFloat(proposal_exchange_price) === 0)
          selectedCheckPrice = 'no';
        this.setState({
          selectedMyDevice: proposalExchangeDevice,
          selectedMyDeviceClone: proposalExchangeDevice,
          isSelectMyDevices: false,
          selectedCheckPrice,
          priceExchange: Math.abs(parseFloat(proposal_exchange_price)),
          reset: false
        });
      }
    }
  }
  componentWillUnmount() {
    this.garbageCollection();
  }
  addNotificationOnFirebase() {
    const { cart } = this.props;

    if (cart) {
      const { seller_id, proposal_id: id } = cart;
      addProposalFirebase({ receiver_id: seller_id, proposal_id: id, status: this.next_proposal_status });
    } else {
      if (this.cart) {
        deleteProposalFirebase({ receiver_id: this.cart.seller_id, proposal_id: this.cart.proposal_id });
      }
    }
  }
  garbageCollection() {
    this.next_proposal_status = '';
    this.cart = null;
  }
  handleOpen() {
    this.setState({ reset: true }, () => {
      const { listMyDevicesStart } = this.props;
      listMyDevicesStart(100, 1);
    });
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
          const proposal = {
            id: cart.proposal_id,
            proposalExchangePrice: 0,
            exchangeDevice: selectedMyDevice.deviceId
          }
          this.next_proposal_status = BUYER_REPLIED;
          this.props.buyerReplyProposalExchangeStart(proposal);
        } else {
          if (check.positive(parseFloat(priceExchange))) {
            const proposal = {
              id: cart.proposal_id,
              proposalExchangePrice: selectedCheckPrice === 'pay' ? parseFloat(priceExchange) : parseFloat(-priceExchange),
              exchangeDevice: selectedMyDevice.deviceId
            }
            this.next_proposal_status = BUYER_REPLIED;
            this.props.buyerReplyProposalExchangeStart(proposal);
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
    this.garbageCollection();
    onClose();
  }
  handleReset() {
    this.setState({ reset: true });
  }
  renderPriceExchange() {
    const { proposal_exchange_price, proposalExchangeDevices } = this.props.cart;

    if (proposalExchangeDevices) {
      if (proposalExchangeDevices.length > 0) {
        const { modelName } = proposalExchangeDevices[0];

        return (
          <div>
            {displayStringExchangeBuyer(proposal_exchange_price, modelName)}
            {
              proposal_exchange_price !== 0
              &&
              <div className="wc-price">
                <NumberFormat value={Math.abs(proposal_exchange_price)} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            }
          </div >
        )
      }
    }
  }
  renderDevice(cart) {
    const {
      status,
      images,
      modelDetailName
    } = cart;

    const { screenWidth } = this.props;

    return (
      <Fragment>
        <div className="uk-text-lead uk-text-bold">Device In Cart</div>
        <div className="uk-flex">
          <div className="wc-cart-wrapper uk-margin-top">
            <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
              <div className="wc-cart-item-img">
                {this.renderImage(images)}
              </div>
              <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
                <div className="uk-margin-tiny-bottom"><b>Available Type:</b> Exchange</div>
                <div className="uk-margin-tiny-bottom"><b>Status:</b> {DISPLAY_PROPOSAL[status]}</div>
                {this.renderPriceExchange()}
                <div className="uk-margin-tiny-bottom uk-margin-xsmall-top">
                  <a className="uk-text-active" onClick={() => this.handleReset()}>Reset Proposal</a>
                </div>
                <div className="uk-margin-tiny-bottom">
                  <CommonModalConfirm
                    screenWidth={screenWidth}
                    message="Do you really want to remove this proposal ?"
                    onOk={close => {
                      const proposal = {
                        id: cart.proposal_id
                      }
                      this.props.buyerRemoveProposalExchangeStart(proposal);
                      close();
                    }}
                    trigger={<a className="uk-text-active">Remove Proposal</a>}
                  />
                </div>
                {
                  status === SELLER_REPLIED
                  &&
                  <div className="uk-margin-tiny-bottom">
                    <CommonModalConfirm
                      screenWidth={screenWidth}
                      message="Do you really want to accept this proposal ?"
                      onOk={close => {
                        const proposal = {
                          id: cart.proposal_id
                        }
                        this.next_proposal_status = BUYER_ACCEPTED;
                        this.props.buyerAcceptProposalExchangeStart(proposal);
                        close();
                      }}
                      trigger={
                        <CommonButton className="wc-btn"
                          screenWidth={screenWidth}>
                          Accept Proposal
                        </CommonButton>
                      }
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  renderDeviceExchange() {
    const { selectedMyDevice, isSelectMyDevices, selectedCheckPrice, priceExchange } = this.state;
    const { status } = this.props.cart;

    return (
      <Fragment>
        <div className="uk-text-lead uk-text-bold">Your Device To Exchange</div>
        {
          selectedMyDevice
            ?
            (
              <div className="wc-cart-wrapper uk-margin-top">
                <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
                  <div className="wc-cart-item-img">
                    {this.renderImage(selectedMyDevice.images)}
                  </div>
                  <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                    <div className="uk-text-bold uk-margin-tiny-bottom">{selectedMyDevice.modelDetailName}</div>
                    <div className="uk-margin-tiny-bottom"><b>IMEI:</b> {selectedMyDevice.imeiImei}</div>
                    <div className="uk-margin-tiny-bottom"><b>Condition:</b> {selectedMyDevice.deviceCondition} %</div>
                    <div className="uk-margin-tiny-bottom"><b>RAM:</b> {selectedMyDevice.ramName}</div>
                    {
                      status !== SELLER_ACCEPTED
                      &&
                      status !== SELLER_REJECTED
                      &&
                      <div className="uk-margin-tiny-bottom">
                        <a className="uk-text-active" onClick={() => this.setState({ selectedMyDevice: null })}>Select Other Device</a>
                      </div>
                    }
                  </div>
                </div>
                {
                  status !== SELLER_ACCEPTED
                  &&
                  status !== SELLER_REJECTED
                  &&
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
                          value={priceExchange}
                          onValueChange={(values) => {
                            const { value } = values;
                            this.setState({ priceExchange: value });
                          }} />
                      </div>
                    }
                  </div>
                }
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
  renderCart(cart) {
    const { screenWidth } = this.props;
    const { status } = cart;

    return (
      <div className="uk-container uk-margin-top uk-margin-bottom">
        <div className="uk-grid uk-margin-bottom">
          <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
            {this.renderDevice(cart)}
          </div>
          <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
            {this.renderDeviceExchange()}
          </div>
        </div>
        <div className="uk-flex uk-flex-middle uk-flex-center">
          <div className="uk-flex uk-flex-middle uk-flex-center">
            <CommonButton className="wc-btn" type="inverted"
              screenWidth={screenWidth}
              onClick={() => this.handleClose()}>
              Cancel
            </CommonButton>
            {
              status !== SELLER_REJECTED
              &&
              status !== SELLER_ACCEPTED
              &&
              <CommonButton className="wc-btn uk-margin-tiny-left"
                screenWidth={screenWidth}
                onClick={() => this.handleAccept()}>
                Reply Proposal
              </CommonButton>
            }
          </div>
        </div>
      </div>
    )
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
  render() {
    const { isOpen, cart, loadingMyDevices, loadingProposal, loadingDetailCart, clearSelectedCart } = this.props;

    return (
      <Popup modal
        open={isOpen}
        onClose={() => {
          clearSelectedCart();
          this.garbageCollection();
          this.setState({
            selectedMyDevice: null,
            selectedMyDeviceClone: null,
            isSelectMyDevices: false,
            selectedCheckPrice: '',
            priceExchange: '',
            reset: false
          });
        }}
        onOpen={() => this.handleOpen()}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: '90%', border: 'none', padding: 0 }}>
        <div>
          <a className="uk-badge uk-position-top-right uk-position-cart wc-close-modal"
            onClick={() => this.handleClose()}>
            <i className="fa fa-close" />
          </a>
          <div className="uk-position-relative wc-modal-body-scroll">
            {(loadingMyDevices || loadingProposal || loadingDetailCart) && <CommonLoading />}
            {
              cart
                ?
                this.renderCart(cart)
                : <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                  There are no items
            </div>
            }
          </div>
        </div>
      </Popup>
    )
  }
}

OrderViewProposal.propTypes = {
  screenWidth: PropTypes.any.isRequired
}

const mapStateToProps = createStructuredSelector({
  loadingMyDevices: selectLoadingMyDevices,
  loadingProposal: selectLoadingProposal,
  loadingDetailCart: selectLoadingDetailCart,
  myDevices: selectMyDevices,
  screenWidth: selectScreenWidth,
  cart: selectSelectedCart
});

const mapDispatchToProps = dispatch => ({
  listMyDevicesStart: (limit, offset) => dispatch(listMyDevicesStart({ limit, offset })),
  addProposalExchangeStart: (device) => dispatch(addProposalExchangeStart({ device })),
  buyerRemoveProposalExchangeStart: (proposal) => dispatch(buyerRemoveProposalExchangeStart({ proposal })),
  buyerReplyProposalExchangeStart: (proposal) => dispatch(buyerReplyProposalExchangeStart({ proposal })),
  buyerAcceptProposalExchangeStart: (proposal) => dispatch(buyerAcceptProposalExchangeStart({ proposal })),
  clearSelectedCart: () => dispatch(clearSelectedCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderViewProposal);
