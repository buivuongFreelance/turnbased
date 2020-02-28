import React, { Component } from "react";
import PropTypes from "prop-types";
import { Stage } from "konva";

class CommonStage extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.state = {
      stage: null
    }
  }
  componentDidMount() {
    this.setStage();
  }
  setStage() {
    const { width, height } = this.props;
    const realWidth = width ? width : window.innerWidth;
    const realHeight = height ? height : window.innerHeight;

    const stage = new Stage({
      container: this.mainRef.current,
      width: realWidth,
      height: realHeight
    });
    this.setState({ stage });
  }
  render() {
    const { stage } = this.state;
    const { children } = this.props;

    return (
      <div ref={this.mainRef}>
        {
          stage
          &&
          children({ stage })
        }
      </div>
    )
  }
}

CommonStage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default CommonStage;
