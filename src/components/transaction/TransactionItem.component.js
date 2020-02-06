import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import CommonImage from "../common/CommonImage.component";
import { TRANSACTION_STATUS, IS_MOBILE } from "../../config";
import NumberFormat from "react-number-format";

class TransactionItem extends Component {
  renderMoney() {
    const { money } = this.props;
    if (money > 0)
      return <span className="uk-text-bold"><NumberFormat value={Math.abs(money)} displayType="text" thousandSeparator={true} prefix={'$'} /></span>
    else if (money == 0)
      return <span className="uk-text-bold">No pay</span>
    else {
      return (
        <div>
          <span>You get: </span>
          <span className="uk-text-bold">
            <NumberFormat value={Math.abs(money)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </span>
        </div>
      )
    }
  }
  renderTitle() {
    const { proposalExchange, proposalSale } = this.props;
    if (proposalExchange) {
      const { device, proposalExchangesDevices } = proposalExchange;
      if (device) {
        const deviceSellerName = device.modelName;
        if (proposalExchangesDevices) {
          const proposalExchangeDevice = proposalExchangesDevices[0];
          const deviceBuyerName = proposalExchangeDevice.modelName;
          return (
            <div>
              <p className="uk-margin-remove uk-text-bold">{deviceSellerName}</p>
              <span className="uk-text-meta uk-text-muted"><b>Exchange with </b>{deviceBuyerName}</span>
            </div>
          )
        }
      }
    }
    if (proposalSale) {
      const { device } = proposalSale;
      if (device) {
        return (
          <span className="uk-text-bold">{device.modelName}</span>
        )
      }
    }
  }
  renderImage() {
    const { proposalExchange, proposalSale } = this.props;
    if (proposalExchange) {
      const { device } = proposalExchange;
      if (device) {
        const { images } = device;
        let image = '';
        if (images) {
          if (images.length > 0)
            image = images[0].thumbnail_url;
        }
        return (
          <CommonImage url={image} width="70" />
        )
      }
    }
    if (proposalSale) {
      const { device } = proposalSale;
      if (device) {
        const { images } = device;
        let image = '';
        if (images) {
          if (images.length > 0)
            image = images[0].thumbnail_url;
        }
        return (
          <CommonImage url={image} width="70" />
        )
      }
    }
  }
  renderMobile() {
    const { status, transactionCode } = this.props;
    return (
      <div className="transactions_group-item uk-flex uk-flex-middle uk-padding-small uk-padding-remove-left uk-padding-remove-right">
        <div className="transactions_group-item-image uk-width-1-3">
          {this.renderImage()}
        </div>
        <div className="uk-margin-left uk-width-2-3">
          <div className="transactions_group-item-code uk-margin-xsmall-bottom">
            <span>Code: </span><span className="uk-text-bold">{transactionCode}</span>
          </div>
          <div className="transactions_group-item-title uk-margin-xsmall-bottom">
            {this.renderTitle()}
          </div>
          <div className="transactions_group-item-status uk-text-bold uk-margin-xsmall-bottom">
            <span>{TRANSACTION_STATUS[status]}</span>
          </div>
          <div className="transactions_group-item-price uk-text-bold uk-margin-xsmall-bottom">
            {this.renderMoney()}
          </div>
        </div>

      </div>
    )
  }
  renderDefault() {
    const { status, transactionCode } = this.props;
    return (
      <div className="transactions_group-item uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-padding-remove-left uk-padding-remove-right">
        <div className="transactions_group-item-image uk-width-small">
          {this.renderImage()}
        </div>
        <div className="transactions_group-item-code uk-width-small">
          <span>Code: </span><span className="uk-text-bold">{transactionCode}</span>
        </div>
        <div className="transactions_group-item-title uk-text-bold uk-width-1-3">
          {this.renderTitle()}
        </div>
        <div className="transactions_group-item-status uk-text-bold uk-width-small">
          <span>{TRANSACTION_STATUS[status]}</span>
        </div>
        <div className="transactions_group-item-price uk-width-small uk-text-right">
          {this.renderMoney()}
        </div>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;
    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    return this.renderDefault();
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth
});
export default connect(mapStateToProps)(TransactionItem);
