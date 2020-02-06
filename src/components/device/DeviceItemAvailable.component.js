import React, { Component } from "react";

import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { selectCurrentUser } from "../../redux/storage/storage.selectors";

import CommonBaseImage from "../common/CommonImage.component";
import CommonButton from "../common/CommonButton.component";
import NumberFormat from "react-number-format";

import { displayStringExchangeSellerShort, calculateCommissionExchange, calculateCommissionSale } from "../../utils";

import Truncate from "react-truncate";

class DeviceItemAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeImage: false
    }
  }
  renderPriceExchange() {
    const { availableDeviceExchangePrice, exchangeModelName, commissionPercent, translator } = this.props;

    const html = (
      <div>
        {displayStringExchangeSellerShort(availableDeviceExchangePrice, 0, translator)}
        <b>
          <NumberFormat value={calculateCommissionExchange(availableDeviceExchangePrice, commissionPercent)} displayType="text" thousandSeparator={true} prefix={'$'}
            decimalScale={2} />
        </b>
        {displayStringExchangeSellerShort(availableDeviceExchangePrice, 1, translator)}
        <b>{exchangeModelName}</b>
      </div>
    )

    return (
      <div>
        {html}
      </div>
    );
  }
  renderBlock() {

    const { availableDeviceType,
      availableDeviceSalePrice, translator, commissionPercent } = this.props;

    let CommonDynamicBlock = null;


    switch (availableDeviceType) {
      case 'sell':
        CommonDynamicBlock = (
          <div>
            <div className="wc-price">
              <NumberFormat value={calculateCommissionSale(availableDeviceSalePrice, commissionPercent)}
                displayType="text" thousandSeparator={true} prefix={'$'}
                decimalScale={2} />
            </div>
          </div>
        )
        break;
      case 'exchange':
        CommonDynamicBlock = (
          <div>
            <div className="uk-flex uk-flex-between">
              {this.renderPriceExchange()}
            </div>
          </div>
        )
        break;
      case 'sell_exchange':
        CommonDynamicBlock = (
          <div>
            <div>
              <span className="wc-price">
                <NumberFormat value={calculateCommissionSale(availableDeviceSalePrice, commissionPercent)} displayType="text" thousandSeparator={true}
                  decimalScale={2}
                  prefix={'$'} />
              </span>
            </div>
            <div className="uk-text-muted uk-text-small uk-text-uppercase uk-text-italic">
              {translator.translate('title_or')}
            </div>
            <div>
              <div className="uk-flex uk-flex-between">
                {this.renderPriceExchange()}
              </div>
            </div>
          </div>
        )
        break;
    }
    return CommonDynamicBlock;
  }
  renderImageFunc(imageMain, imageHover) {
    const { screenWidth, translator } = this.props;

    let classWrap = ['uk-position-relative'];
    let classImage = ['uk-flex-middle uk-flex uk-flex-center'];
    if (screenWidth === IS_MOBILE) {
      classImage.push('wc-image-list-phone');
      classWrap.push('wc-image-list-phone');
    } else if (screenWidth === IS_TABLET) {
      classImage.push('wc-image-list-tablet');
      classWrap.push('wc-image-list-tablet');
    } else {
      classImage.push('wc-image-list-pc');
      classWrap.push('wc-image-list-pc');
    }

    return (
      <div className={classWrap.join(' ')}>
        <div className="uk-transition-toggle" tabIndex={0}>
          <div className={classImage.join(' ')}>
            <CommonBaseImage url={imageMain} />
          </div>
          {
            screenWidth === IS_PC
            &&
            <div className="uk-transition-fade uk-position-cover">
              <div className={classImage.join(' ')}>
                <div className="uk-overlay-default uk-position-cover" />
                <div className="uk-position-center" style={{ zIndex: 5 }}>
                  <CommonButton screenWidth={screenWidth} className="wc-btn uk-position-z-index"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      if (this.props.onQuickView)
                        this.props.onQuickView({ ...this.props });
                    }}
                  >
                    {translator.translate('title_quickview')}
                  </CommonButton>
                </div>
                <CommonBaseImage url={imageHover} />
              </div>
            </div>
          }
        </div>
      </div >
    )
  }
  renderImage() {
    const { images } = this.props;

    let imageMain = '';
    let imageHover = '';

    if (images) {
      if (images.length > 0) {
        imageMain = images[0].thumbnail_url;
        if (images.length === 1)
          imageHover = images[0].thumbnail_url;
        else if (images.length > 1)
          imageHover = images[1].thumbnail_url;
      }
    }
    return this.renderImageFunc(imageMain, imageHover);

  }
  renderMobile() {
    const { modelDetailName } = this.props;

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
      <div>
        {device}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  user: selectCurrentUser,
  translator: selectTranslator
});

export default connect(mapStateToProps)(DeviceItemAvailable);
