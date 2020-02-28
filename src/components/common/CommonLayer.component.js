import React, { Component } from "react";
import { Layer } from "konva";

class CommonLayer extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.state = {
      layer: null
    }
  }
  componentDidMount() {
    const { stage } = this.props;
    if (stage) {
      this.setLayer();
    }
  }
  setLayer() {
    const { stage } = this.props;
    const layer = new Layer();
    stage.add(layer);
    this.setState({
      layer
    });
  }
  render() {
    const { children } = this.props;
    const { layer } = this.state;

    return (
      <div ref={this.mainRef}>
        {
          layer
          &&
          children({ layer })
        }
      </div>
    )
  }
}

export default CommonLayer;
