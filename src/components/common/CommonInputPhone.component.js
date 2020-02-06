import React, { Component } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { PRE_PHONE } from "../../config";

class CommonInputPhone extends Component {
  render() {
    const { country } = this.props;

    let format = '';

    switch (country) {
      case 1:
        format = PRE_PHONE.CAN;
        break;
      case 2:
        format = PRE_PHONE.USA;
        break;
      case 3:
        format = PRE_PHONE.MEX;
        break;
    }

    return (
      <div>
        <NumberFormat {...this.props}
          format={format}
        />
      </div>
    )
  }
}

CommonInputPhone.propTypes = {
  country: PropTypes.number
}

CommonInputPhone.defaultProps = {
  country: 1
}

export default CommonInputPhone;
