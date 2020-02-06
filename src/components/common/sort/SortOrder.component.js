import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth, selectCategoryTitle } from "../../../redux/screen/screen.selectors";

import { toggleSortCategory, changeCategoryTitle } from "../../../redux/screen/screen.actions";

import CommonSelect from "../CommonSelect.component";
import { IS_MOBILE, SORT_BY, NODE_ENV } from "../../../config";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

class SortOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOptions: [
        { value: 'bestMatch', label: SORT_BY['bestMatch'] },
        { value: 'asc', label: SORT_BY['asc'] },
        { value: 'desc', label: SORT_BY['desc'] }
      ],
      sortValue: 'bestMatch',
      selectedChecked: 'bestMatch'
    }
  }
  componentDidMount() {
    const { screenWidth, title } = this.props;
    if (screenWidth === IS_MOBILE) {
      this.setState({
        selectedChecked: title.type
      });
    } else {
      this.setState({
        sortValue: title.type
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.title.type !== this.props.title.type) {
      if (NODE_ENV === 'development')
        console.log('---------------------------UPDATE FILTER SORT CATEGORY -------------------');
      this.props.onFilter();
    }
  }
  handleChangePC(value) {
    const { changeCategoryTitle } = this.props;
    this.setState({ sortValue: value }, () => {
      changeCategoryTitle(value);
    })
  }
  handleChangeChecked(ev) {
    const { changeCategoryTitle, toggleSortCategory } = this.props;
    this.setState({ selectedChecked: ev.currentTarget.value }, () => {
      toggleSortCategory(false);
      changeCategoryTitle(this.state.selectedChecked);
    });
  }
  renderMobile() {
    const { selectedChecked } = this.state;

    return (
      <div className="uk-text-small">
        <Accordion allowMultipleExpanded={true}
          preExpanded={
            ['sort']
          }>
          <AccordionItem uuid="sort">
            <AccordionItemHeading>
              <AccordionItemButton>
                Sort By
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ul className="uk-list">
                <li className="uk-cursor">
                  <label><input className="uk-radio uk-margin-right" type="radio" name="sort"
                    checked={selectedChecked === 'bestMatch'}
                    onChange={(ev) => this.handleChangeChecked(ev)}
                    value="bestMatch" /> Best Match</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-radio uk-margin-right" type="radio" name="sort"
                    checked={selectedChecked === 'asc'}
                    onChange={(ev) => this.handleChangeChecked(ev)}
                    value="asc" /> A To Z</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-radio uk-margin-right" type="radio" name="sort"
                    checked={selectedChecked === 'desc'}
                    onChange={(ev) => this.handleChangeChecked(ev)}
                    value="desc" /> Z To A</label>
                </li>
              </ul>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  renderPC() {
    const { screenWidth } = this.props;
    const { sortOptions, sortValue } = this.state;
    return (
      <div className="uk-width-small">
        <CommonSelect
          value={sortValue}
          placeholder="Sort By"
          screenWidth={screenWidth}
          onChange={(value) => this.handleChangePC(value)}
          options={sortOptions}
        />
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE) {
      return this.renderMobile()
    } else
      return this.renderPC()
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  title: selectCategoryTitle
});

const mapDispatchToProps = dispatch => ({
  changeCategoryTitle: (title) => dispatch(changeCategoryTitle(title)),
  toggleSortCategory: (status) => dispatch(toggleSortCategory(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortOrder);

