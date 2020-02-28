import React, { Component } from "react";
import PropTypes from "prop-types";
import { Group } from "konva";

class CommonGroup extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.state = {
      group: null
    }
  }
  componentDidMount() {
    const { layer } = this.props;
    if (layer) {
      this.setGroup();
    }
  }
  setGroup() {
    const { layer, draggable, x, y } = this.props;
    const group = new Group({
      draggable,
      x, y
    });
    layer.add(group);
    this.setState({ group });
  }
  render() {
    const { group } = this.state;
    const { children, layer } = this.props;

    return (
      <div ref={this.mainRef}>
        {
          group
          &&
          children({ layer, group })
        }
      </div>
    )
  }
}

CommonGroup.propTypes = {
  draggable: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number
}

export default CommonGroup;
