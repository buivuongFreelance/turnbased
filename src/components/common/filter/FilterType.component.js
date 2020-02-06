import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectTypes, selectScreenWidth } from "../../../redux/screen/screen.selectors";
import { addCategoryId, deleteCategoryId, deleteCategoryIdAll, changeCategoryId } from "../../../redux/screen/screen.actions";
import { removeItemArray } from "../../../utils";
import { NODE_ENV } from "../../../config";
import CommonSelect from "../CommonSelect.component";

class FilterType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChecked: [],
      valueTypeSelect: ''
    }
  }

  componentDidMount() {
    const { types } = this.props;
    this.setState({
      selectedChecked: types
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.types) !== JSON.stringify(this.props.types)) {
      if (NODE_ENV === 'development')
        console.log('---------------------------UPDATE FILTER MAIN TYPES -------------------');
      this.setState({
        selectedChecked: this.props.types
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
        deleteCategoryIdAll('types');
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
        addCategoryId('types', value);
      });
    } else {
      const selectedCheckedNew = removeItemArray(value, selectedChecked);
      this.setState({ selectedChecked: selectedCheckedNew }, () => {
        deleteCategoryId('types', value);
      });
    }
  }
  handleChangeSelect(value) {
    const { changeCategoryId, deleteCategoryIdAll } = this.props;

    this.setState({ valueTypeSelect: value }, () => {
      if (value) {
        changeCategoryId('types', [value]);
      } else {
        deleteCategoryIdAll('types');
      }
    });
  }
  renderSelect() {
    const { screenWidth } = this.props;
    const { valueTypeSelect } = this.state;
    const options = [
      { value: '', label: 'All' },
      { value: 'sale', label: 'Sale' },
      { value: 'exchange', label: 'Exchange' }
    ];

    return (
      <div className="uk-width-small">
        <CommonSelect
          value={valueTypeSelect}
          placeholder="Select Type"
          screenWidth={screenWidth}
          onChange={(value) => this.handleChangeSelect(value)}
          options={options}
        />
      </div>
    )
  }
  render() {
    const { selectedChecked } = this.state;
    const { type } = this.props;

    if (type === 'select') {
      return this.renderSelect();
    } else {
      return (
        <div className="uk-position-relative">
          <ul className="uk-list">
            <li className="uk-cursor wc-label-item">
              <label><input className="uk-checkbox uk-margin-right" type="checkbox" name="types" value=""
                checked={selectedChecked.length === 0}
                onChange={(ev) => this.handleChangeAll(ev)} /> All</label>
            </li>
            <li className="uk-cursor wc-label-item">
              <label>
                <input className="uk-checkbox uk-margin-right" type="checkbox" name="types" value="sale"
                  checked={selectedChecked.includes('sale')}
                  onChange={(ev) => this.handleChangeItem(ev)} />
                Sale
              </label>
            </li>
            <li className="uk-cursor wc-label-item">
              <label>
                <input className="uk-checkbox uk-margin-right" type="checkbox" name="types" value="exchange"
                  checked={selectedChecked.includes('exchange')}
                  onChange={(ev) => this.handleChangeItem(ev)} />
                Exchange
              </label>
            </li>
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = createStructuredSelector({
  types: selectTypes,
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  addCategoryId: (field, value) => dispatch(addCategoryId(field, value)),
  changeCategoryId: (field, value) => dispatch(changeCategoryId(field, value)),
  deleteCategoryId: (field, value) => dispatch(deleteCategoryId(field, value)),
  deleteCategoryIdAll: (field) => dispatch(deleteCategoryIdAll(field))
});

FilterType.defaultProps = {
  type: 'default'
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterType);
