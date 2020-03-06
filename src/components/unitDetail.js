import React, { Component } from "react";

class UnitDetail extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { image, name, size } = this.props;
    const imageStyle = {
      height: size*150 + 'px'
    };

    return (
      <div uk-lightbox="true" className="uk-margin-right">
        <a href={'units/'+image} data-caption={name}>
          <div className="uk-text-small uk-flex uk-flex-bottom" style={{ minHeight: '150px' }}>
            <img src={'units/'+image} style={imageStyle} />
          </div>
        </a>
      </div>
    )
  }
}

export default UnitDetail;