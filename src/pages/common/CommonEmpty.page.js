import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";
import CommonPageHolder from "../../components/common/CommonPageHolder.component";

class Empty extends Component {
  render() {
    return (
      <div>
        <CommonPageHolder />
      </div>
    )
  }
}

export default withApp(Empty);
