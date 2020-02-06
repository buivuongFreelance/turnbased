import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { IS_MOBILE } from "../../config";

import SortOrder from "./sort/SortOrder.component";

class CommonSortCategory extends Component {
  constructor(props) {
    super(props);
  }
  renderMobile() {
    return (
      <SortOrder onFilter={this.props.onFilter} />
    )
  }
  renderPC() {
    return (
      <div className="uk-background-light uk-padding-tiny uk-flex uk-flex-between uk-flex-middle">
        <div />
        <SortOrder onFilter={this.props.onFilter} />
      </div >
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE) {
      return this.renderMobile()
    } else
      return this.renderPC()
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth
});

export default connect(mapStateToProps)(CommonSortCategory);

