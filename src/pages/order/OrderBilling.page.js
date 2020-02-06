import React, { Component, Fragment } from "react";
import withApp from "../../hoc/withApp.hoc";
import CommonButton from "../../components/common/CommonButton.component";
import { IS_MOBILE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { toggleCheckoutList } from "../../redux/screen/screen.actions";
import CommonBaseOrder from "../../components/common/CommonBaseOrder.component";
import OrderBillingForm from "../../components/order/OrderBillingForm.component";
import OrderBillingList from "../../components/order/OrderBillingList.component";

import { withRouter } from "react-router";
import { historyRedirect } from "../../utils";
import { selectSelectedShipping } from "../../redux/order/order.selectors";

class OrderBillingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goToPayment: false
    }
  }
  componentDidMount() {
    const { selectedShipping, history } = this.props;
    if (!selectedShipping)
      historyRedirect({ history, uri: 'order/shipping' });
  }
  handleBilling() {
    if (this.state.goToPayment)
      historyRedirect({ history: this.props.history, uri: 'order/confirm' });
  }
  handleSuccessBilling() {
    this.setState({
      goToPayment: true
    });
  }
  renderCommands() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return (
        <div className="wc-navbar-wrapper-footer">
          <div className="uk-flex">
            <div className="wc-navbar-link-wrapper uk-width-1-1">
              <div className="uk-flex">
                <CommonButton screenWidth={screenWidth}
                  className="wc-btn navbar-button uk-text-white uk-margin-remove" type="inverted">
                  Go To Payment
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
        <div>
          {/*{screenWidth === IS_MOBILE && this.renderCommands()}*/}
          <div className="uk-container uk-margin-top">
            <div className="wc-block-wrapper">
              <CommonBaseOrder active="billing"
                screenWidth={screenWidth}>
                <div className="uk-margin-top">
                  <OrderBillingList onBilling={((billing) => this.handleBilling(billing))} />
                </div>
                <OrderBillingForm
                  onSuccess={() => this.handleSuccessBilling()} />
              </CommonBaseOrder>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  renderPC() {
    const { screenWidth } = this.props;

    return (
      <div className="uk-container uk-margin-top">
        <CommonBaseOrder active="billing"
          screenWidth={screenWidth}>
          <div className="uk-grid">
            <div className="uk-width-1-2">
              <div className="wc-wrapper-title">
                <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Billing Address</div>
              </div>
              <OrderBillingForm
                onSuccess={() => this.handleSuccessBilling()} />
            </div>
            <div className="uk-width-1-2">
              <div className="wc-wrapper-title">
                <div className="wc-title uk-flex uk-flex-middle uk-flex-center">Your Addresses</div>
              </div>
              <OrderBillingList onBilling={((billing) => this.handleBilling(billing))} />
            </div>
          </div>
        </CommonBaseOrder>
      </div>
    )
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
  selectedShipping: selectSelectedShipping
});

const mapDispatchToProps = dispatch => ({
  toggleCheckoutList: status => dispatch(toggleCheckoutList(status))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderBillingPage)));
