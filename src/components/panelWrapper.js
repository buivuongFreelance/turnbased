import React, { Component } from "react";
import FactionList from "./factionList";
import UnitList from "./unitList";

class PanelWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      faction: null,
      mode: 'faction'
    }
  }
  render(){
    const { position } = this.props;

    const stylePanel = {
      width: '100%',
      borderLeft: position === 'right' && '1px solid black',
      paddingLeft: position === 'right' && '20px'
    }

    const { mode, faction } = this.state;

    if(mode === 'faction'){
      return (
        <div style={stylePanel}>
          <FactionList onClick={(faction) => this.setState({ faction, mode: 'units' })} />
        </div>
      )
    } else {
      return (
        <div style={stylePanel}>
          <UnitList faction={faction} onBack={() => this.setState({faction: null, mode: 'faction'})} />
        </div>
      )
    }
  }
}

export default PanelWrapper;