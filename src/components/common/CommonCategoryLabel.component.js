import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCategories, selectBrands } from "../../redux/device/device.selectors";
import { selectCategoryIds, selectCategoryTitle, selectBrandIds, selectTypes, selectColorIds, selectCondition } from "../../redux/screen/screen.selectors";
import { deleteCategoryId, changeFilterCondition, changeCategoryTitleValue } from "../../redux/screen/screen.actions";
import { COLOR_LIST } from "../../config";

class CommonCategoryLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        { id: '', name: 'All' },
        { id: 'sale', name: 'Sale' },
        { id: 'exchange', name: 'Exchange' }
      ],
      colors: COLOR_LIST
    }
  }
  clearLabel(item) {
    const { deleteCategoryId, changeFilterCondition, changeCategoryTitleValue } = this.props;
    if (item.type === 'condition')
      changeFilterCondition([0, 100]);
    else if (item.type === 'search') {
      changeCategoryTitleValue('');
      setTimeout(() => {
        if (this.props.clearSearch)
          this.props.clearSearch();
      }, 500);
    } else
      deleteCategoryId(item.type, item.id);
  }
  mapWithLabels(categoryIds, categories, type) {
    let arr = [];
    if (categoryIds.length > 0) {
      for (let id of categoryIds) {
        for (let cat of categories) {
          if (cat.id === id) {
            arr.push({ name: cat.name, id: cat.id, type: type });
            break;
          }
        }
      }
    }
    return arr;
  }
  render() {
    const { categoryTitle: { value: search },
      categoryIds, categories,
      brandIds, brands, types, colorIds, condition
    } = this.props;

    let arr = [];

    if (search) arr.push({ name: 'Search By: ' + search, type: 'search' });

    arr = arr.concat(this.mapWithLabels(categoryIds, categories, 'categoryIds'));
    arr = arr.concat(this.mapWithLabels(brandIds, brands, 'brandIds'));
    arr = arr.concat(this.mapWithLabels(types, this.state.types, 'types'));
    arr = arr.concat(this.mapWithLabels(colorIds, this.state.colors, 'colorIds'));

    if (condition.length === 2) {
      if (condition[0] === 0 && condition[1] === 100) {

      } else
        arr.push({ name: 'From ' + condition[0] + ' to ' + condition[1] + ' %', type: 'condition' });
    }

    return (
      <div className="uk-margin-small-top uk-text-small">
        {arr.map((item, index) => {
          return (
            <span key={index} className="uk-margin-small-right">
              <label className="uk-label uk-background-active uk-position-relative">
                <a className="uk-badge uk-position-top-right uk-position-cart"
                  onClick={() => this.clearLabel(item)}>
                  <i className="fa fa-close" />
                </a>
                {item.name}
              </label>
            </span>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categoryTitle: selectCategoryTitle,
  categoryIds: selectCategoryIds,
  categories: selectCategories,
  brandIds: selectBrandIds,
  brands: selectBrands,
  types: selectTypes,
  colorIds: selectColorIds,
  condition: selectCondition
});

const mapDispatchToProps = dispatch => ({
  deleteCategoryId: (field, value) => dispatch(deleteCategoryId(field, value)),
  changeFilterCondition: (condition) => dispatch(changeFilterCondition(condition)),
  changeCategoryTitleValue: (value) => dispatch(changeCategoryTitleValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonCategoryLabel);
