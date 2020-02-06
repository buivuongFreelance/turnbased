import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectTypes, selectScreenWidth, selectTranslator } from "../../../redux/screen/screen.selectors";
import { addCategoryId, deleteCategoryId, deleteCategoryIdAll, changeCategoryId } from "../../../redux/screen/screen.actions";
import { removeItemArray } from "../../../utils";

class FilterMyDeviceType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    }
  }

  componentDidMount() {
    const { defaultValue } = this.props;

    if (defaultValue)
      this.setState({
        selectedValue: defaultValue
      });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.types) !== JSON.stringify(this.props.types)) {
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
  handleChange(value) {
    this.setState({
      selectedValue: value
    }, () => {
      this.props.onChange(value);
    });
  }
  renderSelect() {
    const { selectedValue } = this.state;
    const { translator } = this.props;
    const options = [
      { value: '', label: translator.translate('title_all') },
      { value: 'no', label: translator.translate('title_no_available') },
      { value: 'sale', label: translator.translate('title_available_sale') },
      { value: 'exchange', label: translator.translate('title_available_exchange') }
    ];

    return (
      <div className="uk-width-auto">
        <select value={selectedValue}
          className="uk-select"
          onChange={(ev) => this.handleChange(ev.target.value)}>
          {
            options.map((item, index) => {
              return (
                <option key={index} value={item.value}>{item.label}</option>
              )
            })
          }
        </select>
      </div>
    )
  }
  render() {
    const { selectedValue } = this.state;
    const { type, translator } = this.props;

    if (type === 'select') {
      return this.renderSelect();
    } else {
      return (
        <div className="uk-position-relative">
          <ul className="uk-list">
            <li className="uk-cursor wc-label-item">
              <label><input className="uk-radio uk-margin-right" type="radio" name="types" value=""
                checked={selectedValue === ''}
                onChange={(ev) => this.handleChange(ev.target.value)} /> {translator.translate('title_all')}</label>
            </li>
            <li className="uk-cursor wc-label-item">
              <label>
                <input className="uk-radio uk-margin-right" type="radio" name="types" value="no"
                  checked={selectedValue === 'no'}
                  onChange={(ev) => this.handleChange(ev.target.value)} />
                {translator.translate('title_no_available')}
              </label>
            </li>
            <li className="uk-cursor wc-label-item">
              <label>
                <input className="uk-radio uk-margin-right" type="radio" name="types" value="sale"
                  checked={selectedValue === 'sale'}
                  onChange={(ev) => this.handleChange(ev.target.value)} />
                {translator.translate('title_available_sale')}
              </label>
            </li>
            <li className="uk-cursor wc-label-item">
              <label>
                <input className="uk-radio uk-margin-right" type="radio" name="types" value="exchange"
                  checked={selectedValue === 'exchange'}
                  onChange={(ev) => this.handleChange(ev.target.value)} />
                {translator.translate('title_available_exchange')}
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
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  addCategoryId: (field, value) => dispatch(addCategoryId(field, value)),
  changeCategoryId: (field, value) => dispatch(changeCategoryId(field, value)),
  deleteCategoryId: (field, value) => dispatch(deleteCategoryId(field, value)),
  deleteCategoryIdAll: (field) => dispatch(deleteCategoryIdAll(field))
});

FilterMyDeviceType.defaultProps = {
  type: 'default'
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMyDeviceType);
