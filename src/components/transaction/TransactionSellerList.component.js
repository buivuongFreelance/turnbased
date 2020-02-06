import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
//import { formatRelative } from "date-fns";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { selectLoadingListTransactionSeller, selectTransactionsSeller } from "../../redux/order/order.selectors";
import { listTransactionSellerStart } from "../../redux/order/order.actions";
import CommonLoading from "../common/CommonLoading.component";
import NumberFormat from "react-number-format";
import CommonImage from "../common/CommonImage.component";
import { TRANSACTION_STATUS, IS_MOBILE } from "../../config";

class TransactionSellerList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.listTransactionSellerStart(100, 0);
    console.log
  }
  renderMoney(money) {
    if (money > 0)
      return <span className="uk-text-bold"><NumberFormat value={Math.abs(money)} displayType="text" thousandSeparator={true} prefix={'$'} /></span>
    else if (money == 0)
      return <span className="uk-text-bold">No pay</span>
    else {
      return (
        <div>
          <span>You get: </span>
          <span className="uk-text-bold">
            <NumberFormat value={Math.abs(money)} displayType="text" thousandSeparator={true} prefix={'$'} />
          </span>
        </div>
      )
    }
  }
  renderImage(proposalExchange, proposalSale) {
    if (proposalExchange) {
      const { device } = proposalExchange;
      if (device) {
        const { images } = device;
        let image = '';
        if (images) {
          if (images.length > 0)
            image = images[0].thumbnail_url;
        }
        return (
          <CommonImage url={image} width="70" />
        )
      }
    }
    if (proposalSale) {
      const { device } = proposalSale;
      if (device) {
        const { images } = device;
        let image = '';
        if (images) {
          if (images.length > 0)
            image = images[0].thumbnail_url;
        }
        return (
          <CommonImage url={image} width="70" />
        )
      }
    }
  }
  renderTitleExchange(proposalExchange) {
    if (proposalExchange) {
      const { device, proposalExchangesDevices } = proposalExchange;
      if (device) {
        const deviceSellerName = device.modelName;
        if (proposalExchangesDevices) {
          console.log("proposalExchangesDevices", proposalExchangesDevices)

          const proposalExchangeDevice = proposalExchangesDevices[0];
          const deviceBuyerName = proposalExchangeDevice.modelName;
          return (
            <div>
              <p className="uk-margin-remove uk-text-bold">{deviceSellerName}</p>
              <span className="uk-text-meta uk-text-muted"><b>Exchange with </b>{deviceBuyerName}</span>
            </div>
          )
        }
      }
    }
  }
  renderTitleProposal(proposalSale) {
    if (proposalSale) {
      const { device } = proposalSale;
      if (device) {
        return (
          <span className="uk-text-bold">{device.modelName}</span>
        )
      }
    }
  }
  renderMobile() {
    const { transactionsSeller, loadingListTransactionSeller } = this.props;
    return (
      <div className="transactions uk-position-relative">
        {loadingListTransactionSeller && <CommonLoading />}
        {
          transactionsSeller.length > 0
            ?
            <div className="transactions_group uk-box-shadow-medium uk-padding-small uk-margin-bottom" >
              <div className="transactions_group-body">
                {
                  transactionsSeller.map((transactionsSeller) => {
                    return (
                      <div key={transactionsSeller.id} className="transactions_group-item uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-padding-remove-left uk-padding-remove-right">
                        <div className="transactions_group-item-image uk-width-1-3">
                          {this.renderImage(transactionsSeller.proposalSale, transactionsSeller.proposalExchange)}
                        </div>
                        <div className=" uk-width-2-3">
                          <div className="transactions_group-item-code">
                            <span>Code: </span><span className="uk-text-bold">{transactionsSeller.transactionCode}</span>
                          </div>
                          <div className="transactions_group-item-title uk-text-bold">
                            {
                              transactionsSeller.proposalExchange
                                ?
                                this.renderTitleExchange(transactionsSeller.proposalExchange)
                                :
                                null
                            }
                            {
                              transactionsSeller.proposalSale
                                ?
                                this.renderTitleProposal(transactionsSeller.proposalSale)
                                :
                                null
                            }
                          </div>
                          <div className="transactions_group-item-status uk-text-bold">
                            <span>{TRANSACTION_STATUS[transactionsSeller.status]}</span>
                          </div>
                          <div className="transactions_group-item-price">
                            {this.renderMoney(transactionsSeller.money)}
                          </div>
                        </div>

                      </div>
                    )
                  })
                }
              </div>
            </div>
            :
            <div className="uk-container">
              <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
                There are no transaction
                </div>
            </div>
        }
      </div>
    )
  }

  renderDefault() {
    const { transactionsSeller, loadingListTransactionSeller } = this.props;
    return (
      <div className="transactions uk-position-relative">
        {loadingListTransactionSeller && <CommonLoading />}
        {
          transactionsSeller.length > 0
            ?
            <div className="transactions_group uk-box-shadow-medium uk-padding-small uk-margin-bottom" >
              <div className="transactions_group-body">
                {
                  transactionsSeller.map((transactionsSeller) => {
                    return (
                      <div key={transactionsSeller.id} className="transactions_group-item uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-padding-remove-left uk-padding-remove-right">
                        <div className="transactions_group-item-image uk-width-small">
                          {this.renderImage(transactionsSeller.proposalSale, transactionsSeller.proposalExchange)}
                        </div>
                        <div className="transactions_group-item-code uk-width-small">
                          <span>Code: </span><span className="uk-text-bold">{transactionsSeller.transactionCode}</span>
                        </div>
                        <div className="transactions_group-item-title uk-text-bold uk-width-1-3">
                          {
                            transactionsSeller.proposalExchange
                              ?
                              this.renderTitleExchange(transactionsSeller.proposalExchange)
                              :
                              null
                          }
                          {
                            transactionsSeller.proposalSale
                              ?
                              this.renderTitleProposal(transactionsSeller.proposalSale)
                              :
                              null
                          }
                        </div>
                        <div className="transactions_group-item-status uk-text-bold uk-width-small">
                          <span>{TRANSACTION_STATUS[transactionsSeller.status]}</span>
                        </div>
                        <div className="transactions_group-item-price uk-width-small uk-text-right">
                          {this.renderMoney(transactionsSeller.money)}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            :
            <div className="uk-container uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no transaction
                </div>
        }
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;
    if (screenWidth === IS_MOBILE)
      return this.renderMobile();

    else
      return this.renderDefault();
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  loadingListTransactionSeller: selectLoadingListTransactionSeller,
  transactionsSeller: selectTransactionsSeller
})
const mapDispatchToProps = dispatch => ({
  listTransactionSellerStart: (limit, offset) => dispatch(listTransactionSellerStart({ limit, offset })),
});
export default connect(mapStateToProps, mapDispatchToProps)(TransactionSellerList)

