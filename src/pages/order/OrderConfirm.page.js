import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { getOrderActiveStart, setOrderStep, confirmOrderStart } from "../../redux/order/order.actions";
import CommonBaseOrder from "../../components/common/CommonBaseOrder.component";

import { withRouter } from "react-router";
import { selectSelectedShipping, selectLoadingSelectedOrder, selectSelectedOrder, selectSelectedBilling, selectLoadingConfirmOrder } from "../../redux/order/order.selectors";
import CommonLoading from "../../components/common/CommonLoading.component";
import { historyRedirect } from "../../utils";
import CommonButton from "../../components/common/CommonButton.component";
import CommonImage from "../../components/common/CommonImage.component";
import NumberFormat from "react-number-format";
import { IS_MOBILE, NODE_ENV } from "../../config";

class OrderConfirmPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { selectedBilling, selectedShipping, history } = this.props;
    if (!selectedBilling || !selectedShipping)
      historyRedirect({ history, uri: 'order/shipping' });
    this.props.setOrderStep(3);
    this.props.getOrderActiveStart();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingConfirm !== this.props.loadingConfirm) {
      if (this.props.loadingConfirm === false) {
        const { history } = this.props;
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE PROPOSAL START------------------');
        historyRedirect({ history, uri: 'order/payment' });
      }
    }
  }
  handleConfirm() {
    const { selectedBilling, selectedShipping, orderActive, confirmOrderStart } = this.props;
    confirmOrderStart(orderActive.id, selectedShipping.id, selectedBilling.id);
  }
  renderImage({ images }, width) {
    let image = '';

    if (images) {
      if (images.length > 0)
        image = images[0].thumbnail_url;
    }

    return (
      <div className="wc-cart-item-img">
        <CommonImage url={image}
          width={width}
          style={{ maxWidth: 'inherit' }}
          className="uk-img" />
      </div>
    )
  }
  renderDetail() {
    const { orderActive, screenWidth } = this.props;
    if (orderActive) {
      const { transactions } = orderActive;
      return (
        <div className="uk-grid uk-grid-small">
          {
            transactions.map(transaction => {
              const { device: {
                images, modelDetailName
              }, money } = transaction;

              let html = null;

              html = (
                <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                  <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
                  {
                    money !== 0
                    &&
                    <div className="wc-price uk-margin-tiny-bottom">
                      <NumberFormat value={Math.abs(money)} displayType="text" thousandSeparator={true} prefix={'$'} />
                    </div>
                  }
                </div>
              )

              let classItem = [];
              if (screenWidth !== IS_MOBILE)
                classItem.push('uk-width-1-2');
              else
                classItem.push('uk-width-1-1');

              return (
                <div className={classItem.join(' ')} key={transaction.id}>
                  <div className="wc-cart-item uk-flex uk-margin-medium-bottom uk-cursor">
                    {this.renderImage({ images }, '70px')}
                    {html}
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }
  renderShipping() {
    const { selectedShipping } = this.props;
    if (selectedShipping) {
      const {
        receiverName, streetAddress, extendedAddress, zipCode, cityName, phoneNumber
      } = selectedShipping;
      return (
        <ul className="uk-list uk-list-striped">
          <li>
            <b>Name: </b> {receiverName}
          </li>
          <li>
            <b>Address: </b> {streetAddress}
          </li>
          <li>
            <b>Apartment: </b> {extendedAddress}
          </li>
          <li>
            <b>zipCode: </b> {zipCode}
          </li>
          <li>
            <b>City: </b> {cityName}
          </li>
          <li>
            <b>Phone Number: </b> {phoneNumber}
          </li>
        </ul>
      )
    }
  }
  renderBilling() {
    const { selectedBilling } = this.props;
    if (selectedBilling) {
      const {
        receiverName, streetAddress, extendedAddress, zipCode, cityName, phoneNumber
      } = selectedBilling;
      return (
        <ul className="uk-list uk-list-striped">
          <li>
            <b>Name: </b> {receiverName}
          </li>
          <li>
            <b>Address: </b> {streetAddress}
          </li>
          <li>
            <b>Apartment: </b> {extendedAddress}
          </li>
          <li>
            <b>zipCode: </b> {zipCode}
          </li>
          <li>
            <b>City: </b> {cityName}
          </li>
          <li>
            <b>Phone Number: </b> {phoneNumber}
          </li>
        </ul>
      )
    }
  }
  renderPC() {
    const { screenWidth, loadingOrderActive, loadingConfirm } = this.props;
    let classShipBill = [];

    if (screenWidth !== IS_MOBILE)
      classShipBill.push('uk-width-1-2');
    else
      classShipBill.push('uk-width-1-1 uk-margin-bottom');

    return (
      <div className="uk-container uk-margin-top">
        <CommonBaseOrder active="confirm"
          screenWidth={screenWidth}>
          <div className="uk-grid uk-position-relative">
            {loadingConfirm && <CommonLoading />}
            <div className="uk-width-1-1 uk-margin-bottom">
              <div className="uk-position-relative">
                {(loadingOrderActive)
                  &&
                  <CommonLoading />}
                <div className="wc-wrapper-title">
                  <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Devices You Buy</div>
                </div>
                {
                  this.renderDetail()
                }
              </div>
            </div>
            <div className={classShipBill.join(' ')}>
              <div className="wc-wrapper-title">
                <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Shipping Address</div>
              </div>
              {
                this.renderShipping()
              }
            </div>
            <div className={classShipBill.join(' ')}>
              <div className="wc-wrapper-title">
                <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Billing Address</div>
              </div>
              {
                this.renderBilling()
              }
            </div>
            <div className="uk-width-1-1 uk-margin-top uk-margin-bottom">
              <hr />
              <CommonButton className="wc-btn" screenWidth={screenWidth}
                onClick={() => this.handleConfirm()}>
                Confirm
              </CommonButton>
            </div>
          </div>
        </CommonBaseOrder>
      </div>
    )
  }
  render() {
    return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  selectedShipping: selectSelectedShipping,
  selectedBilling: selectSelectedBilling,
  loadingOrderActive: selectLoadingSelectedOrder,
  orderActive: selectSelectedOrder,
  loadingConfirm: selectLoadingConfirmOrder
});

const mapDispatchToProps = dispatch => ({
  getOrderActiveStart: () => dispatch(getOrderActiveStart()),
  setOrderStep: (step) => dispatch(setOrderStep(step)),
  confirmOrderStart: (id, shippingId, billingId) => dispatch(confirmOrderStart({ id, shippingId, billingId }))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderConfirmPage)));
