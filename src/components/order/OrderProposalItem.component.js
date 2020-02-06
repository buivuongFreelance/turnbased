import React, { Component } from "react";

import { IS_MOBILE, IS_PC, IS_TABLET, DISPLAY_PROPOSAL } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import CommonBaseImage from "../common/CommonImage.component";
import NumberFormat from "react-number-format";

import { displayStringExchangeSeller } from "../../utils";

import Truncate from "react-truncate";

class OrderProposalItem extends Component {
  constructor(props) {
    super(props);
  }
  renderPriceExchange() {
    const { proposalExchangeDevices, proposal_exchange_price } = this.props;
    const { modelDetailName } = proposalExchangeDevices[0];
    return (
      <div>
        <Truncate lines={2} ellipsis={<span>...</span>}>
          {displayStringExchangeSeller(proposal_exchange_price, modelDetailName)}
        </Truncate>
        {
          proposal_exchange_price !== 0
          &&
          <div className="wc-price">
            <NumberFormat value={Math.abs(proposal_exchange_price)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </div>
        }
      </div>
    )
  }
  renderBlock() {
    const { cart: { type, availableDevice: {
      availableDeviceSalePrice } }, status, sale_proposal_price } = this.props;

    let CommonDynamicBlock = null;

    switch (type) {
      case 'sale':
        CommonDynamicBlock = (
          <div>
            <div>
              Status: <b>{DISPLAY_PROPOSAL[status]}</b>
            </div>
            <div>
              Proposal Price: <NumberFormat value={sale_proposal_price} displayType="text" thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="wc-price">
              <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
            </div>
          </div>
        )
        break;
      case 'exchange':
        CommonDynamicBlock = (
          <div className="uk-text-small">
            <div>
              Status: <b>{DISPLAY_PROPOSAL[status]}</b>
            </div>
            <div>
              {this.renderPriceExchange()}
            </div>
          </div>
        )
        break;
    }
    return CommonDynamicBlock;

  }
  renderImage() {
    const { cart: { availableDevice: { images } }, screenWidth } = this.props;

    let image = '';
    let classImage = ['uk-flex-middle uk-flex uk-flex-center'];
    if (screenWidth === IS_MOBILE)
      classImage.push('wc-image-list-phone');
    else if (screenWidth === IS_TABLET)
      classImage.push('wc-image-list-tablet');
    else classImage.push('wc-image-list-pc');

    if (images) {
      if (images.length > 0)
        image = images[0].thumbnail_url;
    }

    return (
      <div className={classImage.join(' ')}
        onMouseEnter={() => {
          if (screenWidth === IS_PC)
            this.setState({ changeImage: true })
        }}>
        <CommonBaseImage url={image} />
      </div>
    )
  }
  renderMobile() {
    const { cart: { availableDevice: { modelDetailName } } } = this.props;

    return (
      <div className="uk-position-relative">
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <div className="uk-card uk-card-small uk-card-body"
            onClick={this.props.onClick}
            onClickCapture={this.props.onClickCapture}
            onMouseUpCapture={this.props.onMouseUpCapture}
            onMouseDownCapture={this.props.onMouseDownCapture}>
            <div>
              <div>
                {this.renderImage()}
              </div>
            </div>
            <div className="uk-margin-small-top uk-text-small wc-title">
              <Truncate lines={2} ellipsis={<span>...</span>}>
                {modelDetailName}
              </Truncate>
            </div>
            <div className="uk-list uk-margin-xsmall-top uk-text-small">
              {this.renderBlock()}
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;
    let device = null;

    switch (screenWidth) {
      case IS_MOBILE:
        device = this.renderMobile();
        break;
      default:
        device = this.renderMobile();
        break;
    }

    return (
      <React.Fragment>
        {device}
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
});

export default connect(mapStateToProps)(OrderProposalItem);
