import React, { Component } from "react";
import PropTypes from "prop-types";

import Popup from "reactjs-popup";
import { IS_MOBILE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class CommonModalConfirm extends Component {
  render() {
    const { trigger, message, onOk, onOpen, onClose, screenWidth, translator } = this.props;

    return (
      <Popup trigger={trigger} modal
        onOpen={onOpen}
        onClose={onClose}
        contentStyle={{ width: screenWidth === IS_MOBILE ? '70%' : '30%', border: 'none', padding: 0 }}>
        {
          close => (
            <div>
              <div className="uk-container">
                <div className="uk-flex uk-flex-middle uk-flex-center uk-padding-small">
                  {message}
                </div>

                <div className="uk-flex uk-flex-middle uk-flex-center uk-padding-small">
                  <button className="uk-button uk-button-small" onClick={() => close()}>
                    {translator.translate('btn_no')}
                  </button>
                  <button className="uk-button uk-button-small uk-background-emphasis uk-margin-tiny-left"
                    onClick={() => onOk(close)}>
                    {translator.translate('btn_yes')}
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </Popup>
    )
  }
}

CommonModalConfirm.propTypes = {
  trigger: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  screenWidth: PropTypes.any.isRequired
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default connect(mapStateToProps)(CommonModalConfirm);
