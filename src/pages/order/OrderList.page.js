import React, { Component } from "react";
import CommonBaseAccount from "../../components/common/CommonBaseAccount.component";
import { withRouter } from "react-router-dom";
import withApp from "../../hoc/withApp.hoc";

import { IS_MOBILE } from "../../config";
import { historyRedirect } from "../../utils";
import OrderListComponent from "../../components/order/OrderList.component";

class OrderListPage extends Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);
  }
  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  renderMobile() {
    const { user, screenWidth } = this.props;

    return (
      <CommonBaseAccount active="order" user={user} screenWidth={screenWidth}>
        <div className="uk-position-relative">
          <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
            <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
              My Orders
            </div>
          </div>
        </div>
        <OrderListComponent />
      </CommonBaseAccount>
    )
  }
  render() {
    const { user, screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return (
        <CommonBaseAccount active="order" user={user} screenWidth={screenWidth}>
          <div className="uk-text-lead">
            My Orders
          </div>
          <div className="uk-margin-top">
            <OrderListComponent />
          </div>
        </CommonBaseAccount>
      )
  }
}

export default withApp((withRouter(OrderListPage)));
