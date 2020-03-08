import React, { Component } from "react";
import _ from "underscore";
require('underscore-query')(_);
import ud from "underscore";

import FactionListDB from "../db/factions";
import WorldListDB from "../db/world";

class FactionList extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      world: '',
      sort: 'name',
      list: []
    }
  }
  componentDidMount(){
    this.resetList(FactionListDB);
  }
  resetList(listMap) {
    const list = ud.sortBy(listMap, 'name');
    this.setState({ list });
  }
  handleSelectSort(ev) {
    const { target: { value } } = ev;
    const { world, search } = this.state;
    this.setState({
      sort: value
    }, () => {
      if(value === 'name') {
        const list = _.query(FactionListDB, { 
          world: { $like: world },
          name: { $likeI: search }
        });
        this.resetList(list);
      } else if(value === 'usu') {
        const list = _.query(FactionListDB, { 
          world: { $like: world },
          name: { $likeI: search }
        });
        const realList = ud.sortBy(list, 'count').reverse();
        this.setState({ list: realList });
      } else if(value === 'usd') {
        const list = _.query(FactionListDB, { 
          world: { $like: world },
          name: { $likeI: search }
        });
        const realList = ud.sortBy(list, 'count');
        this.setState({ list: realList });
      }
    });
  }
  handleSelectWorld(ev) {
    const { target: { value } } = ev;
    const { search } = this.state;
    this.setState({
      world: value
    }, () => {
      if(!value) {
        const list = _.query(FactionListDB, { name: { $likeI: search } });
        this.resetList(list);
      } else {
        const list = _.query(FactionListDB, { world: value, name: { $likeI: search } });
        this.resetList(list);
      }
    });
  }
  handleSearch(ev) {
    const { target: { value } } = ev;
    const { world } = this.state;
    this.setState({
      search: value
    }, () => {
      if(!value) {
        const list = _.query(FactionListDB, { world: { $like: world } });
        this.resetList(list);
      } else {
        const list = _.query(FactionListDB, { world: { $like: world }, name: { $likeI: value } });
        this.resetList(list);
      }
    });
  }
  render(){
    const stylePanel = {
      height: '550px',
      overflow: 'auto'
    }

    const { search, world, list, sort } = this.state;

    return (
      <div style={stylePanel}>
        <div className="uk-flex uk-flex-between" style={{ width: '95%' }}>
          <div>
            <input type="search" className="uk-input uk-margin-bottom" placeholder="Search..."
              value={search} onChange={(ev) => this.handleSearch(ev)} />
          </div>
          <div>
            <select className="uk-select" value={sort}
              onChange={(ev) => this.handleSelectSort(ev)}>
              <option value="name">Name</option>
              <option value="usu">Unit Size Up</option>
              <option value="usd">Unit Size Down</option>
            </select>
          </div>
          <div>
            <select className="uk-select" value={world}
              onChange={(ev) => this.handleSelectWorld(ev)}>
              <option value=""></option>
              {
                WorldListDB.map((item, index) => {
                  const { id, name, count } = item;
                  return <option key={index} value={id}>{name} ({count})</option>
                })
              }
            </select>
          </div>
        </div>
        <div className="uk-grid uk-grid-small uk-child-width-1-3">
          {
            list.map((faction, index) => {
              const { name, id, count } = faction;

              return (
                <div key={index} className="uk-margin-bottom">
                  <button className="uk-button uk-button-primary uk-button-small uk-width-1-1 uk-text-small"
                    onClick={() => this.props.onClick(faction)}>
                    {name}<br/>({id}) - {count}
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