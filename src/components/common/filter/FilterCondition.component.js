import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCondition } from "../../../redux/screen/screen.selectors";
import { changeFilterCondition } from "../../../redux/screen/screen.actions";

import { NODE_ENV } from "../../../config";
import Slider, { Range } from "rc-slider";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeWithTooltip = createSliderWithTooltip(Range);

class FilterCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValue: [0, 100]
    }
  }

  componentDidMount() {
    const { condition } = this.props;
    this.setState({
      rangeValue: condition
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.condition) !== JSON.stringify(this.props.condition)) {
      if (NODE_ENV === 'development')
        console.log('---------------------------UPDATE FILTER MAIN CONDITION -------------------');
      this.setState({
        rangeValue: this.props.condition
      }, () => {
        this.props.onFilter();
      });
    }
  }

  handleChange(value) {
    this.setState({ rangeValue: value }, () => {
      setTimeout(() => {
        this.props.changeFilterCondition(this.state.rangeValue);
      }, 500);
    });
  }
  render() {
    const { rangeValue } = this.state;

    return (
      <div className="uk-position-relative">
        <RangeWithTooltip step={10}
          allowCross={false}
          value={rangeValue}
          onChange={(value) => this.handleChange(value)}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  condition: selectCondition
});

const mapDispatchToProps = dispatch => ({
  changeFilterCondition: (condition) => dispatch(changeFilterCondition(condition))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCondition);
