import React, { Component } from "react";
import CommonSelect from "../common/CommonSelect.component";

import WorldOptions from "../../db/world";

class WorldSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: WorldOptions,
      value: ''
    }
  }
  render() {
    const { options, value } = this.state;

    return (
      <div>
        <CommonSelect options={options}
          value={value} placeholder="Choose The World" />
      </div>
    )
  }
}

export default WorldSelect;
