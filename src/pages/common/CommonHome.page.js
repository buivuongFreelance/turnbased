import React, { Component } from "react";
import GridWrapper from "../../components/grid/GridWrapper.component";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="uk-flex uk-flex-center uk-flex-middle" style={{ height: '100vh' }}>
        <GridWrapper />
      </div>
    )
  }
}

export default HomePage;
