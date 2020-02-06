import React, { Component } from "react";
import Slider from "react-slick";
import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

class CommonModalSlider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { screenWidth, children, carouselRef, devices } = this.props;
    let slidesToShow = 2;
    let infinite = true;
    let rows = 1;

    switch (screenWidth) {
      case IS_MOBILE:
        if (devices.length <= 2) {
          infinite = false;
        }
        slidesToShow = 2;
        break;
      case IS_TABLET:
        if (devices.length <= 3) {
          infinite = false;
        }
        slidesToShow = 3;
        break;
      case IS_PC:
        if (devices.length <= 3) {
          infinite = false;
        }
        slidesToShow = 3;
        break;
    }

    let settings = {
      infinite: infinite,
      slidesToShow: slidesToShow,
      rows: rows
    };

    return (
      <Slider {...settings}
        ref={carouselRef} >
        {children}
      </Slider>
    )
  }
}

export default CommonModalSlider;
