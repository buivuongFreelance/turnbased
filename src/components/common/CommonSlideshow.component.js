import React, { Component } from "react";

import Slider from "react-slick";
import CommonImage from "./CommonImage.component";
import CommonImageHolder from "./CommonImageHolder.component";

class CommonSlideshow extends Component {
  constructor() {
    super();
  }
  render() {
    const settings = {
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }

    return (
      <Slider {...settings}>
        <div>
          <CommonImage url="images/slideshow-1.jpg" width="100%"
            replace_loader={<div><CommonImageHolder /></div>}
            replace_unloader={<div><CommonImageHolder /></div>} />
        </div>
        <div>
          <CommonImage url="images/slideshow-2.jpg" width="100%"
            replace_loader={<div><CommonImageHolder /></div>}
            replace_unloader={<div><CommonImageHolder /></div>} />
        </div>
        <div>
          <CommonImage url="images/slideshow-3.jpg" width="100%"
            replace_loader={<div><CommonImageHolder /></div>}
            replace_unloader={<div><CommonImageHolder /></div>} />
        </div>
      </Slider>
    )
  }
}
export default CommonSlideshow;
