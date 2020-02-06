import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { selectCarts, selectLoadingListCart, selectLoadingDeleteCart } from "../../redux/order/order.selectors";

import { listCartStart, deleteCartStart } from "../../redux/order/order.actions";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { IS_MOBILE, NODE_ENV, DISPLAY_PROPOSAL } from "../../config";

import { withRouter } from "react-router";
import CommonPageHolder from "../common/CommonPageHolder.component";
import CommonLoading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";
import CommonImage from "../common/CommonImage.component";
import CommonModalConfirm from "../common/CommonModalConfirm.component";
import NumberFormat from "react-number-format";

import { historyRedirect, displayStringExchangeBuyer } from "../../utils";

import Truncate from "react-truncate";

class OrderPopupCart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        const { listCartStart } = this.props;
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE DELETE CART------------------');
        listCartStart(20, 0);
        if (this.props.onDelete)
          this.props.onDelete();
      }
    }
  }
  renderConfirmModal(cart) {
    const { deleteCartStart, screenWidth } = this.props;

    return <CommonModalConfirm
      screenWidth={screenWidth}
      message="Do you really want to remove this cart ?"
      onOpen={(ev) => {
        if (ev) ev.stopPropagation();
      }}
      onClose={(ev) => {
        if (ev) ev.stopPropagation();
      }}
      onOk={close => {
        deleteCartStart(cart.cartId);
        close();
      }}
      trigger={<a className="uk-text-active">Remove Cart</a>}
    />
  }
  renderImage(images) {
    let html = null;

    if (images) {
      if (images.length > 0) {
        html = (
          <CommonImage url={images[0].thumbnail_url}

            style={{ maxWidth: 'inherit' }}
            className="uk-img" />
        )
      } else {
        html = (
          <CommonImage url={''}
            style={{ maxWidth: 'inherit' }}
            className="uk-img" />
        )
      }
    } else {
      html = (
        <CommonImage url={''}
          style={{ maxWidth: 'inherit' }}
          className="uk-img" />
      )
    }
    return (
      <div className="wc-cart-item-img uk-width-img-popup">
        {html}
      </div>
    )
  }
  renderPC() {
    const { carts, history, loadingListCart, loadingDeleteCart, screenWidth,
    } = this.props;

    if (carts) {
      if (carts.length > 0) {
        return (
          <div className="uk-padding-small uk-text-black uk-cart-item-popup uk-text-normal">
            <div className="wc-cart-wrapper uk-position-relative">
              {(loadingListCart || loadingDeleteCart) && <CommonLoading />}
              {
                carts.map((cart, index) => {
                  let popupIndex = 2;
                  if (index < popupIndex) {
                    const { type, availableDeviceSalePrice,
                      cartId, images, exchangeModelName,
                      availableDeviceExchangePrice, proposalSale,
                      modelDetailName, proposalExchange } = cart;

                    let html = null;

                    switch (type) {
                      case 'sale':
                        html = (
                          <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                            <div className="uk-text-bold uk-margin-tiny-bottom">
                              <Truncate lines={1} ellipsis={<span>...</span>}>
                                {modelDetailName}
                              </Truncate>
                            </div>
                            <div className="uk-margin-tiny-bottom">Available Type: Sale</div>
                            {
                              proposalSale
                              &&
                              <div className="uk-margin-tiny-bottom">Proposal Price: <NumberFormat value={proposalSale.sale_proposal_price} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
                            }
                            <div className="uk-margin-tiny-bottom uk-text-bold">
                              <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
                            </div>
                            {this.renderConfirmModal(cart)}
                          </div>
                        )
                        break;
                      case 'exchange':
                        html = (
                          <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                            <div className="uk-text-bold uk-margin-tiny-bottom">
                              <Truncate lines={1} ellipsis={<span>...</span>}>
                                {modelDetailName}
                              </Truncate>
                            </div>
                            {
                              !proposalExchange
                              &&
                              <Fragment>
                                <div className="uk-margin-tiny-bottom">
                                  <Truncate lines={1} ellipsis={<span>...</span>}>
                                    {displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)}
                                  </Truncate>
                                </div>
                                {
                                  availableDeviceExchangePrice !== 0
                                  &&
                                  <div className="uk-margin-tiny-bottom uk-text-bold"><NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
                                }
                              </Fragment>
                            }
                            {
                              proposalExchange
                              &&
                              <div>
                                <div className="uk-margin-tiny-bottom">
                                  Proposal Status: <b>{DISPLAY_PROPOSAL[proposalExchange.status]}</b>
                                </div>
                                <div className="uk-margin-tiny-bottom">
                                  <Truncate lines={1} ellipsis={<span>...</span>}>
                                    {displayStringExchangeBuyer(proposalExchange.proposal_exchange_price, proposalExchange.proposalExchangeDevices[0].modelName)}
                                  </Truncate>
                                </div>
                                <div className="uk-margin-tiny-bottom uk-text-bold"><NumberFormat value={Math.abs(proposalExchange.proposal_exchange_price)} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
                              </div>
                            }
                            {this.renderConfirmModal(cart)}
                          </div>
                        )
                        break;
                    }
                    return (
                      <div key={cartId} className="wc-cart-item uk-flex uk-margin-medium-bottom"
                        onClick={() => {
                          history.push('/empty');
                          setTimeout(() => {
                            history.replace('/device/' + cart.availableDeviceId);
                          }, 500);
                        }}>
                        {this.renderImage(images)}
                        {html}
                      </div>
                    )
                  } else return null;
                })
              }
            </div>
            {
              carts.length > 2
              &&
              <div className="uk-flex uk-flex-center uk-flex-middle">
                <a className="uk-text-active"
                  onClick={() => historyRedirect({ history, uri: 'bags' })}>
                  View more {(carts.length - 2)} items
                </a>
              </div>
            }
            <hr />
            <div className="uk-margin-top">
              <CommonButton
                className="wc-btn uk-width-1-1 wc-transition-no"
                inverted
                screenWidth={screenWidth}
                onClick={() => historyRedirect({ history, uri: 'bags' })}>
                Go To Cart
              </CommonButton>
            </div>
          </div>
        )
      } else
        return (
          <div className="uk-position-relative uk-padding-small">
            {loadingListCart && <CommonLoading />}
            <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom uk-text-black uk-text-small">
              There are no items
            </div>
          </div>
        )
    } else return <CommonPageHolder />
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderPC();
    else return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  loadingListCart: selectLoadingListCart,
  loadingDeleteCart: selectLoadingDeleteCart,
  carts: selectCarts,
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  listCartStart: (limit, offset) => dispatch(listCartStart({ limit, offset })),
  deleteCartStart: (id) => dispatch(deleteCartStart({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderPopupCart));
