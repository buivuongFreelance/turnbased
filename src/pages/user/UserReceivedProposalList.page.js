import React, { Component } from "react";
import CommonBaseAccount from "../../components/common/CommonBaseAccount.component";
import { withRouter } from "react-router-dom";
import withApp from "../../hoc/withApp.hoc";

import { IS_MOBILE } from "../../config";
import { historyRedirect } from "../../utils";
import OrderProposalList from "../../components/order/OrderProposalList.component";

class UserReceivedProposalList extends Component {
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
      <CommonBaseAccount active="proposal" user={user} screenWidth={screenWidth}>
        <div className="uk-position-relative">
          <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
            <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
              My Proposals
            </div>
          </div>
        </div>
        <OrderProposalList />
      </CommonBaseAccount>
    )
  }
  renderPC() {
    const { user, screenWidth } = this.props;

    return (
      <CommonBaseAccount active="device" user={user} screenWidth={screenWidth}>
        <div>
          <OrderProposalList />
        </div>
      </CommonBaseAccount>
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

export default withApp((withRouter(UserReceivedProposalList)));
