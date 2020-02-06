import React, { Component } from "react";
import Slider from "react-slick";

class CommonSliderVertical extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children, carouselRef } = this.props;

    let settings = {
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function (currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function (currentSlide) {
        console.log("after change", currentSlide);
      }
    };

    return (
      <Slider {...settings}
        ref={carouselRef}
        asNavFor={this.props.asNavFor}>
        {children}
      </Slider>
    )
  }
}

export default CommonSliderVertical;
