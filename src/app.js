import React, { Component } from "react";
import PanelWrapper from "./components/panelWrapper";

class App extends Component {
  render(){
    return (
      <div className="uk-flex uk-padding">
        <PanelWrapper position="left" />
        <PanelWrapper position="right" />
      </div>
    )
  }
}

export default App;