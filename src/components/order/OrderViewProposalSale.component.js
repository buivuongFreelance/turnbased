import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingProposalSale, selectSelectedCart, selectLoadingDetailCart } from "../../redux/order/order.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import CommonLoading from "../common/CommonLoading.component";

import {
  addProposalSaleStart, clearSelectedCart, buyerRemoveProposalSaleStart,
  buyerReplyProposalSaleStart,
  buyerAcceptProposalSaleStart
} from "../../redux/order/order.actions";

import CommonImage from "../common/CommonImage.component";

import check from "check-types";
import NumberFormat from "react-number-format";

import { NODE_ENV, IS_MOBILE, DISPLAY_PROPOSAL, SELLER_REPLIED, BUYER_REPLIED, BUYER_REMOVED, BUYER_ACCEPTED, SELLER_REJECTED, SELLER_ACCEPTED } from "../../config";
import CommonButton from "../common/CommonButton.component";

import CommonModalConfirm from "../common/CommonModalConfirm.component";

import { addProposalFirebase, deleteProposalFirebase } from "../../firebase/firebase.utils";

class OrderViewProposalSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceSale: '',
      reset: false
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingProposal !== this.props.loadingProposal) {
      if (this.props.loadingProposal === false) {
        const { onOk } = this.props;
        this.addNotificationOnFirebase();
        onOk();
      }
    }

    if (prevProps.loadingDetailCart !== this.props.loadingDetailCart) {
      if (this.props.loadingDetailCart === false) {
        this.cart = this.props.cart;
        const { sale_proposal_price } = this.props.cart;
        this.setState({
          priceSale: Math.abs(parseFloat(sale_proposal_price))
        });
      }
    }

    if (this.props.cart) {
      if (this.state.reset) {
        if (NODE_ENV === 'development')
          console.log('-----------------------RESET ORDER VIEW PROPOSAL COMPONENT --------------------');
        const { sale_proposal_price } = this.props.cart;
        this.setState({
          priceSale: Math.abs(parseFloat(sale_proposal_price)),
          reset: false
        });
      }
    }
  }
  garbageCollection() {
    this.next_proposal_status = '';
    this.cart = null;
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
  handleReset() {
    this.setState({ reset: true });
  }
  handleAccept() {
    const { cart } = this.props;
    const { priceSale } = this.state;
    if (check.positive(parseFloat(priceSale))) {
      const proposal = {
        id: cart.proposal_id,
        proposalSalePrice: parseFloat(priceSale)
      }
      this.next_proposal_status = BUYER_REPLIED;
      this.props.buyerReplyProposalSaleStart(proposal);
    }
    else
      alertify.error('Price Sale Must be number and positive');
  }
  handleClose() {
    const { onClose } = this.props;

    this.garbageCollection();

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
    if (cart) {
      const { screenWidth } = this.props;

      const { availableDeviceSalePrice,
        images,
        modelDetailName,
        status,
        sale_proposal_price
      } = cart;

      return (
        <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
          <div className="uk-text-lead uk-text-bold">Device In Cart</div>
          <div className="uk-flex">
            <div className="wc-cart-wrapper uk-margin-top">
              <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
                <div>
                  {this.renderImage(images)}
                </div>
                <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                  <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
                  <div className="uk-margin-tiny-bottom">Available Type: Sale</div>
                  <div className="uk-margin-tiny-bottom"><b>Status:</b> {DISPLAY_PROPOSAL[status]}</div>
                  <div className="uk-margin-tiny-bottom"><b>Proposal Price:</b> <NumberFormat value={Math.abs(sale_proposal_price)} displayType="text" thousandSeparator={true} prefix={'$'} /></div>
                  <div className="uk-margin-tiny-bottom wc-price">
                    <NumberFormat value={Math.abs(availableDeviceSalePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
                  </div>
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
                        this.next_proposal_status = BUYER_REMOVED;
                        this.props.buyerRemoveProposalSaleStart(proposal);
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
                          this.props.buyerAcceptProposalSaleStart(proposal);
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
        </div>
      )
    }
  }
  renderSale() {
    const { screenWidth, cart: { status } } = this.props;

    return (
      <Fragment>
        {
          status !== SELLER_REJECTED
          &&
          status !== SELLER_ACCEPTED
          &&
          <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
            <div className="uk-text-lead uk-text-bold">Proposal Price</div>
            <div className="wc-form-group uk-margin-xsmall-top">
              <label>
                <span>Price Sale</span>
                <em>*</em>
              </label>
              <NumberFormat name="price_sale" thousandSeparator={true} prefix={'$'}
                value={this.state.priceSale}
                onValueChange={(values) => {
                  const { value } = values;
                  this.setState({ priceSale: value });
                }} />
            </div>

          </div>
        }

      </Fragment>
    )
  }
  render() {
    const { clearSelectedCart, isOpen, cart, loadingProposal, loadingDetailCart, screenWidth } = this.props;
    if (cart) {
      const { status } = cart;
      return (
        <Popup modal
          open={isOpen}
          lockScroll={true}
          onClose={() => {
            this.setState({
              priceSale: '',
              reset: false
            }, () => {
              this.garbageCollection();
              clearSelectedCart();
            });
          }}
          onOpen={() => {
            this.setState({ reset: true });
          }}
          closeOnDocumentClick={false}
          closeOnEscape={false}
          contentStyle={{ width: '90%', border: 'none', padding: 0 }}>
          <div>
            <a className="uk-badge uk-position-top-right uk-position-cart wc-close-modal"
              onClick={this.props.onClose}>
              <i className="fa fa-close" />
            </a>
            <div className="uk-position-relative wc-modal-body-scroll">
              {(loadingProposal || loadingDetailCart) && <CommonLoading />}
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
                  {
                    status !== SELLER_REJECTED
                    &&
                    status !== SELLER_ACCEPTED
                    &&
                    <CommonButton className="wc-btn uk-margin-tiny-left"
                      screenWidth={screenWidth}
                      onClick={() => this.handleAccept()}>
                      {
                        screenWidth === IS_MOBILE
                          ?
                          <span>Reply</span>
                          :
                          <span>Reply Proposal</span>
                      }
                    </CommonButton>
                  }
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )
    } else return (
      <Popup modal
        open={isOpen}
        lockScroll={true}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: '90%', border: 'none', padding: 0 }}>
        <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
          {(loadingProposal || loadingDetailCart) && <CommonLoading />}
          There are no items
      </div>
      </Popup>
    );


  }
}

OrderViewProposalSale.propTypes = {
  screenWidth: PropTypes.any.isRequired
}

const mapStateToProps = createStructuredSelector({
  loadingProposal: selectLoadingProposalSale,
  screenWidth: selectScreenWidth,
  cart: selectSelectedCart,
  loadingDetailCart: selectLoadingDetailCart
});

const mapDispatchToProps = dispatch => ({
  addProposalSaleStart: (device) => dispatch(addProposalSaleStart({ device })),
  clearSelectedCart: () => dispatch(clearSelectedCart()),
  buyerRemoveProposalSaleStart: (proposal) => dispatch(buyerRemoveProposalSaleStart({ proposal })),
  buyerReplyProposalSaleStart: (proposal) => dispatch(buyerReplyProposalSaleStart({ proposal })),
  buyerAcceptProposalSaleStart: (proposal) => dispatch(buyerAcceptProposalSaleStart({ proposal })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderViewProposalSale);
