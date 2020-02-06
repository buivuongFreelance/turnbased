import React, { Component } from "react";
import PropTypes from "prop-types";

import Image from "react-image";

class CommonImage extends Component {
  render() {
    const { url, replace_loader, replace_unloader, width } = this.props;

    return (
      <Image key={'image'} src={[
        url,
      ]}
        {...this.props}
        loader={replace_loader ? replace_loader : <img src="images/noimage.png" {...this.props} width={width ? width : 'auto'} />}
        unloader={replace_unloader ? replace_unloader : <img src="images/noimage.png" {...this.props} width={width ? width : 'auto'} />}
      />
    )
  }
}

CommonImage.propTypes = {
  url: PropTypes.string,
  replace_loader: PropTypes.element,
  replace_unloader: PropTypes.element
}

export default CommonImage;
