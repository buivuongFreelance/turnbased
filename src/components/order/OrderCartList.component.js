import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { selectCarts, selectLoadingListCart, selectLoadingDeleteCart, selectLoadingSelectedOrder, selectSelectedOrder, selectLoadingRemoveOrder } from "../../redux/order/order.selectors";

import { listCartStart, deleteCartStart, getCartStart, getOrderActiveStart, removeOrderActiveStart } from "../../redux/order/order.actions";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth, selectResetProposal } from "../../redux/screen/screen.selectors";
import { IS_MOBILE, NODE_ENV, DISPLAY_PROPOSAL, IS_PC, IS_TABLET } from "../../config";

import { selectCurrentUser } from "../../redux/storage/storage.selectors";

import { withRouter } from "react-router";
import { historyRedirect, displayStringExchangeBuyer } from "../../utils";
import CommonPageHolder from "../common/CommonPageHolder.component";
import CommonLoading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";
import CommonImage from "../common/CommonImage.component";
import CommonModalConfirm from "../common/CommonModalConfirm.component";
import NumberFormat from "react-number-format";

import OrderCreateProposal from "./OrderCreateProposal.component";
import OrderViewProposal from "./OrderViewProposal.component";
import OrderCreateProposalSale from "./OrderCreateProposalSale.component";
import OrderViewProposalSale from "./OrderViewProposalSale.component";
import OrderCartCheckoutList from "./OrderCartCheckoutList.component";

class OrderCartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCreateProposal: false,
      isOpenViewProposal: false,
      isOpenCreateProposalSale: false,
      isOpenViewProposalSale: false,
      isOpenOrder: false,
      selectedCart: null
    }
  }
  componentDidMount() {
    const { resetProposal } = this.props;
    if (!resetProposal)
      this.resetListCart();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingDeleteCart !== this.props.loadingDeleteCart) {
      if (this.props.loadingDeleteCart === false) {
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE DELETE CART------------------');
        this.resetListCart();
      }
    }
    if (prevProps.loadingRemoveOrder !== this.props.loadingRemoveOrder) {
      if (this.props.loadingRemoveOrder === false) {
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE DELETE CART------------------');
        this.resetListCart();
      }
    }
    if (prevProps.resetProposal !== this.props.resetProposal) {
      if (prevProps.resetProposal) {
        this.resetListCart();
      }
    }
  }
  resetListCart() {
    const { listCartStart, user } = this.props;

    if (user)
      listCartStart(100, 0);
  }
  handleCheckout() {
    const { proposalExchangeIds, proposalSaleIds, cartIds } = this.state;
    const { checkoutCartStart } = this.props;
    checkoutCartStart(proposalSaleIds, proposalExchangeIds, cartIds);
  }
  renderConfirmModal(cart) {
    const { deleteCartStart, screenWidth } = this.props;

    return <CommonModalConfirm
      screenWidth={screenWidth}
      message="Do you really want to remove this cart ?"
      onOk={close => {
        deleteCartStart(cart.cartId);
        close();
      }}
      onOpen={(ev) => {
        if (ev)
          ev.stopPropagation();
      }}
      onClose={(ev) => {
        if (ev)
          ev.stopPropagation();
      }}
      trigger={<a className="uk-text-active">Remove Cart</a>}
    />
  }
  renderPriceExchangeProposal(proposal) {
    const { proposal_exchange_price, proposalExchangeDevices } = proposal;

    if (proposalExchangeDevices) {
      const { modelDetailName } = proposalExchangeDevices[0];

      return (
        <div>
          {displayStringExchangeBuyer(proposal_exchange_price, modelDetailName)}
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
  }
  renderAvailableExchangeBlock(proposal) {
    if (proposal) {
      return (
        <div className="uk-margin-xsmall-bottom">
          <div className="uk-margin-tiny-bottom"><b>Proposal Status:</b> {DISPLAY_PROPOSAL[proposal.status]}</div>
          {this.renderPriceExchangeProposal(proposal)}
        </div>
      )
    } else return null;
  }
  renderAvailableSaleBlock(proposal) {
    if (proposal) {
      const { sale_proposal_price } = proposal;

      return (
        <div className="uk-margin-xsmall-bottom">
          <div className="uk-margin-tiny-bottom"><b>Proposal Status:</b> {DISPLAY_PROPOSAL[proposal.status]}</div>
          <div className="uk-margin-tiny-bottom"><b>Proposal Price:</b> <NumberFormat value={Math.abs(sale_proposal_price)} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
        </div>
      )
    } else return null;
  }
  renderBtns() {
    const { history, screenWidth
    } = this.props;

    return (
      <div className="uk-margin-top uk-flex">
        <div>
          <CommonButton
            className="wc-btn"
            screenWidth={screenWidth}
            onClick={() => historyRedirect({ history, uri: '' })}>
            Continue To Shopping
          </CommonButton>
        </div>
      </div>
    )
  }
  renderProposalSale(cart) {
    const { proposalSale } = cart;
    const { getCartStart, screenWidth } = this.props;

    let html = null;

    if (proposalSale) {
      html = (
        <div className="uk-margin-xsmall-top">
          <CommonButton className="wc-btn wc-btn-small"
            screenWidth={screenWidth}
            onClick={(ev) => {
              ev.stopPropagation();
              getCartStart(cart.cartId);
              this.setState({
                isOpenViewProposalSale: true,
              }, () => {
              })
            }}>
            View Offer
          </CommonButton>
        </div>
      )
    } else {
      html = (
        <div className="uk-margin-xsmall-top">
          <CommonButton className="wc-btn wc-btn-small"
            screenWidth={screenWidth}
            onClick={(ev) => {
              ev.stopPropagation();
              this.setState({
                isOpenCreateProposalSale: true,
                selectedCart: cart
              })
            }}>
            Make Offer
          </CommonButton>
        </div>
      )
    }

    return html;
  }
  renderProposal(cart) {
    const { proposalExchange } = cart;
    const { getCartStart, screenWidth } = this.props;

    let html = null;

    if (proposalExchange) {
      html = (
        <div className="uk-margin-xsmall-top">
          <CommonButton className="wc-btn wc-btn-small"
            screenWidth={screenWidth}
            onClick={(ev) => {
              ev.stopPropagation();
              getCartStart(cart.cartId);
              this.setState({
                isOpenViewProposal: true,
              }, () => {
              })
            }}>
            View Offer
          </CommonButton>
        </div>
      )
    } else {
      html = (
        <div className="uk-margin-xsmall-top">
          <CommonButton className="wc-btn wc-btn-small"
            screenWidth={screenWidth}
            onClick={(ev) => {
              ev.stopPropagation();
              this.setState({
                isOpenCreateProposal: true,
                selectedCart: cart
              })
            }}>
            Make Offer
          </CommonButton>
        </div>
      )
    }

    return html;
  }
  renderImage({ images, availableDeviceId }, width) {
    const { screenWidth, history } = this.props;

    let image = '';

    if (images) {
      if (images.length > 0)
        image = images[0].thumbnail_url;
    }

    return (
      <div>
        <CommonImage url={image}
          onClick={() => {
            if (screenWidth === IS_PC)
              historyRedirect({ history, uri: 'device/' + availableDeviceId });
          }}
          width={width}
          style={{ maxWidth: '110px' }}
          className="uk-img" />
      </div>
    )
  }
  renderTitle({ modelDetailName, availableDeviceId }) {
    const { screenWidth, history } = this.props;
    if (screenWidth === IS_PC) {
      return (
        <a className="uk-text-bold uk-margin-tiny-bottom uk-text-active"
          onClick={() => {
            historyRedirect({ history, uri: 'device/' + availableDeviceId });
          }}>{modelDetailName}</a>
      )
    } else {
      return (
        <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
      )
    }
  }
  renderCart() {
    const { carts, history, screenWidth } = this.props;

    return (
      <Fragment>
        {
          carts.map(cart => {
            const { type, availableDeviceSalePrice,
              cartId, exchangeModelName,
              availableDeviceExchangePrice,
              availableDeviceId, proposalExchange, proposalSale } = cart;

            let html = null;

            switch (type) {
              case 'sale':
                html = (
                  <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                    {this.renderTitle(cart)}
                    <div className="uk-margin-tiny-bottom">Available Type: Sale</div>
                    <div className="wc-price uk-margin-tiny-bottom">
                      <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
                    </div>
                    {this.renderAvailableSaleBlock(proposalSale)}
                    {this.renderConfirmModal(cart)}
                    {this.renderProposalSale(cart)}
                  </div>
                )
                break;
              case 'exchange':
                html = (
                  <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                    {this.renderTitle(cart)}
                    <div className="uk-margin-tiny-bottom">Available Type: Exchange</div>
                    {
                      !proposalExchange
                      &&
                      <Fragment>
                        <div className="uk-margin-tiny-bottom">
                          {displayStringExchangeBuyer(availableDeviceExchangePrice, exchangeModelName)}
                        </div>
                        {
                          availableDeviceExchangePrice !== 0
                          &&
                          <div className="uk-margin-tiny-bottom">
                            <div className="wc-price">
                              <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
                            </div>
                          </div>
                        }
                      </Fragment>
                    }
                    {this.renderAvailableExchangeBlock(proposalExchange)}
                    {this.renderConfirmModal(cart)}
                    {this.renderProposal(cart)}
                  </div>
                )
                break;
            }

            let classCartWrap = ['wc-cart-item uk-flex uk-margin-medium-bottom'];
            if (screenWidth !== IS_PC)
              classCartWrap.push('uk-cursor');

            return (
              <div key={cartId} className={classCartWrap.join(' ')}
                onClick={() => {
                  if (screenWidth !== IS_PC)
                    historyRedirect({ history, uri: 'device/' + availableDeviceId })
                }}>
                {this.renderImage(cart, '100%')}
                {html}
              </div>
            )
          })
        }
      </Fragment>
    )
  }
  renderModal() {
    const { isOpenCreateProposal, isOpenViewProposal, selectedCart, isOpenCreateProposalSale, isOpenViewProposalSale } = this.state;

    return (
      <Fragment>
        <OrderViewProposalSale isOpen={isOpenViewProposalSale}
          onClose={() => this.setState({
            isOpenViewProposalSale: false
          })}
          onOk={() => {
            this.setState({
              isOpenViewProposalSale: false
            }, () => {
              this.resetListCart();
            });
          }} />
        <OrderCreateProposalSale isOpen={isOpenCreateProposalSale}
          cart={selectedCart}
          onClose={() => this.setState({
            isOpenCreateProposalSale: false,
            selectedCart: null
          })}
          onOk={() => {
            this.setState({
              isOpenCreateProposalSale: false
            }, () => {
              this.resetListCart();
            });
          }} />

        <OrderCreateProposal isOpen={isOpenCreateProposal}
          cart={selectedCart}
          onClose={() => this.setState({
            isOpenCreateProposal: false,
            selectedCart: null
          })}
          onOk={() => {
            this.setState({
              isOpenCreateProposal: false
            }, () => {
              this.resetListCart();
            });
          }} />

        <OrderViewProposal isOpen={isOpenViewProposal}
          onClose={() => this.setState({
            isOpenViewProposal: false
          })}
          onOk={() => {
            this.setState({
              isOpenViewProposal: false
            }, () => {
              this.resetListCart();
            });
          }} />
      </Fragment>
    )
  }
  renderMobile() {
    const { carts, loadingListCart, loadingDeleteCart, loadingSelectedOrder, loadingRemoveOrder } = this.props;

    if (carts) {
      if (carts.length > 0)
        return (
          <div>
            {this.renderModal()}
            <div className="wc-cart-wrapper uk-position-relative">
              {(loadingListCart || loadingDeleteCart || loadingSelectedOrder || loadingRemoveOrder) && <CommonLoading />}
              {this.renderCart()}
            </div>
            <hr />
            {this.renderBtns()}
          </div>
        )
      else
        return (
          <div className="uk-position-relative">
            {loadingListCart && <CommonLoading />}
            <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no items
            </div>
            {this.renderBtns()}
          </div>
        )
    } else return <CommonPageHolder />
  }
  renderPC() {
    const { carts, loadingListCart, loadingDeleteCart, loadingSelectedOrder, loadingRemoveOrder } = this.props;

    if (carts) {
      if (carts.length > 0)
        return (
          <div>
            {this.renderModal()}
            <div className="wc-cart-wrapper uk-position-relative">
              {(loadingListCart || loadingDeleteCart || loadingSelectedOrder || loadingRemoveOrder) && <CommonLoading />}
              <div className="uk-grid">
                <div className="uk-width-2-3">
                  <div className="wc-wrapper-title">
                    <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Your Devices In Cart</div>
                  </div>
                  {this.renderCart()}
                </div>
                <div className="uk-width-1-3">
                  <div className="wc-wrapper-title">
                    <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Devices Ready To Checkout</div>
                  </div>
                  <OrderCartCheckoutList />
                </div>
              </div>
            </div>
            <hr />
            {this.renderBtns()}
          </div>
        )
      else
        return (
          <div className="uk-position-relative">
            {loadingListCart && <CommonLoading />}
            <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no items
            </div>
            {this.renderBtns()}
          </div>
        )
    } else return <CommonPageHolder />
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else if (screenWidth === IS_TABLET)
      return this.renderPC();
    else return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  loadingListCart: selectLoadingListCart,
  loadingDeleteCart: selectLoadingDeleteCart,
  loadingSelectedOrder: selectLoadingSelectedOrder,
  loadingRemoveOrder: selectLoadingRemoveOrder,
  selectedOrder: selectSelectedOrder,
  carts: selectCarts,
  screenWidth: selectScreenWidth,
  user: selectCurrentUser,
  resetProposal: selectResetProposal
});

const mapDispatchToProps = dispatch => ({
  listCartStart: (limit, offset) => dispatch(listCartStart({ limit, offset })),
  deleteCartStart: (id) => dispatch(deleteCartStart({ id })),
  getCartStart: (id) => dispatch(getCartStart({ id })),
  getOrderActiveStart: () => dispatch(getOrderActiveStart()),
  removeOrderActiveStart: (id) => dispatch(removeOrderActiveStart({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderCartList));
