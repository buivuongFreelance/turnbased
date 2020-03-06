import React, { Component } from "react";
import _ from "underscore";
require('underscore-query')(_);

import FactionListDB from "../db/factions";

class FactionList extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      list: FactionListDB
    }
  }
  handleSearch(ev) {
    const { target: { value } } = ev;
    this.setState({
      search: value
    }, () => {
      if(!value)
        this.setState({ list: FactionListDB });
      else {
        const list = _.query(FactionListDB, { name: { $likeI: value } });
        this.setState({ list });
      }
    });
  }
  render(){
    const stylePanel = {
      height: '550px',
      overflow: 'auto'
    }

    const { search, list } = this.state;

    return (
      <div style={stylePanel}>
        <div>
          <input type="search" className="uk-input uk-width-medium uk-margin-bottom" placeholder="Search..."
            value={search} onChange={(ev) => this.handleSearch(ev)} />
        </div>
        <div className="uk-grid uk-grid-small uk-child-width-1-3">
          {
            list.map((faction, index) => {
              const { name } = faction;

              return (
                <div key={index}>
                  <button className="uk-button uk-button-primary uk-button-small"
                    onClick={() => this.props.onClick(faction)}>
                    {name}
                  </button>
                </div>
              )
            })    
          }
        </div>
      </div>
    )
  }
}

export default FactionList;