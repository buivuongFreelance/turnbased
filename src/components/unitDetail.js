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
            <img src={'units/'+image} style={imageStyle} />
            <p className="uk-text-muted uk-text-center">{id}</p>
          </div>
        </a>
      </div>
    )
  }
}

export default UnitDetail;