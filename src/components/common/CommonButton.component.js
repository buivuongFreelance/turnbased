import React, { Component } from "react";
import PropTypes from "prop-types";


class CommonButton extends Component {
  constructor() {
    super();
  }
  render() {
    const { children, type } = this.props;

    /*let hoverable = false,
      hoverTextColor = '#fff',
      hoverBgColor = '#333',
      color = '#333',
      bgColor = '#fff';

    if (screenWidth === IS_PC) hoverable = true;

    switch (type) {
      case 'inverted':
        hoverTextColor = '#333';
        hoverBgColor = '#fff';
        color = '#fff';
        bgColor = '#333';
        break;
    }

    const Btn = posed.button({
      hoverable,
      hover: {
        backgroundColor: hoverBgColor,
        color: hoverTextColor
      },
      init: {
        backgroundColor: bgColor,
        color: color
      }
    });*/

    if (type !== 'inverted') {
      return (
        <button type={type === 'submit' ? 'submit' : 'button'}
          id={this.props.id}
          onClick={this.props.onClick}
          className={'wc-btn-white ' + this.props.className}>
          {children}
        </button>
      )
    } else {
      return (
        <button type={type === 'submit' ? 'submit' : 'button'}
          id={this.props.id}
          onClick={this.props.onClick}
          className={' ' + this.props.className}>
          {children}
        </button>
      )
    }
  }
}

CommonButton.propTypes = {
  type: PropTypes.string,
  screenWidth: PropTypes.string.isRequired
}

CommonButton.defaultProps = {
  type: 'default'
}

export default CommonButton;
