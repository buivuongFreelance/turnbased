import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import FilterCategoryComponent from "./filter/FilterCategory.component";
import FilterBrand from "./filter/FilterBrand.component";
import FilterType from "./filter/FilterType.component";
import FilterCondition from "./filter/FilterCondition.component";
import FilterColor from "./filter/FilterColor.component";

class FilterCategory extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="uk-text-small">
        <Accordion allowMultipleExpanded={true}
          preExpanded={
            ['categories', 'brand', 'type', 'color', 'capacity', 'ram', 'condition']
          }>
          <AccordionItem uuid="categories">
            <AccordionItemHeading>
              <AccordionItemButton>
                Categories
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <FilterCategoryComponent onFilter={this.props.onFilter} />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="brand">
            <AccordionItemHeading>
              <AccordionItemButton>
                Brand
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <FilterBrand onFilter={this.props.onFilter} />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="type">
            <AccordionItemHeading>
              <AccordionItemButton>
                Type
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <FilterType onFilter={this.props.onFilter} />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="color">
            <AccordionItemHeading>
              <AccordionItemButton>
                Color
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <FilterColor onFilter={this.props.onFilter} />
            </AccordionItemPanel>
          </AccordionItem>
          {/*<AccordionItem uuid="capacity">
            <AccordionItemHeading>
              <AccordionItemButton>
                Capacity
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ul className="uk-list">
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 256GB</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 128GB</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 64GB</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 32GB</label>
                </li>
              </ul>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="ram">
            <AccordionItemHeading>
              <AccordionItemButton>
                Ram
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ul className="uk-list">
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 1GB</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 2GB</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 3GB</label>
                </li>
                <li className="uk-cursor">
                  <label><input className="uk-checkbox uk-margin-right" type="checkbox" /> 4GB</label>
                </li>
              </ul>
            </AccordionItemPanel>
        </AccordionItem>*/}
          <AccordionItem uuid="condition">
            <AccordionItemHeading>
              <AccordionItemButton>
                Condition
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <FilterCondition onFilter={this.props.onFilter} />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth
});

export default connect(mapStateToProps)(FilterCategory);

