import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsOpenSortCategory, selectCategoryTitle, selectCategoryIds, selectBrandIds, selectTypes, selectCondition,
  selectColorIds
} from "../../redux/screen/screen.selectors";
import { toggleSortCategory } from "../../redux/screen/screen.actions";
import { listDeviceAvailableStart } from "../../redux/device/device.action";
import { slide as Menu } from "react-burger-menu";
import CommonSortCategory from "./CommonSortCategory.component";
import { getCategoryParams } from "../../utils";
import { PAGER_LIMIT } from "../../config";

class CommonSidebarSortCategory extends Component {
  constructor(props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
  }
  onStateChange(state) {
    const { isOpen } = state;
    if (isOpen === false)
      this.props.toggleSortCategory(false);
  }
  handleFilter() {
    const { categoryTitle, categoryIds, brandIds, types, listDeviceAvailableStart, condition, colorIds } = this.props;
    const params = getCategoryParams({ title: categoryTitle, ids: categoryIds, brandIds, types, condition, colorIds });
    listDeviceAvailableStart(PAGER_LIMIT, 0, params);
  }
  render() {
    return (
      <Menu
        pageWrapId="page-wrap"
        isOpen={this.props.isOpen}
        onStateChange={this.onStateChange}
        width="70%"
        right>
        <div className="wc-sidebar-wrapper uk-container">
          <CommonSortCategory onFilter={() => this.handleFilter()} />
        </div>
      </Menu >
    )
  }
}
const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpenSortCategory,
  categoryTitle: selectCategoryTitle,
  categoryIds: selectCategoryIds,
  brandIds: selectBrandIds,
  types: selectTypes,
  condition: selectCondition,
  colorIds: selectColorIds
});
const mapDispatchToProps = dispatch => ({
  toggleSortCategory: status => dispatch(toggleSortCategory(status)),
  listDeviceAvailableStart: (limit, offset, data) => dispatch(listDeviceAvailableStart({ limit, offset, params: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(CommonSidebarSortCategory)
