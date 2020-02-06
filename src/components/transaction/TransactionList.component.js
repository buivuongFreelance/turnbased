import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { formatRelative } from "date-fns";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { selectLoadingListTransaction, selectTransactionsGroupByOrder } from "../../redux/order/order.selectors";
import { listTransactionStart } from "../../redux/order/order.actions";
import CommonLoading from "../common/CommonLoading.component";

import { withRouter } from "react-router";
import TransactionItem from "./TransactionItem.component";
import { ORDER_STATUS, IS_MOBILE } from "../../config";
import NumberFormat from "react-number-format";


class TransactionList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.listTransactionStart(100, 0);
  }
  renderMoney(totalMoney) {
    if (totalMoney > 0)
      return <span className="uk-text-xlarge uk-text-bold"><NumberFormat value={Math.abs(totalMoney)} displayType="text" thousandSeparator={true} prefix={'$'} /></span>
    else if (totalMoney == 0)
      return <span className="uk-text-bold">No pay</span>
    else {
      return (
        <div>
          <span>You get: </span>
          <span className="uk-text-xlarge uk-text-bold">
            <NumberFormat value={Math.abs(totalMoney)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </span>
        </div>
      )
    }
  }
  render() {
    const { transactionsGroupByOrder, loadingListTransaction, screenWidth } = this.props;
    return (
      <div>
        <div className="transactions uk-position-relative">
          {loadingListTransaction && <CommonLoading />}
          {
            transactionsGroupByOrder.length > 0
              ?
              transactionsGroupByOrder.map((transactionByOrder) => {
                return (
                  <div className="transactions_group uk-box-shadow-medium uk-padding-small uk-margin-bottom" key={transactionByOrder.id} >
                    <div className="transactions_group-header uk-flex uk-flex-middle uk-flex-between uk-padding-small uk-padding-remove-left uk-padding-remove-right">
                      <div>Created at: {formatRelative(new Date(transactionByOrder.createdAt), new Date())}</div>
                      <div className="uk-text-bold uk-text-uppercase uk-text-active">{ORDER_STATUS[transactionByOrder.status]}</div>
                    </div>
                    <div className="transactions_group-body">
                      {
                        transactionByOrder.transactions.map((transaction) => {
                          return (
                            <TransactionItem key={transaction.id} {...transaction} />
                          )
                        })
                      }
                    </div>
                    <div className="transactions_group-footer uk-text-right">
                      <div className="transactions_group-footer-total uk-margin-xsmall-top">
                        <span>Total money: </span>
                        {this.renderMoney(transactionByOrder.totalMoney)}
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div className={screenWidth === IS_MOBILE ? 'uk-container' : ''}>
                <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                  There are no transaction
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  transactionsGroupByOrder: selectTransactionsGroupByOrder,
  loadingListTransaction: selectLoadingListTransaction
})
const mapDispatchToProps = dispatch => ({
  listTransactionStart: (limit, offset) => dispatch(listTransactionStart({ limit, offset })),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TransactionList));
