import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsOpenFilterModal, selectCategoryTitle, selectCategoryIds, selectBrandIds, selectTypes, selectCondition,
  selectColorIds
} from "../../redux/screen/screen.selectors";
import { toggleFilterModal } from "../../redux/screen/screen.actions";
import { slide as Menu } from "react-burger-menu";
import CommonFilterCategory from "./CommonFilterCategory.component";
import { listDeviceAvailableStart } from "../../redux/device/device.action";
import { getCategoryParams } from "../../utils";
import { PAGER_LIMIT } from "../../config";

class CommonSidebarFilterCategory extends Component {
  constructor(props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
  }
  onStateChange(state) {
    const { isOpen } = state;

    if (isOpen === false)
      this.props.toggleFilterModal(false);
  }
  handleFilter() {
    this.props.toggleFilterModal(false);
    const { categoryTitle, categoryIds, brandIds, types, condition, colorIds, listDeviceAvailableStart } = this.props;
    const params = getCategoryParams({ title: categoryTitle, ids: categoryIds, brandIds, types, condition, colorIds });
    listDeviceAvailableStart(PAGER_LIMIT, 0, params);
  }
  render() {
    return (
      <Menu
        pageWrapId="page-wrap"
        isOpen={this.props.isOpen}
        onStateChange={this.onStateChange}
        width="70%">
        <div className="wc-sidebar-wrapper uk-container">
          <CommonFilterCategory onFilter={() => this.handleFilter()} />
        </div>
      </Menu >
    )
  }
}
const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpenFilterModal,
  categoryTitle: selectCategoryTitle,
  categoryIds: selectCategoryIds,
  brandIds: selectBrandIds,
  types: selectTypes,
  condition: selectCondition,
  colorIds: selectColorIds
});
const mapDispatchToProps = dispatch => ({
  toggleFilterModal: status => dispatch(toggleFilterModal(status)),
  listDeviceAvailableStart: (limit, offset, data) => dispatch(listDeviceAvailableStart({ limit, offset, params: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(CommonSidebarFilterCategory)
