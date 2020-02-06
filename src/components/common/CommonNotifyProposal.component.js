import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCountProposal } from "../../redux/screen/screen.selectors";
import { historyRedirect } from "../../utils";

import { withRouter } from "react-router";

class CommonNotifyProposal extends Component {
  render() {
    const { countProposal, history } = this.props;

    if (countProposal > 0) {
      return (
        <div className="uk-position-fixed uk-position-center-right uk-position-z-index uk-padding-small uk-background-black uk-cursor"
          onClick={() => historyRedirect({ history, uri: 'account/received-proposal' })}>
          <div className="uk-position-relative">
            <span className="uk-badge uk-position-top-right uk-position-cart uk-background-active">{countProposal}</span>
            <img src="icons/iconmonstr-note-19-240-white.png" width="20" height="20" />
          </div>
        </div>
      )
    } else return null;
  }
}

const mapStateToProps = createStructuredSelector({
  countProposal: selectCountProposal
});

export default connect(mapStateToProps)(withRouter(CommonNotifyProposal));
