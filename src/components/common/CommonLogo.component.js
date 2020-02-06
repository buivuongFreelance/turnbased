import React, { Component } from "react";
import PropTypes from "prop-types";

class CommonLogo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { type } = this.props;

    let logoContent =
      (
        <div className="wc-logo-wrapper">
          <span className="wc-logo-text">
            Dingtoi
          </span>
        </div>
      )
    if (type === 'header')
      logoContent = (
        <div className="wc-logo-wrapper-white">
          DI
        </div>
      )
    else if (type === 'footer')
      logoContent = (
        <div className="wc-logo-inverse-wrapper">
          <span className="wc-logo-inverse-text">
            Dingtoi
          </span>
        </div>
      )

    return (
      <React.Fragment>
        {
          logoContent
        }
      </React.Fragment>
    )
  }
}

CommonLogo.propTypes = {
  type: PropTypes.string
}

export default CommonLogo;
