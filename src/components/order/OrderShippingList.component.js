import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { selectShippings, selectLoadingListShipping, selectSelectedShipping, selectLoadingCreateShipping, selectLoadingUpdateShipping, selectLoadingRemoveShipping } from "../../redux/order/order.selectors";
import { listShippingStart, selectShipping, removeShippingStart } from "../../redux/order/order.actions";
import CommonLoading from "../common/CommonLoading.component";
import { IS_MOBILE, IS_PC } from "../../config";

import Popup from "reactjs-popup";
import CommonModalConfirm from "../common/CommonModalConfirm.component";

class OrderShippingList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.resetShippingList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingListShipping !== this.props.loadingListShipping) {
      if (this.props.loadingListShipping === false) {
        const { shippings, selectedShipping } = this.props;
        if (shippings) {
          if (shippings.length > 0) {
            if (!selectedShipping) {
              this.props.selectShipping(shippings[0]);
              if (this.props.onBilling)
                this.props.onBilling(shippings[0]);
            } else {
              const { id } = selectedShipping;
              for (let shipping of shippings) {
                if (shipping.id === id) {
                  this.props.selectShipping(shipping);
                  if (this.props.onBilling)
                    this.props.onBilling(shipping);
                  break;
                }
              }
            }
          }
        }
      }
    }
    if (prevProps.loadingCreateShipping !== this.props.loadingCreateShipping) {
      if (this.props.loadingCreateShipping === false) {
        this.resetShippingList();
      }
    }
    if (prevProps.loadingUpdateShipping !== this.props.loadingUpdateShipping) {
      if (this.props.loadingUpdateShipping === false) {
        this.resetShippingList();
      }
    }
    if (prevProps.loadingRemoveShipping !== this.props.loadingRemoveShipping) {
      if (this.props.loadingRemoveShipping === false) {
        this.resetShippingList();
      }
    }
  }
  handleRemove(shipping) {
    this.props.removeShippingStart(shipping.id);
  }
  resetShippingList() {
    this.props.listShippingStart();
  }
  onClickItem(shipping) {
    this.props.selectShipping(shipping);
  }
  renderShipping(close) {
    const { shippings, screenWidth, selectedShipping } = this.props;
    let classItem = ['uk-margin-small-bottom uk-cursor'];

    if (screenWidth !== IS_PC)
      classItem.push('uk-width-1-1');
    else
      classItem.push('uk-width-1-2');

    if (shippings) {
      if (shippings.length > 0) {
        return (
          <Fragment>
            {
              shippings.map((shipping) => {
                const { id, receiverName, streetAddress } = shipping;
                let flag = false;
                let classActive = ['uk-card uk-card-default uk-padding-small uk-text-small'];
                let classLink = 'uk-text-active';

                if (selectedShipping) {
                  if (id === selectedShipping.id) {
                    classActive.push('uk-background-active');
                    classLink = 'uk-text-white';
                    flag = true;
                  }
                }

                return (
                  <div className={classItem.join(' ')} key={id}
                    onClick={() => {
                      this.onClickItem(shipping);
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
                              message="Do you really want to remove this shipping ?"
                              onOpen={(ev) => {
                                if (ev) ev.stopPropagation();
                              }}
                              onClose={(ev) => {
                                if (ev) ev.stopPropagation();
                              }}
                              onOk={close => {
                                this.handleRemove(shipping);
                                close();
                              }}
                              trigger={
                                <a className={classLink}>Remove Shipping</a>
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
    const { loadingListShipping, loadingRemoveShipping, shippings, screenWidth } = this.props;

    if (shippings) {
      if (shippings.length > 0)
        return (
          <div className="uk-position-relative">
            {(loadingListShipping || loadingRemoveShipping) && <CommonLoading />}
            <Popup modal
              closeOnDocumentClick
              contentStyle={{ width: screenWidth === IS_MOBILE ? '70%' : '90%', border: 'none', padding: 0 }}
              trigger={
                <a className="uk-text-active">Select Your Shipping Address</a>
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
                          this.renderShipping(close)
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
    const { loadingListShipping, loadingRemoveShipping, shippings } = this.props;

    if (shippings) {
      if (shippings.length > 0)
        return (
          <div className="uk-position-relative">
            {(loadingListShipping || loadingRemoveShipping) && <CommonLoading />}
            <div className="uk-grid uk-grid-small uk-padding-small">
              {
                this.renderShipping(null)
              }
            </div>
          </div>
        )
      else
        return (
          <div className="uk-position-relative">
            {loadingListShipping && <CommonLoading />}
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
  shippings: selectShippings,
  loadingListShipping: selectLoadingListShipping,
  loadingCreateShipping: selectLoadingCreateShipping,
  loadingUpdateShipping: selectLoadingUpdateShipping,
  loadingRemoveShipping: selectLoadingRemoveShipping,
  selectedShipping: selectSelectedShipping
});

const mapDispatchToProps = dispatch => ({
  listShippingStart: () => dispatch(listShippingStart()),
  selectShipping: (shipping) => dispatch(selectShipping(shipping)),
  removeShippingStart: (id) => dispatch(removeShippingStart({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderShippingList);
