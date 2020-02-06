import React, { Component } from "react";
import Slider from "react-slick";
import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

function CustomNextArrow(props) {
  const { className, style, onClick } = props;

  if (onClick)
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 2 }}
        onClick={onClick}
      >
        <button type="button" className="wc-navigation-circle">
          <i className="fa fa-angle-right"></i>
        </button>
      </div>
    )
  else return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 2, opacity: 0.4 }}
      onClick={onClick}
    >
      <button type="button" className="wc-navigation-circle">
        <i className="fa fa-angle-right"></i>
      </button>
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  if (onClick)
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 2 }}
        onClick={onClick}
      >
        <button type="button" className="wc-navigation-circle">
          <i className="fa fa-angle-left"></i>
        </button>
      </div>
    )
  else return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 2, opacity: 0.4 }}
      onClick={onClick}
    >
      <button type="button" className="wc-navigation-circle">
        <i className="fa fa-angle-left"></i>
      </button>
    </div>
  );
}

class CommonMultipleCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { screenWidth, children, carouselRef, devices } = this.props;
    let slidesToShow = 2;
    let rows = 1;
    let infinite = false;
    let slidesToScroll = 1;

    switch (screenWidth) {
      case IS_MOBILE:
        if (devices.length <= 2) {
          rows = 1;
          infinite = false;
        } else infinite = true;
        slidesToShow = 2;
        break;
      case IS_TABLET:
        if (devices.length <= 4) {
          rows = 1;
          infinite = false;
        } else infinite = true;
        slidesToShow = 4;
        slidesToScroll = 2;
        break;
      case IS_PC:
        if (devices.length <= 5) {
          rows = 1;
          infinite = false;
        } else infinite = true;
        slidesToShow = 5;
        slidesToScroll = 3;
        break;
    }

    let settings = {
      infinite: infinite,
      slidesToShow: slidesToShow,
      rows: rows,
      slidesToScroll,
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />
    };

    return (
      <Slider {...settings}
        ref={carouselRef} >
        {children}
      </Slider>
    )
  }
}

export default CommonMultipleCarousel;
