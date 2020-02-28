import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import CommonGroup from "./CommonGroup.component";
import CommonImage from "./CommonImage.component";

class CommonCharacter extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
  }
  renderLeft(groupAttrs) {
    const { left } = this.props;
    if (left) {
      const { url, scale } = left;
      return (
        <CommonImage
          src={url}
          x={0} y={0}
          scaleX={scale}
          scaleY={scale}
          rotate={-120}
          {...groupAttrs}
        />
      )
    }
  }
  renderRight(groupAttrs) {
    const { right } = this.props;
    if (right) {
      const { url, scale } = right;
      return (
        <CommonImage
          src={url}
          x={50} y={0}
          scaleX={-scale}
          scaleY={scale}
          rotate={0}
          {...groupAttrs}
        />
      )
    }
  }
  render() {
    const { character } = this.props;

    if (character) {
      const { url: characterUrl, scale: characterScale } = character;

      return (
        <div ref={this.mainRef}>
          <CommonGroup {...this.props}
            draggable>
            {
              (groupAttrs) => (
                <Fragment>
                  {
                    this.renderLeft(groupAttrs)
                  }
                  <CommonImage
                    src={characterUrl}
                    x={0} y={30}
                    scaleX={characterScale}
                    scaleY={characterScale}
                    {...groupAttrs}
                  />
                  {
                    this.renderRight(groupAttrs)
                  }
                </Fragment>
              )
            }
          </CommonGroup>
        </div>
      )
    } else return null;
  }
}

CommonCharacter.propTypes = {
  draggable: PropTypes.bool,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  left: PropTypes.object
}

export default CommonCharacter;
