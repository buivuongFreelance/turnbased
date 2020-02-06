import React, { Component } from "react";
import { Switch } from "react-router-dom";

import { renderRoutes } from "react-router-config";
import Routes from "./routes";

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          {renderRoutes(Routes)}
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
