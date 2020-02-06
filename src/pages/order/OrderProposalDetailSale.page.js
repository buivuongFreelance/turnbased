import React, { Component, Fragment } from "react";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingProposalSale, selectLoadingDetailProposal, selectSelectedProposal } from "../../redux/order/order.selectors";
import {
  getProposalStart,
  sellerRejectProposalSaleStart,
  sellerReplyProposalSaleStart,
  sellerAcceptProposalSaleStart,
  sellerCancelProposalSaleStart,
  sellerRemoveProposalSaleStart
} from "../../redux/order/order.actions";

import { IS_MOBILE, NODE_ENV, SELLER_REJECTED, DISPLAY_PROPOSAL, SELLER_REPLIED, SELLER_ACCEPTED } from "../../config";
import withApp from "../../hoc/withApp.hoc";

import CommonModalConfirm from "../../components/common/CommonModalConfirm.component";
import CommonImage from "../../components/common/CommonImage.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import CommonLoading from "../../components/common/CommonLoading.component";
import NumberFormat from "react-number-format";
import CommonPageHolder from "../../components/common/CommonPageHolder.component";
import { historyRedirect } from "../../utils";

import check from "check-types";

import CommonButton from "../../components/common/CommonButton.component";
import { selectResetProposal } from "../../redux/screen/screen.selectors";

import { deleteProposalFirebase, addProposalFirebase, listProposalFirebase } from "../../firebase/firebase.utils";
import { setNotifyProposal } from "../../redux/screen/screen.actions";

class OrderProposalDetailSalePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceSale: ''
    }
  }
  componentDidMount() {
    const { getProposalStart, resetProposal, match: { params: { id } } } = this.props;
    if (!resetProposal)
      getProposalStart('sale', id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading === false) {
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE PROPOSAL START------------------');
        this.addNotificationOnFirebase();
        const { getProposalStart, match: { params: { id } } } = this.props;
        getProposalStart('sale', id);
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
        getProposalStart('sale', id);
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
    const { priceSale } = this.state;
    const { match: { params: { id } } } = this.props;

    if (check.positive(parseFloat(priceSale))) {
      const proposal = {
        id,
        proposalSalePrice: parseFloat(priceSale)
      }
      this.props.sellerReplyProposalSaleStart(proposal);
    }
    else
      alertify.error('Price Sale Must be number and positive');
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
  renderDeviceProposal() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        <div className="uk-text-lead uk-text-bold">Device Proposal</div>
        <div className="wc-cart-wrapper uk-margin-xsmall-top">
          <div className="uk-margin-tiny-bottom">
            <div className="uk-margin uk-text-small">
              <div className="wc-form-group">
                <div className="uk-margin-xsmall-bottom">
                  <label>
                    <span>Price Sale</span>
                    <em>*</em>
                  </label>
                  <NumberFormat name="price_sale" thousandSeparator={true} prefix={'$'}
                    onValueChange={(values) => {
                      const { value } = values;
                      this.setState({ priceSale: value });
                    }} />
                </div>
                <CommonButton
                  className="wc-btn wc-btn-small uk-margin-xsmall-top"
                  screenWidth={screenWidth}
                  onClick={() => this.handleSellerReplyProposal()}>
                  Reply Proposal
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  renderStatusProposal({ sale_proposal_price }) {
    return (
      <div className="uk-margin-xsmall-bottom">
        <div>
          <b>Proposal Price: </b>
          <NumberFormat value={Math.abs(sale_proposal_price)} displayType="text" thousandSeparator={true} prefix={'$'} />
        </div>
      </div>
    )
  }
  renderDevice(proposal) {
    const { match: { params: { id } }, screenWidth } = this.props;

    const { modelDetailName,
      images: mainImages, status: mainStatus } = proposal;

    const blockHTML = (
      <Fragment>
        <div className="uk-margin-tiny-bottom"><b>Available Type:</b> Sale</div>
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
                      this.props.sellerRemoveProposalSaleStart(proposal);
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
                  this.props.sellerRejectProposalSaleStart(proposal);
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
                    this.props.sellerAcceptProposalSaleStart(proposal);
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
                    this.props.sellerCancelProposalSaleStart(proposal);
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
                {this.renderDeviceProposal()}
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
  loading: selectLoadingProposalSale,
  loadingDetail: selectLoadingDetailProposal,
  proposal: selectSelectedProposal,
  resetProposal: selectResetProposal
});

const mapDispatchToProps = dispatch => ({
  getProposalStart: (type, id) => dispatch(getProposalStart({ type, id })),
  sellerRemoveProposalSaleStart: (proposal) => dispatch(sellerRemoveProposalSaleStart({ proposal })),
  sellerRejectProposalSaleStart: (proposal) => dispatch(sellerRejectProposalSaleStart({ proposal })),
  sellerReplyProposalSaleStart: (proposal) => dispatch(sellerReplyProposalSaleStart({ proposal })),
  sellerAcceptProposalSaleStart: (proposal) => dispatch(sellerAcceptProposalSaleStart({ proposal })),
  sellerCancelProposalSaleStart: (proposal) => dispatch(sellerCancelProposalSaleStart({ proposal })),
  setNotifyProposal: (list) => dispatch(setNotifyProposal(list))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderProposalDetailSalePage)));
