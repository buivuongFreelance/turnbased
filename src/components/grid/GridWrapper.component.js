import React, { Component } from "react";
import { GRID_VIEW, TILE } from "../../config";

class GridWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      height: 0,
      width: 0,
      player: {
        x: 0,
        y: 0
      }
    }
  }
  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.setState({
      width, height
    });
  }
  renderViewHorizontal() {
    const horizontal = GRID_VIEW.HORIZONTAL.x;
    const vertical = GRID_VIEW.HORIZONTAL.y;

    let grid = [];
    let y = 0;

    for (let i = 0; i < vertical; i++) {
      grid.push([]);
      let x = TILE.width;
      for (let j = 0; j < horizontal; j++) {
        grid[i].push({ x, y });
        x += TILE.width;
      }
      y += TILE.width;
    }

    console.log('grid', grid);
    return (
      <div>
        <div style={{ paddingBottom: GRID_VIEW.HEADER }}></div>
        <div className="uk-position-relative">
          <img src={'images/player.png'} width="60px" className="uk-position-absolute"
            style={{
              top: grid[1][3].y - 20,
              left: grid[1][3].x,
              height: '80px'
            }} />
          <img src={'images/player.png'} width="60px" className="uk-position-absolute"
            style={{
              top: grid[1][0].y,
              left: grid[1][0].x
            }} />
          {
            grid.map((row, index) => {
              return (
                <div key={index} className="uk-flex" style={{ marginLeft: GRID_VIEW.HEADER }}>
                  {row.map((cell, indexCell) => {
                    return (
                      <div key={indexCell} style={{ width: TILE.width, height: TILE.width, border: '1px solid grey' }}>

                      </div>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  render() {
    const { width, height } = this.state;
    if (width && height) {
      return (
        <div>
          {this.renderViewHorizontal()}
        </div>
      )
    } else {
      return 'Loading';
    }
  }
}

export default GridWrapper;
