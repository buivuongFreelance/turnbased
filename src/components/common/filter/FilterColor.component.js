import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectColorIds } from "../../../redux/screen/screen.selectors";
import { addCategoryId, deleteCategoryId, deleteCategoryIdAll } from "../../../redux/screen/screen.actions";
import { removeItemArray } from "../../../utils";
import { NODE_ENV, COLOR_LIST } from "../../../config";

class FilterColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChecked: [],
      listColor: COLOR_LIST
    }
  }

  componentDidMount() {
    const { colorIds } = this.props;
    this.setState({
      selectedChecked: colorIds
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.colorIds) !== JSON.stringify(this.props.colorIds)) {
      if (NODE_ENV === 'development')
        console.log('---------------------------UPDATE FILTER COLOR -------------------');
      this.setState({
        selectedChecked: this.props.colorIds
      }, () => {
        this.props.onFilter();
      });
    }
  }

  handleChangeAll() {
    const { deleteCategoryIdAll } = this.props;

    this.setState({ selectedChecked: [] }, () => {
      deleteCategoryIdAll('colorIds');
    });

  }

  handleChangeItem(color) {
    const { addCategoryId, deleteCategoryId } = this.props;
    const { id: value } = color;

    let selectedChecked = Object.assign([], this.state.selectedChecked);

    if (!selectedChecked.includes(value)) {
      selectedChecked.push(value);
      this.setState({ selectedChecked }, () => {
        addCategoryId('colorIds', value);
      });
    } else {
      const selectedCheckedNew = removeItemArray(value, selectedChecked);
      this.setState({ selectedChecked: selectedCheckedNew }, () => {
        deleteCategoryId('colorIds', value);
      });
    }
  }
  render() {
    const { selectedChecked } = this.state;

    return (
      <div className="uk-margin-small-bottom">
        <div className="wc-list-color uk-flex uk-flex-wrap">
          {
            this.state.listColor.map(color => {
              let classItem = ['wc-item-color'];
              if (selectedChecked.includes(color.id))
                classItem.push('active');
              return (
                <div className={classItem.join(' ')} key={color.id} style={{ backgroundColor: color.name }}
                  onClick={() => this.handleChangeItem(color)}></div>
              )
            })
          }
        </div>
        {
          selectedChecked.length > 0
          &&
          <div className="uk-text-small uk-text-active uk-cursor"
            onClick={() => this.handleChangeAll()}>
            Clear All
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  colorIds: selectColorIds
});

const mapDispatchToProps = dispatch => ({
  addCategoryId: (field, value) => dispatch(addCategoryId(field, value)),
  deleteCategoryId: (field, value) => dispatch(deleteCategoryId(field, value)),
  deleteCategoryIdAll: (field) => dispatch(deleteCategoryIdAll(field))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterColor);
