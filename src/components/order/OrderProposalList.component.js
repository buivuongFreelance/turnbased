import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLoadingProposalByUser, selectProposalsByUser } from "../../redux/order/order.selectors";
import { selectScreenWidth, selectResetProposal } from "../../redux/screen/screen.selectors";
import {
  listProposalByUserStart
} from "../../redux/order/order.actions";

import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

import { withRouter } from "react-router";
import { historyRedirect } from "../../utils";
import CommonLoading from "../common/CommonLoading.component";
import ReactPaginate from "react-paginate";

import OrderProposalItem from "./OrderProposalItem.component";

class OrderProposalList extends Component {
  constructor(props) {
    super(props);

    const { screenWidth } = this.props;

    this.state = {
      limit: screenWidth === IS_MOBILE ? 6 : 20,
      staticLimit: screenWidth === IS_MOBILE ? 6 : 20,
      page: 0
    }
  }
  componentDidMount() {
    const { listProposalByUserStart, resetProposal } = this.props;
    if (!resetProposal)
      listProposalByUserStart('');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.resetProposal !== this.props.resetProposal) {
      if (prevProps.resetProposal) {
        const { listProposalByUserStart } = this.props;
        listProposalByUserStart('');
      }
    }
  }
  handlePageClick(data) {
    const { staticLimit } = this.state;
    const { listMyDevicesStart } = this.props;

    let selected = data.selected;
    this.setState({ page: selected }, () => {
      listMyDevicesStart(staticLimit, this.state.page);
    });
  }
  loadMore() {
    const { limit, staticLimit } = this.state;
    const { listMyDevicesStart } = this.props;

    this.setState({ limit: limit + staticLimit }, () => {
      listMyDevicesStart(this.state.limit, this.state.page);
    });
  }
  renderPreviousBtn() {
    const { page } = this.state;

    if (page > 0)
      return (
        <button type="button" className="wc-pagination-circle">
          <i className="fa fa-angle-left"></i>
        </button>
      )
    else
      return null;
  }
  renderNextBtn() {
    const { page, staticLimit } = this.state;
    const { countDevices } = this.props;

    if (((page + 1) * staticLimit) <= countDevices)
      return (
        <button type="button" className="wc-pagination-circle">
          <i className="fa fa-angle-right"></i>
        </button>
      )
    else
      return null;
  }
  renderLoadMore() {
    const { staticLimit, limit } = this.state;
    const { countDevices } = this.props;
    if (limit < countDevices)
      return (
        <div className="uk-width-1-1 uk-text-center uk-margin-top uk-margin-large-bottom">
          <a className="uk-text-emphasis"
            onClick={() => this.loadMore()}>See {staticLimit} more devices</a>
        </div>
      )
    else return null;
  }
  renderPagination(classPagination) {
    const { countDevices } = this.props;
    const { staticLimit } = this.state;

    const pageCount = Math.ceil(countDevices / staticLimit);

    if (pageCount > 1)
      return <div className={classPagination.join(' ')}>
        <ReactPaginate
          previousLabel={this.renderPreviousBtn()}
          nextLabel={this.renderNextBtn()}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => this.handlePageClick(data)}
          containerClassName={'pagination uk-padding-remove'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    else return null;
  }
  render() {
    const { proposals, history, screenWidth, loading } = this.props;

    let classGridDevices = ['uk-grid'];
    let classPagination = ['uk-width-1-1 uk-margin-top'];

    switch (screenWidth) {
      case IS_MOBILE:
        classGridDevices.push('uk-child-width-1-2');
        break;
      case IS_TABLET:
        classGridDevices.push('uk-child-width-1-4');
        classPagination.push('uk-text-center');
        break;
      case IS_PC:
        classGridDevices.push('uk-child-width-1-5');
        classPagination.push('uk-text-right');
        break;
    }

    return (
      <div className="wc-related-device">
        <div className={screenWidth === IS_MOBILE ? 'uk-container uk-position-relative uk-margin-top' : 'uk-position-relative'}>
          {loading && <CommonLoading />}
          {
            proposals.length
              ?
              <div>
                <div className={classGridDevices.join(' ')}>
                  {
                    proposals.map((proposal) => {
                      const { proposalType } = proposal;
                      return (
                        <OrderProposalItem {...proposal}
                          key={proposal.id}
                          onClick={() => {
                            historyRedirect({ history, uri: 'account/received-proposal/' + proposalType + '/' + proposal.id });
                          }} />
                      )
                    })
                  }
                </div>
                {
                  screenWidth === IS_MOBILE
                    ? this.renderLoadMore()
                    :
                    this.renderPagination(classPagination)
                }
              </div>
              :
              <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                There are no items
              </div>
          }
        </div>
      </div >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingProposalByUser,
  proposals: selectProposalsByUser,
  resetProposal: selectResetProposal,
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  listProposalByUserStart: (type) => dispatch(listProposalByUserStart({ type }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderProposalList));
