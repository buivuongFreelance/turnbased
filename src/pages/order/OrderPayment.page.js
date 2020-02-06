import React, { Component, Fragment } from "react";
import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { toggleCheckoutList } from "../../redux/screen/screen.actions";
import CommonBaseOrder from "../../components/common/CommonBaseOrder.component";

import { withRouter } from "react-router";
//import { historyRedirect } from "../../utils";
import { selectSelectedShipping, selectSelectedBilling } from "../../redux/order/order.selectors";
import OrderPaymentForm from "../../components/order/OrderPaymentForm.component";

class OrderPaymentPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    /*const { selectedShipping, selectedBilling, history } = this.props;
    if (!selectedShipping && !selectedBilling)
      historyRedirect({ history, uri: 'order/shipping' });*/
  }
  renderMobile() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        <div>
          <div className="uk-container uk-margin-top">
            <div className="wc-block-wrapper">
              <CommonBaseOrder active="payment"
                screenWidth={screenWidth}>
                <OrderPaymentForm />
              </CommonBaseOrder>
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
  screenWidth: selectScreenWidth,
  selectedShipping: selectSelectedShipping,
  selectedBilling: selectSelectedBilling
});

const mapDispatchToProps = dispatch => ({
  toggleCheckoutList: status => dispatch(toggleCheckoutList(status))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderPaymentPage)));
