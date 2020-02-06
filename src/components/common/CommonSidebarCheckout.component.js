import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsOpenCheckoutList
} from "../../redux/screen/screen.selectors";
import { toggleCheckoutList } from "../../redux/screen/screen.actions";
import { slide as Menu } from "react-burger-menu";
import OrderCartCheckoutList from "../order/OrderCartCheckoutList.component";

class CommonSidebarCheckout extends Component {
  constructor(props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
  }
  onStateChange(state) {
    const { isOpen } = state;

    if (isOpen === false)
      this.props.toggleCheckoutList(false);
  }
  render() {
    return (
      <Menu
        pageWrapId="page-wrap"
        isOpen={this.props.isOpen}
        onStateChange={this.onStateChange}
        right
        width="70%">
        <div className="wc-sidebar-wrapper uk-container">
          <OrderCartCheckoutList
            onCheckout={() => {
              this.props.toggleCheckoutList(false);
            }} />
        </div>
      </Menu >
    )
  }
}
const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpenCheckoutList
});
const mapDispatchToProps = dispatch => ({
  toggleCheckoutList: status => dispatch(toggleCheckoutList(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CommonSidebarCheckout)
