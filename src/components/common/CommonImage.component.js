import React, { Component } from "react";
import PropTypes from "prop-types";
import Konva from "konva";

class CommonImage extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.state = {
      image: null
    }
  }
  componentDidMount() {
    const { layer } = this.props;
    if (layer) {
      this.setImage();
    }
  }
  setImage() {
    const { x, y, scaleX, scaleY, offsetX, offsetY,
      width, height, src, layer, group, rotate } = this.props;

    const imageObj = new Image();
    imageObj.onload = () => {
      const temp = new Konva.Image({
        x, y, image: imageObj,
        width,
        height,
        scaleX,
        scaleY,
        offsetX,
        offsetY
      });
      if (rotate) {
        temp.rotation(rotate);
      }
      if (group) {
        group.add(temp);
      } else {
        layer.add(temp);
      }
      layer.batchDraw();
      this.setState({ image: temp });
    }
    imageObj.src = src;
  }
  render() {
    return (
      <div ref={this.mainRef} />
    )
  }
}

CommonImage.propTypes = {
  src: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number
}

export default CommonImage;
