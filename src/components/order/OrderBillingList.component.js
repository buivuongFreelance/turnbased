import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { selectBillings, selectLoadingListBilling, selectSelectedBilling, selectLoadingCreateBilling, selectLoadingUpdateBilling, selectLoadingRemoveBilling } from "../../redux/order/order.selectors";
import { listBillingStart, selectBilling, removeBillingStart } from "../../redux/order/order.actions";
import CommonLoading from "../common/CommonLoading.component";
import { IS_MOBILE, IS_PC } from "../../config";

import Popup from "reactjs-popup";
import CommonModalConfirm from "../common/CommonModalConfirm.component";

class OrderBillingList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.resetBillingList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingListBilling !== this.props.loadingListBilling) {
      if (this.props.loadingListBilling === false) {
        const { billings, selectedBilling } = this.props;
        if (billings) {
          if (billings.length > 0) {
            if (!selectedBilling) {
              this.props.selectBilling(billings[0]);
              if (this.props.onBilling)
                this.props.onBilling(billings[0]);
            } else {
              const { id } = selectedBilling;
              for (let billing of billings) {
                if (billing.id === id) {
                  this.props.selectBilling(billing);
                  if (this.props.onBilling)
                    this.props.onBilling(billing);
                  break;
                }
              }
            }
          }
        }
      }
    }
    if (prevProps.loadingCreateBilling !== this.props.loadingCreateBilling) {
      if (this.props.loadingCreateBilling === false) {
        this.resetBillingList();
      }
    }
    if (prevProps.loadingUpdateBilling !== this.props.loadingUpdateBilling) {
      if (this.props.loadingUpdateBilling === false) {
        this.resetBillingList();
      }
    }
    if (prevProps.loadingRemoveBilling !== this.props.loadingRemoveBilling) {
      if (this.props.loadingRemoveBilling === false) {
        this.resetBillingList();
      }
    }
  }
  handleRemove(billing) {
    this.props.removeBillingStart(billing.id);
  }
  resetBillingList() {
    this.props.listBillingStart();
  }
  onClickItem(billing) {
    this.props.selectBilling(billing);
  }
  renderBilling(close) {
    const { billings, screenWidth, selectedBilling } = this.props;
    let classItem = ['uk-margin-small-bottom uk-cursor'];

    if (screenWidth !== IS_PC)
      classItem.push('uk-width-1-1');
    else
      classItem.push('uk-width-1-2');

    if (billings) {
      if (billings.length > 0) {
        return (
          <Fragment>
            {
              billings.map((billing) => {
                const { id, receiverName, streetAddress } = billing;
                let flag = false;
                let classActive = ['uk-card uk-card-default uk-padding-small uk-text-small'];
                let classLink = 'uk-text-active';

                if (selectedBilling) {
                  if (id === selectedBilling.id) {
                    classActive.push('uk-background-active');
                    classLink = 'uk-text-white';
                    flag = true;
                  }
                }

                return (
                  <div className={classItem.join(' ')} key={id}
                    onClick={() => {
                      this.onClickItem(billing);
                      if (close)
                        close();
                    }}>
                    <div className={classActive.join(' ')}>
                      <ul className="uk-list">
                        <li className="uk-text-bold uk-text-lead">{receiverName}</li>
                        <li><b>Address: </b>{streetAddress}</li>
                        {
                          !flag
                          &&
                          <li>
                            <CommonModalConfirm
                              screenWidth={screenWidth}
                              message="Do you really want to remove this billing ?"
                              onOpen={(ev) => {
                                if (ev) ev.stopPropagation();
                              }}
                              onClose={(ev) => {
                                if (ev) ev.stopPropagation();
                              }}
                              onOk={close => {
                                this.handleRemove(billing);
                                close();
                              }}
                              trigger={
                                <a className={classLink}>Remove Billing</a>
                              }
                            />
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                )
              })
            }
          </Fragment>
        )
      } else {
        return (
          <div className="uk-position-relative">
            <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no items
            </div>
          </div>
        )
      }
    }
  }
  renderMobile() {
    const { loadingListBilling, loadingRemoveBilling, billings, screenWidth } = this.props;

    if (billings) {
      if (billings.length > 0)
        return (
          <div className="uk-position-relative">
            {(loadingListBilling || loadingRemoveBilling) && <CommonLoading />}
            <Popup modal
              closeOnDocumentClick
              contentStyle={{ width: screenWidth === IS_MOBILE ? '70%' : '90%', border: 'none', padding: 0 }}
              trigger={
                <a className="uk-text-active">Select Your Billing Address</a>
              }
            >
              {
                close => {
                  return (
                    <div>
                      <a className="uk-badge uk-position-top-right uk-position-cart wc-close-modal"
                        onClick={() => close()}>
                        <i className="fa fa-close" />
                      </a>
                      <div className="uk-grid uk-grid-small uk-padding-small wc-modal-body-scroll">
                        {
                          this.renderBilling(close)
                        }
                      </div>
                    </div>
                  )
                }
              }
            </Popup>
          </div>
        )
      else
        return null;
    }
  }
  renderPC() {
    const { loadingListBilling, loadingRemoveBilling, billings } = this.props;

    if (billings) {
      if (billings.length > 0)
        return (
          <div className="uk-position-relative">
            {(loadingListBilling || loadingRemoveBilling) && <CommonLoading />}
            <div className="uk-grid uk-grid-small uk-padding-small">
              {
                this.renderBilling(null)
              }
            </div>
          </div>
        )
      else
        return (
          <div className="uk-position-relative">
            {loadingListBilling && <CommonLoading />}
            <div className="uk-placeholder uk-margin-top uk-text-center uk-margin-bottom">
              There are no items
            </div>
          </div>
        )
    }
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  billings: selectBillings,
  loadingListBilling: selectLoadingListBilling,
  loadingCreateBilling: selectLoadingCreateBilling,
  loadingUpdateBilling: selectLoadingUpdateBilling,
  loadingRemoveBilling: selectLoadingRemoveBilling,
  selectedBilling: selectSelectedBilling
});

const mapDispatchToProps = dispatch => ({
  listBillingStart: () => dispatch(listBillingStart()),
  selectBilling: (billing) => dispatch(selectBilling(billing)),
  removeBillingStart: (id) => dispatch(removeBillingStart({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderBillingList);
