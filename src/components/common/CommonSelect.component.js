import React, { Component } from "react";
import PropTypes from "prop-types";

import Select from "react-select";

class CommonSelect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Select
        {...this.props} />
    )
  }
}

CommonSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string
}

export default CommonSelect;
