import React, { Component, Fragment } from "react";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingProposal, selectLoadingDetailProposal, selectSelectedProposal } from "../../redux/order/order.selectors";
import {
  getProposalStart,
  sellerRemoveProposalExchangeStart,
  sellerRejectProposalExchangeStart,
  sellerReplyProposalExchangeStart,
  sellerAcceptProposalExchangeStart,
  sellerCancelProposalExchangeStart
} from "../../redux/order/order.actions";

import { IS_MOBILE, NODE_ENV, SELLER_REJECTED, DISPLAY_PROPOSAL, SELLER_REPLIED, SELLER_ACCEPTED } from "../../config";
import withApp from "../../hoc/withApp.hoc";

import CommonModalConfirm from "../../components/common/CommonModalConfirm.component";
import CommonImage from "../../components/common/CommonImage.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import CommonLoading from "../../components/common/CommonLoading.component";
import NumberFormat from "react-number-format";
import CommonPageHolder from "../../components/common/CommonPageHolder.component";
import { historyRedirect, displayStringExchangeSeller } from "../../utils";

import check from "check-types";

import CommonButton from "../../components/common/CommonButton.component";

import { selectResetProposal } from "../../redux/screen/screen.selectors";

import { deleteProposalFirebase, addProposalFirebase, listProposalFirebase } from "../../firebase/firebase.utils";
import { setNotifyProposal } from "../../redux/screen/screen.actions";

class OrderProposalDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckPrice: '',
      priceExchange: ''
    }
  }
  componentDidMount() {
    const { getProposalStart, resetProposal, match: { params: { id } } } = this.props;
    if (!resetProposal)
      getProposalStart('exchange', id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading === false) {
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE PROPOSAL START------------------');
        this.addNotificationOnFirebase();
        const { getProposalStart, match: { params: { id } } } = this.props;
        getProposalStart('exchange', id);
      }
    }
    if (prevProps.loadingDetail !== this.props.loadingDetail) {
      if (this.props.loadingDetail === false) {
        const { history, proposal } = this.props;
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE PROPOSAL START------------------');
        if (!proposal) {
          historyRedirect({ history, uri: 'account/received-proposal' });
        }
        this.proposal = proposal;
      }
    }
    if (prevProps.resetProposal !== this.props.resetProposal) {
      if (prevProps.resetProposal) {
        const { getProposalStart, match: { params: { id } } } = this.props;
        getProposalStart('exchange', id);
      }
    }
  }
  componentWillUnmount() {
    this.garbageCollection();
  }
  addNotificationOnFirebase() {
    const { proposal } = this.props;

    if (proposal) {
      const { buyer_id, id } = proposal;
      addProposalFirebase({ receiver_id: buyer_id, proposal_id: id, status: 'removed' });
    } else {
      if (this.proposal) {
        const timeoutId = this.proposal.id;
        addProposalFirebase({ receiver_id: this.proposal.buyer_id, proposal_id: this.proposal.id, status: 'removed' })
        deleteProposalFirebase({ receiver_id: this.proposal.seller_id, proposal_id: this.proposal.id })
          .then(() => {
            listProposalFirebase({ id: timeoutId })
              .then((list) => {
                this.props.setNotifyProposal(list);
              })
          })
      }
    }
  }
  garbageCollection() {
    this.proposal = null;
  }
  handleSellerReplyProposal() {
    const { selectedCheckPrice, priceExchange } = this.state;
    const { match: { params: { id } } } = this.props;

    if (selectedCheckPrice) {
      let proposal = null;
      if (selectedCheckPrice === 'no') {
        proposal = {
          id,
          proposalExchangePrice: 0
        }
        this.props.sellerReplyProposalExchangeStart(proposal);
        return;
      }

      if (check.positive(parseFloat(priceExchange))) {
        if (selectedCheckPrice === 'pay') {
          proposal = {
            id,
            proposalExchangePrice: parseFloat(-priceExchange)
          }
        } else if (selectedCheckPrice === 'receive') {
          proposal = {
            id,
            proposalExchangePrice: parseFloat(priceExchange)
          }
        }
        this.props.sellerReplyProposalExchangeStart(proposal);
      }
      else
        alertify.error('Price Exchange Must be number and positive');
    }
    else
      alertify.error('You must select 1 of 3 options');

  }
  handleChangeChecked(ev) {
    const { target: { value } } = ev;
    this.setState({ selectedCheckPrice: value });
  }
  renderImage(images) {
    if (images) {
      if (images.length > 0) {
        return (
          <CommonImage url={images[0].thumbnail_url}
            width="90px"
            className="uk-img" />
        )
      } else {
        return (
          <CommonImage url={''} width="80px"
            className="uk-img" />
        )
      }
    } else {
      return (
        <CommonImage url={''} width="90px"
          className="uk-img" />
      )
    }
  }
  renderDeviceExchange(proposalExchangeDevices) {
    if (proposalExchangeDevices) {
      const { screenWidth } = this.props;
      const { images, modelDetailName, colorName, deviceCondition, capacityName } = proposalExchangeDevices[0];
      const { selectedCheckPrice } = this.state;
      const { status } = this.props.proposal;
      return (
        <Fragment>
          <div className="uk-text-lead uk-text-bold">Device Exchange</div>

          <div className="wc-cart-wrapper uk-margin-top">
            <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
              <div className="wc-cart-item-img">
                {this.renderImage(images)}
              </div>
              <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column uk-width-1-1">
                <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
                <div className="uk-margin-tiny-bottom"><b>Color: </b>{colorName}</div>
                <div className="uk-margin-tiny-bottom"><b>Device Condition: </b>{deviceCondition} %</div>
                <div className="uk-margin-tiny-bottom"><b>Capacity Name: </b>{capacityName}</div>
              </div>
            </div>
            {
              status !== SELLER_ACCEPTED
              &&
              <div className="uk-margin-tiny-bottom uk-margin-top">
                <div className="uk-margin uk-text-small">
                  <label className="uk-margin-bottom uk-flex uk-flex-middle">
                    <input className="uk-radio" value="pay" type="radio" name="exchange"
                      checked={selectedCheckPrice === 'pay'}
                      onChange={(ev) => this.handleChangeChecked(ev)}
                    />
                    <div className="uk-margin-xsmall-left">Pay money</div>
                  </label>
                  <label className="uk-margin-bottom uk-flex uk-flex-middle">
                    <input className="uk-radio" value="receive" type="radio" name="exchange"
                      checked={selectedCheckPrice === 'receive'}
                      onChange={(ev) => this.handleChangeChecked(ev)}
                    />
                    <div className="uk-margin-xsmall-left">Get money</div>
                  </label>
                  <label className="uk-margin-bottom uk-flex uk-flex-middle">
                    <input className="uk-radio" value="no" type="radio" name="exchange"
                      checked={selectedCheckPrice === 'no'}
                      onChange={(ev) => this.handleChangeChecked(ev)}
                    />
                    <div className="uk-margin-xsmall-left">No exchange price</div>
                  </label>
                  {
                    selectedCheckPrice !== ''
                    &&
                    <div className="wc-form-group">
                      {
                        selectedCheckPrice !== 'no'
                        &&
                        <div className="uk-margin-xsmall-bottom">
                          <label>
                            <span>Price Exchange</span>
                            <em>*</em>
                          </label>
                          <NumberFormat name="price_exchange" thousandSeparator={true} prefix={'$'}
                            onValueChange={(values) => {
                              const { value } = values;
                              this.setState({ priceExchange: value });
                            }} />
                        </div>
                      }
                      <CommonButton className="wc-btn wc-btn-small uk-margin-xsmall-top"
                        screenWidth={screenWidth}
                        onClick={() => this.handleSellerReplyProposal()}>
                        Reply Proposal
                      </CommonButton>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </Fragment >
      )
    } else
      return (
        <div>
          <CommonPageHolder />
        </div >
      )
  }
  renderStatusProposal({ proposal_exchange_price, modelDetailName }) {
    return (
      <div className="uk-margin-xsmall-bottom">
        <div>
          {displayStringExchangeSeller(proposal_exchange_price, modelDetailName)}
        </div>
        {
          proposal_exchange_price !== 0
          &&
          <div className="wc-price uk-margin-xsmall-top">
            <NumberFormat value={Math.abs(proposal_exchange_price)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </div>
        }
      </div>
    )
  }
  renderDevice(proposal) {
    const { match: { params: { id } }, screenWidth } = this.props;

    const { modelDetailName,
      images: mainImages, status: mainStatus } = proposal;

    const blockHTML = (
      <Fragment>
        <div className="uk-margin-tiny-bottom"><b>Available Type:</b> Exchange</div>
        <div className="uk-margin-tiny-bottom"><b>Proposal Status:</b> {DISPLAY_PROPOSAL[mainStatus]}</div>
      </Fragment >
    )

    return (
      <Fragment>
        <div className="uk-text-lead uk-text-bold">Your Device</div>
        <div className="uk-flex">
          <div className="wc-cart-wrapper uk-margin-top">
            <div className="wc-cart-item uk-flex uk-margin-medium-bottom">
              <div className="wc-cart-item-img">
                {this.renderImage(mainImages)}
              </div>
              <div className="wc-cart-item-content uk-margin-left uk-text-small uk-flex uk-flex-column">
                <div className="uk-text-bold uk-margin-tiny-bottom">{modelDetailName}</div>
                {blockHTML}
                {this.renderStatusProposal(proposal)}
                <div>
                  <CommonModalConfirm
                    screenWidth={screenWidth}
                    message="Do you really want to remove proposal ?"
                    onOk={close => {
                      const proposal = {
                        id
                      }
                      this.props.sellerRemoveProposalExchangeStart(proposal);
                      close();
                    }}
                    trigger={
                      <a className="uk-text-active">
                        Remove Proposal
                      </a>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-margin-bottom">
          <div className="uk-text-small uk-text-muted uk-margin-xsmall-bottom">Do you want to: </div>
          <div className="uk-flex">
            {
              mainStatus !== SELLER_REJECTED
              &&
              mainStatus !== SELLER_ACCEPTED
              &&
              <CommonModalConfirm
                screenWidth={screenWidth}
                message="Do you really want to reject proposal ?"
                onOk={close => {
                  const proposal = {
                    id
                  }
                  this.props.sellerRejectProposalExchangeStart(proposal);
                  close();
                }}
                trigger={
                  <CommonButton type="button" className="wc-btn wc-btn-small" screenWidth={screenWidth}>
                    Reject Proposal
                  </CommonButton>
                }
              />
            }
            {
              (mainStatus !== SELLER_REPLIED
                &&
                mainStatus !== SELLER_REJECTED
                &&
                mainStatus !== SELLER_ACCEPTED)
              &&
              <div className="uk-margin-xsmall-left">
                <CommonModalConfirm
                  screenWidth={screenWidth}
                  message="Do you really want to accept this proposal ?"
                  onOk={close => {
                    const proposal = {
                      id
                    }
                    this.props.sellerAcceptProposalExchangeStart(proposal);
                    close();
                  }}
                  trigger={
                    <CommonButton type="button" className="wc-btn wc-btn-small" screenWidth={screenWidth}>
                      Accept Proposal
                  </CommonButton>
                  }
                />
              </div>
            }
            {
              (mainStatus === SELLER_ACCEPTED)
              &&
              <div>
                <CommonButton type="button" className="wc-btn wc-btn-small" screenWidth={screenWidth}
                  onClick={() => {
                    const proposal = {
                      id
                    }
                    this.props.sellerCancelProposalExchangeStart(proposal);
                  }}>
                  Cancel Accept Proposal
              </CommonButton>
              </div>
            }
          </div>
        </div>
      </Fragment >
    )
  }
  renderPC() {
    const { loading, proposal, screenWidth, loadingDetail } = this.props;

    if (proposal) {
      const { proposalExchangeDevices } = proposal;

      return (
        <Fragment>
          <CommonBreadcrumb list={[{ name: 'List Received Proposals', uri: 'account/received-proposal' }, { name: 'My Proposal' }]} />
          {
            screenWidth === IS_MOBILE
            &&
            <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
              <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                My Proposal
              </div>
            </div>
          }
          <div className="uk-container uk-margin-medium-top uk-margin-medium-bottom uk-position-relative">
            {
              (loading || loadingDetail) && <CommonLoading />
            }
            <div className="uk-grid uk-margin-bottom">
              <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
                {this.renderDevice(proposal)}
              </div>
              <div className={screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2'}>
                {this.renderDeviceExchange(proposalExchangeDevices)}
              </div>
            </div>
          </div>
        </Fragment>
      )
    } else return (
      <div>
        <CommonPageHolder />
      </div>
    )

  }

  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderPC();
    else
      return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingProposal,
  loadingDetail: selectLoadingDetailProposal,
  proposal: selectSelectedProposal,
  resetProposal: selectResetProposal
});

const mapDispatchToProps = dispatch => ({
  getProposalStart: (type, id) => dispatch(getProposalStart({ type, id })),
  sellerRemoveProposalExchangeStart: (proposal) => dispatch(sellerRemoveProposalExchangeStart({ proposal })),
  sellerRejectProposalExchangeStart: (proposal) => dispatch(sellerRejectProposalExchangeStart({ proposal })),
  sellerReplyProposalExchangeStart: (proposal) => dispatch(sellerReplyProposalExchangeStart({ proposal })),
  sellerAcceptProposalExchangeStart: (proposal) => dispatch(sellerAcceptProposalExchangeStart({ proposal })),
  sellerCancelProposalExchangeStart: (proposal) => dispatch(sellerCancelProposalExchangeStart({ proposal })),
  setNotifyProposal: (list) => dispatch(setNotifyProposal(list))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderProposalDetailPage)));
