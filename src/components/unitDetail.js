import React, { Component } from "react";

class UnitDetail extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { image, name, size, id } = this.props;
    const imageStyle = {
      height: size*150 + 'px'
    };

    return (
      <div uk-lightbox="true" className="uk-margin-medium-right uk-margin-small-bottom">
        <a href={'units/'+image} data-caption={name}>
          <div className="uk-text-small">
            <div className="uk-flex uk-flex-bottom">
              <img src={'units/'+image} style={imageStyle} />
              <div style={{marginLeft: '10px', borderRight: '1px solid red', width: '1px', height: '150px'}} />
            </div>
            <p className="uk-text-muted uk-text-center">{id}</p>
          </div>
        </a>
      </div>
    )
  }
}

export default UnitDetail;