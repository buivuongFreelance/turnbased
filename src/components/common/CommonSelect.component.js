import React, { Component } from "react";
import PropTypes from "prop-types";

class CommonSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    }
  }
  componentDidMount() {
    this.setState({ selectedValue: this.props.value });
  }
  render() {
    const { options, id, name, selectedValue, onChange } = this.props;

    return (
      <select className="uk-select"
        onChange={(ev) => {
          const value = ev.target.value;
          this.setState({ selectedValue: value }, () => {
            onChange(value);
          });
        }}
        value={selectedValue}>
        {
          options.map((option, index) => {
            return (
              <option key={index} value={option[id]}>
                {option[name]}
              </option>
            )
          })
        }
      </select>
    )
  }
}

CommonSelect.propTypes = {
  screenWidth: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

CommonSelect.defaultProps = {
  id: 'value',
  name: 'label'
}

export default CommonSelect;

