import React, { Component } from "react";

class CommonButtonCircle extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="wc-btn-circle-wrapper"
        onClick={this.props.onClick}>
        <label type="button"
          htmlFor="toggle"
          {...this.props}
          className="wc-btn-circle">
          <img src={'icons/plus-white-24.png'} />
        </label>
      </div >
    )
  }
}

export default CommonButtonCircle;
