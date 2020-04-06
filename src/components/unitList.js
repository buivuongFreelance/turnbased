import React, { Component } from "react";
import _ from "underscore";

import UnitListDB from "../db";
import UnitDetail from "./unitDetail";

class UnitList extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const stylePanel = {
      height: '550px',
      overflow: 'auto'
    }

    const { faction } = this.props;

    if(faction) {
      const { world, id } = faction;
      const UnitListDBReal = _.where(UnitListDB[world], { faction: id });
      const realList = _.sortBy(UnitListDBReal, 'level'); 
      
      return (
        <div style={stylePanel}>
          <div>
            <button type="button" className="uk-button uk-button-default uk-button-small"
              onClick={() => this.props.onBack()}>
              Back
            </button>
          </div>
          <div className="uk-flex uk-margin-top uk-flex-wrap">
            {
              realList.map((unit, index) => {
                return (
                  <div key={index} className="uk-flex uk-flex-bottom">
                    <UnitDetail {...unit} />
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default UnitList;