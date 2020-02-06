import React, { Component } from "react";

import { connect } from "react-redux";
import { selectLoadingListCart, selectCarts, selectLoadingCheckoutCart } from "../../redux/order/order.selectors";

import { checkoutCartStart, listCartStart } from "../../redux/order/order.actions";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { IS_PC, SELLER_ACCEPTED } from "../../config";

import { withRouter } from "react-router";
import { historyRedirect, displayStringExchangeBuyer } from "../../utils";
import CommonLoading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";
import CommonImage from "../common/CommonImage.component";
import NumberFormat from "react-number-format";

class OrderCartCheckoutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAvailableCart: [],
      proposalSaleIds: [],
      proposalExchangeIds: [],
      cartIds: [],
      selectedCartIds: [],
      total: 0
    }
  }
  componentDidMount() {
    this.resetListAvailableCart();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingListCart !== this.props.loadingListCart) {
      if (this.props.loadingListCart === false) {
        this.resetListAvailableCart();
      }
    }
    if (prevProps.loadingCheckoutCart !== this.props.loadingCheckoutCart) {
      if (this.props.loadingCheckoutCart === false) {
        this.props.listCartStart(100, 0);
        if (this.props.onCheckout)
          this.props.onCheckout();
      }
    }
  }
  resetListAvailableCart() {
    const { carts } = this.props;
    let arr = [];
    let arrProposalSaleIds = [];
    let arrProposalExchangeIds = [];
    let arrCartIds = [];
    let selectedCartIds = [];
    let total = 0;

    for (let cart of carts) {
      const { type, proposalSale, proposalExchange, cartId,
        images, availableDeviceId, modelDetailName, availableDeviceSalePrice } = cart;
      switch (type) {
        case 'sale':
          if (proposalSale) {
            const { status, sale_proposal_price, id } = proposalSale;
            if (status === SELLER_ACCEPTED) {
              arr.push({
                images: images,
                id: availableDeviceId,
                name: modelDetailName,
                price: sale_proposal_price,
                proposal_id: id,
                type: 'sale'
              });
              arrProposalSaleIds.push(id);
              selectedCartIds.push(availableDeviceId);
              total += sale_proposal_price;
            } else {
              arr.push({
                images: images,
                id: availableDeviceId,
                name: modelDetailName,
                price: availableDeviceSalePrice,
                proposal_id: id,
                type: 'sale'
              });
              arrProposalSaleIds.push(id);
              selectedCartIds.push(availableDeviceId);
              total += availableDeviceSalePrice;
            }
          } else {
            arr.push({
              images: images,
              id: availableDeviceId,
              name: modelDetailName,
              price: availableDeviceSalePrice,
              type: 'sale',
              cart_id: cartId
            });
            arrCartIds.push(cartId);
            selectedCartIds.push(availableDeviceId);
            total += availableDeviceSalePrice;
          }
          break;
        case 'exchange':
          if (proposalExchange) {
            const { status, proposal_exchange_price, proposalExchangeDevices, id } = proposalExchange;
            if (status === SELLER_ACCEPTED) {
              if (proposalExchangeDevices) {
                const proposalExchangeDevice = proposalExchangeDevices[0];
                if (proposalExchangeDevice) {
                  const { modelName } = proposalExchangeDevice;
                  arr.push({
                    images: images,
                    id: availableDeviceId,
                    name: modelDetailName,
                    price: proposal_exchange_price,
                    type: 'exchange',
                    exchange_device: modelName,
                    proposal_id: id
                  });
                  total += proposal_exchange_price;
                  arrProposalExchangeIds.push(id);
                  selectedCartIds.push(availableDeviceId);
                }
              }
            }
          }
          break;
      }
    }
    this.setState({
      listAvailableCart: arr, total, proposalExchangeIds: arrProposalExchangeIds, proposalSaleIds: arrProposalSaleIds, cartIds: arrCartIds,
      selectedCartIds
    });
  }
  handleCheckout() {
    const { proposalExchangeIds, proposalSaleIds, cartIds } = this.state;
    const { checkoutCartStart, history } = this.props;
    checkoutCartStart(proposalSaleIds, proposalExchangeIds, cartIds, history);
  }
  handleCheckboxChanged(ev, item) {
    const checked = ev.target.checked;
    const { id, price, proposal_id, cart_id, type } = item;
    const { selectedCartIds, total, proposalSaleIds, proposalExchangeIds, cartIds } = this.state;
    let totalNew = total;

    if (!checked) {
      const index = selectedCartIds.indexOf(id);
      if (index !== -1) {
        totalNew = parseFloat(totalNew - price);
        selectedCartIds.splice(index, 1);
        if (type === 'sale') {
          if (proposal_id) {
            const proposalIndex = proposalSaleIds.indexOf(proposal_id);
            proposalSaleIds.splice(proposalIndex, 1);
          }
          if (cart_id) {
            const cartIndex = proposalSaleIds.indexOf(cart_id);
            cartIds.splice(cartIndex, 1);
          }
        } else if (type === 'exchange') {
          if (proposal_id) {
            const proposalIndex = proposalExchangeIds.indexOf(proposal_id);
            proposalExchangeIds.splice(proposalIndex, 1);
          }
        }
      }
    } else {
      totalNew = parseFloat(totalNew + price);
      selectedCartIds.push(id);
      if (type === 'sale') {
        if (proposal_id) {
          proposalSaleIds.push(proposal_id);
        }
        if (cart_id) {
          cartIds.push(cart_id);
        }
      } else if (type === 'exchange') {
        if (proposal_id) {
          proposalExchangeIds.push(proposal_id);
        }
      }

    }
    this.setState({ selectedCartIds, total: totalNew, proposalSaleIds, proposalExchangeIds, cartIds });
  }
  renderImage({ images, availableDeviceId }, width) {
    const { screenWidth, history } = this.props;
    let image = '';

    if (images) {
      if (images.length > 0)
        image = images[0].thumbnail_url;
    }

    return (
      <div className="wc-cart-item-img">
        <CommonImage url={image}
          onClick={() => {
            if (screenWidth === IS_PC)
              historyRedirect({ history, uri: 'device/' + availableDeviceId });
          }}
          style={{ maxWidth: width }}
          className="uk-img" />
      </div>
    )
  }

  renderCartAvailable() {
    const { total, listAvailableCart: carts, selectedCartIds } = this.state;
    const { screenWidth, loadingListCart, loadingCheckoutCart } = this.props;

    if (carts.length > 0)
      return (
        <div className="uk-position-relative">
          {(loadingListCart || loadingCheckoutCart) && <CommonLoading />}
          {
            carts.map((item) => {
              const { id, name, images, price, type, exchange_device } = item;

              let html = null;

              if (type === 'sale')
                html = (
                  <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                    <div className="uk-text-bold uk-margin-tiny-bottom">{name}</div>
                    <div className="wc-price uk-margin-tiny-bottom">
                      <NumberFormat value={Math.abs(price)} displayType="text" thousandSeparator={true} prefix={'$'} />
                    </div>
                  </div>
                )
              else
                html = (
                  <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                    <div className="uk-text-bold uk-margin-tiny-bottom">{name}</div>
                    <div className="uk-margin-tiny-bottom">{displayStringExchangeBuyer(price, exchange_device)}</div>
                    {
                      price !== 0
                      &&
                      <div className="wc-price uk-margin-tiny-bottom">
                        <NumberFormat value={Math.abs(price)} displayType="text" thousandSeparator={true} prefix={'$'} />
                      </div>
                    }
                  </div>
                )


              return (
                <div key={id} className="wc-cart-item uk-flex uk-margin-medium-bottom uk-cursor">
                  <div className="uk-flex uk-flex-middle">
                    <div>
                      <input className="uk-checkbox uk-margin-xsmall-right" value="" type="checkbox"
                        onChange={ev => this.handleCheckboxChanged(ev, item)}
                        checked={selectedCartIds.includes(id)} />
                    </div>
                    {this.renderImage({ images, availableDeviceId: id }, '70px')}
                    {html}
                  </div>
                </div>
              )
            })
          }
          <hr />
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <div className="uk-text-bold">
              {
                total >= 0
                  ? <span>Total:</span>
                  : <span>You get:</span>
              }
            </div>
            <div className="wc-price">
              <NumberFormat value={Math.abs(total)} displayType="text" thousandSeparator={true} prefix={'$'} />
            </div>
          </div>
          <div className="uk-margin-small-top">
            <CommonButton screenWidth={screenWidth} type="inverted" className="wc-btn uk-width-1-1"
              onClick={() => this.handleCheckout()}>
              Proceed To Checkout
            </CommonButton>
          </div>
        </div>
      )
    else
      return <div className="uk-position-relative">
        <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
          There are no items
      </div>
      </div>;
  }
  renderMobile() {
    return (
      this.renderCartAvailable()
    )
  }
  render() {
    return this.renderMobile();
  }
}

const mapStateToProps = createStructuredSelector({
  carts: selectCarts,
  loadingListCart: selectLoadingListCart,
  screenWidth: selectScreenWidth,
  loadingCheckoutCart: selectLoadingCheckoutCart
});

const mapDispatchToProps = dispatch => ({
  checkoutCartStart: (proposalSaleIds, proposalExchangeIds, cartIds, history) => dispatch(checkoutCartStart({ proposalSaleIds, proposalExchangeIds, cartIds, history })),
  listCartStart: (limit, offset) => dispatch(listCartStart({ limit, offset }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderCartCheckoutList));
