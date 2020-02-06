import React, { Component, Fragment } from "react";
import withApp from "../../hoc/withApp.hoc";
import OrderCartList from "../../components/order/OrderCartList.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import CommonButton from "../../components/common/CommonButton.component";
import { IS_MOBILE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { toggleCheckoutList } from "../../redux/screen/screen.actions";
import { clearBilling, clearShipping } from "../../redux/order/order.actions";

class OrderCartListPage extends Component {
  componentDidMount() {
    this.props.clearBilling();
    this.props.clearShipping();
  }
  renderCommands() {
    const { screenWidth, toggleCheckoutList } = this.props;

    if (screenWidth === IS_MOBILE)
      return (
        <div className="wc-navbar-wrapper-footer">
          <div className="uk-flex">
            <div className="wc-navbar-link-wrapper uk-width-1-1">
              <div className="uk-flex">
                <CommonButton screenWidth={screenWidth}
                  className="wc-btn navbar-button uk-text-white uk-margin-remove" type="inverted"
                  onClick={() => toggleCheckoutList(true)}>
                  Proceed To Checkout
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      )
  }
  renderMobile() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        {screenWidth !== IS_MOBILE && <CommonBreadcrumb list={[{ name: 'Cart List' }]} />}
        {
          screenWidth === IS_MOBILE
            ?
            <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
              <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                My Cart
              </div>
            </div>
            :
            null
        }
        <div>
          {screenWidth === IS_MOBILE && this.renderCommands()}
          <div className="uk-container uk-margin-top">
            <div className="wc-block-wrapper">
              <OrderCartList />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return this.renderMobile();
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  toggleCheckoutList: status => dispatch(toggleCheckoutList(status)),
  clearShipping: () => dispatch(clearShipping()),
  clearBilling: () => dispatch(clearBilling())
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(OrderCartListPage));
