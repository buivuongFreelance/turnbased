import React, { Component } from "react";
import PropTypes from "prop-types";

class CommonHeaderWrapper extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

  }
  componentDidMount() {
    if (this.props.isClickOutside)
      document.addEventListener('mousedown', this.handleClickOutside, false);
  }
  componentDidUpdate() {
    if (this.props.isClickOutside)
      document.addEventListener('mousedown', this.handleClickOutside, false);
  }
  componentWillUnmount() {
    if (this.props.isClickOutside)
      document.removeEventListener('mousedown', this.handleClickOutside, false);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(ev) {
    if (this.wrapperRef && !this.wrapperRef.contains(ev.target)) {
      if (this.props.isClickOutside)
        this.props.onClickOutside();
    }
  }
  render() {
    const { children, style } = this.props;

    return (
      <div className="wc-navbar-wrapper" ref={this.setWrapperRef}
        style={style}>
        <div className="uk-container">
          <div className="uk-flex uk-flex-between wc-navbar-inner">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

CommonHeaderWrapper.propTypes = {
  onClickOutside: PropTypes.func
}

export default CommonHeaderWrapper;
