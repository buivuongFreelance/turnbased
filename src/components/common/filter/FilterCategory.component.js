import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingCategory, selectCategories } from "../../../redux/device/device.selectors";
import { selectCategoryIds } from "../../../redux/screen/screen.selectors";
import { addCategoryId, deleteCategoryId, deleteCategoryIdAll } from "../../../redux/screen/screen.actions";
import { listCategoryStart } from "../../../redux/device/device.action";
import CommonLoading from "../CommonLoading.component";
import { removeItemArray } from "../../../utils";
import { NODE_ENV } from "../../../config";

class FilterCategoryType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChecked: []
    }
  }

  componentDidMount() {
    const { listCategoryStart, categoryIds } = this.props;
    this.setState({
      selectedChecked: categoryIds
    });
    listCategoryStart(40, 0);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.categoryIds) !== JSON.stringify(this.props.categoryIds)) {
      if (NODE_ENV === 'development')
        console.log('---------------------------UPDATE FILTER MAIN CATEGORY -------------------');
      this.setState({
        selectedChecked: this.props.categoryIds
      }, () => {
        this.props.onFilter();
      });
    }
  }

  handleChangeAll(ev) {
    const { currentTarget: { checked } } = ev;
    if (checked) {
      const { deleteCategoryIdAll } = this.props;

      this.setState({ selectedChecked: [] }, () => {
        deleteCategoryIdAll('categoryIds');
      });
    }
  }

  handleChangeItem(ev) {
    const { currentTarget: { checked, value } } = ev;
    const { addCategoryId, deleteCategoryId } = this.props;

    let selectedChecked = Object.assign([], this.state.selectedChecked);

    if (checked) {
      selectedChecked.push(value);
      this.setState({ selectedChecked }, () => {
        addCategoryId('categoryIds', value);
      });
    } else {
      const selectedCheckedNew = removeItemArray(value, selectedChecked);
      this.setState({ selectedChecked: selectedCheckedNew }, () => {
        deleteCategoryId('categoryIds', value);
      });
    }
  }
  render() {
    const { categories, loadingCategory } = this.props;
    const { selectedChecked } = this.state;

    return (
      <div className="uk-position-relative">
        {loadingCategory && <CommonLoading />}
        <ul className="uk-list">
          <li className="uk-cursor wc-label-item">
            <label><input className="uk-checkbox uk-margin-right" type="checkbox" name="category" value=""
              checked={selectedChecked.length === 0}
              onChange={(ev) => this.handleChangeAll(ev)} /> All</label>
          </li>
          {
            categories.map((category) => {
              return (
                <li className="uk-cursor wc-label-item" key={category.id}>
                  <label>
                    <input className="uk-checkbox uk-margin-right" type="checkbox" name="category" value={category.id}
                      checked={selectedChecked.includes(category.id)}
                      onChange={(ev) => this.handleChangeItem(ev)} />
                    {category.name}
                  </label>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loadingCategory: selectLoadingCategory,
  categoryIds: selectCategoryIds,
  categories: selectCategories
});

const mapDispatchToProps = dispatch => ({
  listCategoryStart: (limit, offset) => dispatch(listCategoryStart({ limit, offset })),
  addCategoryId: (field, value) => dispatch(addCategoryId(field, value)),
  deleteCategoryId: (field, value) => dispatch(deleteCategoryId(field, value)),
  deleteCategoryIdAll: (field) => dispatch(deleteCategoryIdAll(field))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategoryType);
