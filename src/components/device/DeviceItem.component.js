import React, { Component } from "react";
import PropTypes from "prop-types";

import { IS_MOBILE, IS_PC, IS_TABLET, DEVICE_GRADE_TITLE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import CommonBaseImage from "../common/CommonImage.component";
import NumberFormat from "react-number-format";

import { displayStringExchangeBuyerShort } from "../../utils";

import Truncate from "react-truncate";

class DeviceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeImage: false
    }
  }
  renderPriceExchange() {
    const { availableDevice, translator } = this.props;
    if (availableDevice) {
      const { availableDeviceExchangePrice, exchangeModelName } = availableDevice;
      const html = (
        <div>
          {displayStringExchangeBuyerShort(availableDeviceExchangePrice, 0, translator)}
          <b>
            <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </b>
          {displayStringExchangeBuyerShort(availableDeviceExchangePrice, 1, translator)}
          <b>{exchangeModelName}</b>
        </div>
      )

      return (
        <div>
          {html}
        </div>
      );
    }
  }
  renderBlock() {
    const { availableDevice, translator } = this.props;

    if (availableDevice) {
      const { availableDeviceType,
        availableDeviceSalePrice } = availableDevice;

      let CommonDynamicBlock = null;

      switch (availableDeviceType) {
        case 'sell':
          CommonDynamicBlock = (
            <div>
              <div className="wc-price">
                <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
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
                  <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
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
    } else {
      return (
        <div>
          {translator.translate('title_no_available')}
        </div>
      )
    }

  }
  renderState() {
    const { availableDevice, translator } = this.props;

    if (availableDevice) {
      const { deviceGrade } = availableDevice;

      return (
        <div>
          <div className="uk-flex uk-flex-between">
            <div>{translator.translate(DEVICE_GRADE_TITLE[deviceGrade])}</div>
          </div>
        </div>
      )
    }
  }
  renderImage() {
    const { images, screenWidth } = this.props;

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
    const { modelDetailName, isAvailableDevice, translator } = this.props;

    return (
      <div className="uk-position-relative">
        {isAvailableDevice && <div className="uk-position-top-right uk-overlay-default uk-background-active wc-available">
          {translator.translate('title_available')}
        </div>}
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

DeviceItem.propTypes = {
  available: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

export default connect(mapStateToProps)(DeviceItem);
