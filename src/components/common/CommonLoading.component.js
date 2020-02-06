import React, { Component } from "react";

import { ClipLoader } from "react-spinners";

class CommonLoading extends Component {
  constructor() {
    super();
  }
  render() {
    const { size, color, classNameOverlay } = this.props;
    let classNameOverlayInit = 'uk-overlay-default uk-position-cover';

    if (classNameOverlay)
      classNameOverlayInit = classNameOverlay;

    return (
      <div className={classNameOverlayInit}>
        <div className="uk-position-center">
          <ClipLoader
            sizeUnit={"px"}
            size={size}
            color={color}
            loading={true}
          />
        </div>
      </div>
    )
  }
}

CommonLoading.defaultPropTypes = {
  size: 120,
  color: '#999999'
}

export default CommonLoading;
