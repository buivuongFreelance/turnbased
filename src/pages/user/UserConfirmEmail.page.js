import React, { Component } from "react";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { selectConfirmEmail } from "../../redux/user/user.selectors";

import { confirmEmailStart } from "../../redux/user/user.actions";

import { createStructuredSelector } from "reselect";

import withApp from "../../hoc/withApp.hoc";

class UserConfirmEmail extends Component {
  componentDidMount() {
    const { confirmEmailStart, history, match: { params: { activeCode } } } = this.props;
    confirmEmailStart(activeCode, history);
  }
  render() {
    return (
      <div>Activating Your Account...</div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  confirmEmail: selectConfirmEmail
});

const mapDispatchToProps = dispatch => ({
  confirmEmailStart: (activeCode, history) => dispatch(confirmEmailStart({ activeCode, history }))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(UserConfirmEmail)));
