import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingProposalSale, selectSelectedReceiverProposal } from "../../redux/order/order.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import CommonLoading from "../common/CommonLoading.component";

import {
  addProposalSaleStart
} from "../../redux/order/order.actions";

import CommonImage from "../common/CommonImage.component";

import check from "check-types";
import NumberFormat from "react-number-format";

import { IS_MOBILE } from "../../config";
import CommonButton from "../common/CommonButton.component";

import { addProposalFirebase } from "../../firebase/firebase.utils";

class OrderCreateProposalSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceSale: ''
    }
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
  handleAccept() {
    const { cart } = this.props;
    const { priceSale } = this.state;
    if (check.positive(parseFloat(priceSale))) {
      const device = {
        cartId: cart.cartId,
        sellerId: cart.seller_id,
        salePrice: priceSale
      }
      this.props.addProposalSaleStart(device);
    }
    else
      alertify.error('Price Sale Must be number and positive');
  }
  handleClose() {
    const { onClose } = this.props;

    this.setState({
      priceSale: ''
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

    const { availableDeviceSalePrice,
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
                <div className="uk-margin-tiny-bottom">Available Type: Sale</div>
                <div className="uk-margin-tiny-bottom wc-price">
                  <NumberFormat value={Math.abs(availableDeviceSalePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderSale() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
          <div className="uk-text-lead uk-text-bold">Proposal Price</div>
          <div className="wc-form-group uk-margin-xsmall-top">
            <label>
              <span>Price Sale</span>
              <em>*</em>
            </label>
            <NumberFormat name="price_exchange" thousandSeparator={true} prefix={'$'}
              onValueChange={(values) => {
                const { value } = values;
                this.setState({ priceSale: value });
              }} />
          </div>

        </div>

      </Fragment>
    )
  }
  render() {
    const { onClose, isOpen, cart, loadingProposal, screenWidth } = this.props;

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
              {(loadingProposal) && <CommonLoading />}
              <div className="uk-container uk-margin-top uk-margin-bottom">
                <div className="uk-grid uk-margin-bottom">
                  {this.renderDevice(cart)}
                  {this.renderSale()}
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

OrderCreateProposalSale.propTypes = {
  screenWidth: PropTypes.any.isRequired
}

const mapStateToProps = createStructuredSelector({
  loadingProposal: selectLoadingProposalSale,
  screenWidth: selectScreenWidth,
  proposal: selectSelectedReceiverProposal
});

const mapDispatchToProps = dispatch => ({
  addProposalSaleStart: (device) => dispatch(addProposalSaleStart({ device })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateProposalSale);
