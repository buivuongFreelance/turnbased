import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ReactCrop from 'react-image-crop';
import CommonButton from "../common/CommonButton.component";
import { selectTranslator } from "../../redux/screen/screen.selectors";

class DeviceCropImage extends Component {
  constructor() {
    super();
    this.state = {
      crop: {
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25,
        aspect: 4 / 3,
      },
      croppedAreaPixels: null
    }
  }
  async makeClientCrop() {
    const { crop } = this.state;
    if (this.imageRef && crop.width && crop.height) {
      const croppedImage = await this.getCroppedImg(
        this.imageRef,
        crop
      );
      this.props.onAccept(croppedImage);
    }
  }
  dataURItoFile(dataURI, filename) {
    let arr = dataURI.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  getCroppedImg(image, crop) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      resolve(this.dataURItoFile(canvas.toDataURL('image/png', 1), 'newFile.png'));
    });
  }
  handleCrop(crop) {
    this.setState({ crop });
  }
  handleImageLoaded(image) {
    this.imageRef = image;
    const width = image.width > image.height ? (image.height / image.width) * 100 : 100;
    const height = image.height > image.width ? (image.width / image.height) * 100 : 100;
    const x = width === 100 ? 0 : (100 - width) / 2;
    const y = height === 100 ? 0 : (100 - height) / 2;

    this.setState({
      crop: {
        unit: '%',
        aspect: 3 / 4,
        width,
        height,
        x,
        y,
      },
    });

    return false;
  }
  render() {
    const { image, screenWidth, translator } = this.props;
    const { crop } = this.state;

    return (
      <div>
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <div className="uk-width-large uk-flex uk-flex-center uk-flex-center">
            <ReactCrop
              src={image}
              crop={crop}
              ruleOfThirds
              onChange={(crop) => this.handleCrop(crop)}
              onImageLoaded={(img) => this.handleImageLoaded(img)}
              locked={true}
              screenWidth={screenWidth}
            />
          </div>
        </div>
        <div className="uk-margin-top uk-flex uk-flex-center uk-flex-middle">
          <div>
            <CommonButton screenWidth={screenWidth} className="wc-btn"
              onClick={this.props.onCancel} type="inverted">
              {translator.translate('btn_cancel')}
            </CommonButton>
          </div>
          <div className="uk-margin-left">
            <CommonButton screenWidth={screenWidth} className="wc-btn"
              onClick={() => this.makeClientCrop()}>
              {translator.translate('btn_accept')}
            </CommonButton>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  translator: selectTranslator
});

export default connect(mapStateToProps)(DeviceCropImage);
