import React, { Component } from "react";
import PropTypes from "prop-types";

import Popup from "reactjs-popup";
import { IS_MOBILE } from "../../config";

class CommonWindowConfirm extends Component {
  render() {
    const { message, onOk, onOpen, onClose, screenWidth, isOpen } = this.props;

    return (
      <Popup modal
        open={isOpen}
        onOpen={onOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: screenWidth === IS_MOBILE ? '70%' : '30%', border: 'none', padding: 0 }}>
        <div>
          <div className="uk-container">
            <div className="uk-flex uk-flex-middle uk-flex-center uk-padding-small">
              {message}
            </div>

            <div className="uk-flex uk-flex-middle uk-flex-center uk-padding-small">
              <button className="uk-button uk-button-small" onClick={() => onClose()}>No</button>
              <button className="uk-button uk-button-small uk-background-emphasis uk-margin-tiny-left"
                onClick={() => onOk(close)}>Yes</button>
            </div>
          </div>
        </div>
      </Popup>
    )
  }
}

CommonWindowConfirm.propTypes = {
  message: PropTypes.string.isRequired,
  screenWidth: PropTypes.any.isRequired
}

export default CommonWindowConfirm;
