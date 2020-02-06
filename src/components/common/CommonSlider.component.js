import React, { Component } from "react";

import Slider from "react-slick";

class CommonSlider extends Component {
  constructor() {
    super();

  }
  render() {
    const settings = {
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      focusOnSelect: true
    }

    return (
      <Slider {...settings} ref={this.props.carouselRef}
        asNavFor={this.props.asNavFor}>
        {this.props.children}
      </Slider>
    )
  }
}
export default CommonSlider;
