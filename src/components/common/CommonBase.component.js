import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { IS_MOBILE, IS_TABLET } from "../../config";

import CommonHeader from "./CommonHeader.component";
import SidebarNav from "./CommonSidebarNav.component";
import CommonFooter from "./CommonFooter.component";
import CommonSidebarFilterCategory from "./CommonSidebarFilterCategory.component";
import CommonSidebarSortCategory from "./CommonSidebarSortCategory.component";
import CommonSidebarCheckout from "./CommonSidebarCheckout.component";
import CommonNotifyProposal from "./CommonNotifyProposal.component";

class CommonBase extends Component {
  constructor() {
    super();
  }
  renderMobile() {
    return (
      <Fragment>
        <CommonHeader {...this.props} />
        <CommonNotifyProposal {...this.props} />
        <SidebarNav />
        <CommonSidebarFilterCategory />
        <CommonSidebarSortCategory />
        <CommonSidebarCheckout />
        <div id="page-wrap">
          <div className="wc-init"></div>
          {this.props.children}
          <CommonFooter {...this.props} />
        </div>
      </Fragment>
    )
  }
  renderTablet() {
    return (
      <Fragment>
        <CommonHeader {...this.props} />
        <CommonNotifyProposal {...this.props} />
        <SidebarNav />
        <div id="page-wrap">
          <div className="wc-init-extend"></div>
          {this.props.children}
          <CommonFooter {...this.props} />
        </div>
      </Fragment>
    )
  }
  renderPC() {
    return (
      <Fragment>
        <CommonHeader {...this.props} />
        <CommonNotifyProposal {...this.props} />
        <div id="page-wrap">
          <div className="wc-init-extend"></div>
          {this.props.children}
          <CommonFooter {...this.props} />
        </div>
      </Fragment>
    )
  }
  render() {
    const { screenWidth } = this.props;

    //const className = screenWidth === IS_PC ? 'wc-init-extend' : 'wc-init';

    switch (screenWidth) {
      case IS_MOBILE:
        return this.renderMobile();
        break;
      case IS_TABLET:
        return this.renderTablet();
      default:
        return this.renderPC();
        break;
    }
  }
}

CommonBase.propTypes = {
  screenWidth: PropTypes.string.isRequired,
  user: PropTypes.object
}

export default CommonBase;
