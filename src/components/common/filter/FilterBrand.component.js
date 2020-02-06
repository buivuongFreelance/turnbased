import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingBrand, selectBrands } from "../../../redux/device/device.selectors";
import { selectBrandIds } from "../../../redux/screen/screen.selectors";
import { addCategoryId, deleteCategoryId, deleteCategoryIdAll } from "../../../redux/screen/screen.actions";
import { listBrandStart } from "../../../redux/device/device.action";
import CommonLoading from "../CommonLoading.component";
import { removeItemArray } from "../../../utils";
import { NODE_ENV } from "../../../config";

class FilterBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChecked: []
    }
  }

  componentDidMount() {
    const { listBrandStart, brandIds } = this.props;
    this.setState({
      selectedChecked: brandIds
    });
    listBrandStart(40, 0);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.brandIds) !== JSON.stringify(this.props.brandIds)) {
      if (NODE_ENV === 'development')
        console.log('---------------------------UPDATE FILTER MAIN BRAND -------------------');
      this.setState({
        selectedChecked: this.props.brandIds
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
        deleteCategoryIdAll('brandIds');
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
        addCategoryId('brandIds', value);
      });
    } else {
      const selectedCheckedNew = removeItemArray(value, selectedChecked);
      this.setState({ selectedChecked: selectedCheckedNew }, () => {
        deleteCategoryId('brandIds', value);
      });
    }
  }
  render() {
    const { brands, loadingBrand } = this.props;
    const { selectedChecked } = this.state;

    return (
      <div className="uk-position-relative">
        {loadingBrand && <CommonLoading />}
        <ul className="uk-list">
          <li className="uk-cursor wc-label-item">
            <label><input className="uk-checkbox uk-margin-right" type="checkbox" name="brand" value=""
              checked={selectedChecked.length === 0}
              onChange={(ev) => this.handleChangeAll(ev)} /> All</label>
          </li>
          {
            brands.map((brand) => {
              return (
                <li className="uk-cursor wc-label-item" key={brand.id}>
                  <label>
                    <input className="uk-checkbox uk-margin-right" type="checkbox" name="brand" value={brand.id}
                      checked={selectedChecked.includes(brand.id)}
                      onChange={(ev) => this.handleChangeItem(ev)} />
                    {brand.name}
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
  loadingBrand: selectLoadingBrand,
  brandIds: selectBrandIds,
  brands: selectBrands
});

const mapDispatchToProps = dispatch => ({
  listBrandStart: (limit, offset) => dispatch(listBrandStart({ limit, offset })),
  addCategoryId: (field, value) => dispatch(addCategoryId(field, value)),
  deleteCategoryId: (field, value) => dispatch(deleteCategoryId(field, value)),
  deleteCategoryIdAll: (field) => dispatch(deleteCategoryIdAll(field))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBrand);
