import React, { Component } from "react";

import Slider from "react-slick";
import CommonImage from "../common/CommonImage.component";
import Magnifier from "react-magnifier";
import Lightbox from "react-image-lightbox";
import { NODE_ENV, IS_MOBILE, IS_PC, IS_TABLET } from "../../config";

class DeviceImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      isOpenLightbox: false
    }
    this.swiping = false;
  }
  commonSimpleSettings() {
    return {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (prevSlide, nextSlide) => {
        if (nextSlide !== this.state.selectedIndex) {
          if (NODE_ENV === 'development') console.log('prevslide main', prevSlide);
          this.setState({ selectedIndex: nextSlide });
        }
      }
    }
  }
  commonVerticalSettings(images) {
    let slidesToShow = images.length <= 5 ? images.length : 5;

    return {
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      vertical: true,
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
      beforeChange: (prevSlide, nextSlide) => {
        if (nextSlide !== this.state.selectedIndex) {
          if (NODE_ENV === 'development') console.log('prevslide vertical', prevSlide);
          this.carouselMain.slickGoTo(nextSlide);
          this.setState({ selectedIndex: nextSlide });
        }
      }
    };
  }
  commonThumbnailSettings(device) {
    return {
      customPaging: (index) => {
        const { images } = device;
        if (images) {
          return (
            <a>
              <CommonImage url={images[index].thumbnail_url}
                width="100%" />
            </a>
          )
        } else
          return null;
      },
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      dotsClass: "slick-dots slick-thumb",
      beforeChange: (current, next) => {
        if (NODE_ENV === 'development')
          console.log('CURRENT_SLIDE', current);
        this.setState({ selectedIndex: next })
      }
    }
  }
  renderLightbox(images, selectedIndex) {
    const { screenWidth } = this.props;
    return (
      <Lightbox
        mainSrc={images[selectedIndex].url}
        nextSrc={images[(selectedIndex + 1) % images.length].url}
        prevSrc={images[(selectedIndex + images.length - 1) % images.length].url}
        onCloseRequest={() => {
          this.setState({ isOpenLightbox: false }, () => {
            if (screenWidth !== IS_PC)
              this.carouselRef.slickGoTo(selectedIndex);
            else {
              this.carouselMain.slickGoTo(selectedIndex);
            }
          });
        }}
        onMovePrevRequest={() =>
          this.setState({
            selectedIndex: (selectedIndex + images.length - 1) % images.length,
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            selectedIndex: (selectedIndex + 1) % images.length,
          })
        }
      />
    )
  }
  renderMobile() {
    const { device } = this.props;
    const { isOpenLightbox, selectedIndex } = this.state;

    const settings = this.commonThumbnailSettings(device);

    if (device.images) {
      const { images } = device;

      return (
        <div>
          <Slider {...settings} ref={slider => { this.carouselRef = slider }}>
            {
              images.map((image, key) => {
                return (
                  <div key={key}>
                    <CommonImage url={image.url}
                      onMouseDownCapture={(e) => e.preventDefault()}
                      onMouseUpCapture={() => {
                        this.swiping = this.carouselRef.innerSlider.state.swiping;
                      }}
                      onClickCapture={() => {
                        if (this.swiping) {
                          event.preventDefault();
                        } else {
                          this.setState({ isOpenLightbox: true });
                        }
                      }}
                      width="100%" />
                  </div>
                )
              })
            }
          </Slider>
          {
            isOpenLightbox && this.renderLightbox(images, selectedIndex)
          }
        </div>
      )
    }
    else
      return <CommonImage url=""
        width="100%" />
  }
  renderVertical() {
    const { device } = this.props;
    const { images } = device;

    return (
      <div>
        {
          images.map((image, index) => {
            return (
              <div key={index} className="uk-xsmall-padding" onClick={() => {
                this.setState({ selectedIndex: index }, () => {
                  this.carouselMain.slickGoTo(index);
                })
              }}>
                <CommonImage url={image.thumbnail_url} />
              </div>
            )
          })
        }
      </div>
    )
  }
  renderPC() {
    const { device } = this.props;
    const { isOpenLightbox, selectedIndex } = this.state;

    if (device.images) {
      const { images } = device;
      return (
        <div className="uk-grid">
          <div className="uk-width-1-5">
            {
              images.length > 1
                ? (
                  this.renderVertical()
                )
                : null
            }
          </div>
          <div className="uk-width-4-5">
            <Slider
              {...this.commonSimpleSettings()}
              ref={slider => this.carouselMain = slider}>
              {
                images.map((image, key) => {
                  return (
                    <div key={key}>
                      <div>
                        <Magnifier src={image.url}
                          onMouseDownCapture={(e) => e.preventDefault()}
                          onMouseUpCapture={() => {
                            this.swiping = this.carouselMain.innerSlider.state.swiping;
                          }}
                          onClickCapture={() => {
                            if (this.swiping) {
                              event.preventDefault();
                            } else {
                              this.setState({ isOpenLightbox: true });
                            }
                          }} />
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
          {
            isOpenLightbox && this.renderLightbox(images, selectedIndex)
          }
        </div>
      )
    } else
      return (
        <div className="uk-grid">
          <div className="uk-width-1-5"></div>
          <div className="uk-width-4-5 uk-flex uk-flex-middle uk-flex-center">
            <CommonImage url=""
              className="uk-height-max-large uk-width-auto"
              width="100%" />
          </div>
        </div>
      )
  }
  render() {
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        return this.renderMobile();
        break;
      case IS_TABLET:
        return this.renderMobile();
        break;
      case IS_PC:
        return this.renderPC();
        break;
    }
  }
}
export default DeviceImages;
