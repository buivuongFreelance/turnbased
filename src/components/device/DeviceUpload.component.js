import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingImage, selectSelectedDevice, selectLoadingSelectedDevice } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { addDeviceImageStart, deleteDeviceImageStart, getDeviceStart, setMainImageStart } from "../../redux/device/device.action";

import Dropzone from "react-dropzone";
import { withRouter } from "react-router";
import CommonModalConfirm from "../../components/common/CommonModalConfirm.component";
import CommonImage from "../common/CommonImage.component";
import CommonPageHeader from "../common/CommonPageHolder.component";
import CommonLoading from "../common/CommonLoading.component";
import { IS_MOBILE, IS_TABLET } from "../../config";
import DeviceCropImage from "./DeviceCropImage.component";
import CommonButton from "../common/CommonButton.component";

import Lightbox from "react-image-lightbox";

class DeviceUpload extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      previewImage: null,
      selectedFile: null,
      selectedIndex: 0,
      isOpenLightbox: false
    }
  }
  componentDidMount() {
    const { match: { params: { id } }, getDeviceStart } = this.props;
    getDeviceStart(id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading === false) {
        const { match: { params: { id } }, getDeviceStart } = this.props;
        getDeviceStart(id);
      }
    }
  }
  setMainImage(imageId) {
    const { setMainImageStart, match: { params: { id } } } = this.props;
    setMainImageStart(imageId, id);
  }
  handleUpload(cropped) {
    const { match: { params: { id } }, addDeviceImageStart } = this.props;
    URL.revokeObjectURL(this.state.previewImage);
    this.setState({
      previewImage: null
    });
    addDeviceImageStart({ deviceId: id, file: this.state.selectedFile, thumbFile: cropped });
  }
  cancelUpload() {
    URL.revokeObjectURL(this.state.previewImage);
    this.setState({
      previewImage: null,
      selectedFile: null
    });
  }
  onDrop(acceptedFiles) {
    this.setState({ previewImage: URL.createObjectURL(acceptedFiles[0]), selectedFile: acceptedFiles[0] });
  }
  renderImage(image, index) {
    const { id, main } = image;
    const { device, deleteDeviceImageStart, screenWidth, translator } = this.props;
    const { deviceId } = device;

    let classImage = ['uk-flex-middle uk-flex uk-flex-center uk-position-relative'];
    let classGrid = ['uk-margin-bottom'];
    if (screenWidth === IS_MOBILE) {
      classImage.push('wc-image-list-phone');
      classGrid.push('uk-width-1-2');
    } else if (screenWidth === IS_TABLET) {
      classImage.push('wc-image-list-tablet');
      classGrid.push('uk-width-1-3');
    }
    else {
      classImage.push('wc-image-list-pc');
      classGrid.push('uk-width-1-5');
    }

    return (
      <div className={classGrid.join(' ')} key={index}>
        <div className={classImage.join(' ')}
          onClick={() => {
            this.setState({selectedIndex: index, isOpenLightbox: true})
          }}>
          {main ?
            <div className="wc-available uk-background-active uk-text-center uk-position-absolute
              uk-position-top-right">
              {translator.translate('title_main_image')}
            </div> : null}
          <CommonImage url={image.thumbnail_url} width="100%"
            replace_loader={<CommonLoading />}
            replace_unloader={<CommonLoading />} />
          {!main &&
            <CommonModalConfirm
              onOpen={(ev) => {
                if(ev)
                  ev.stopPropagation();
              }}
              onClose={(ev) => {
                if(ev)
                  ev.stopPropagation();
              }}
              screenWidth={screenWidth}
              message={translator.translate('lbl_confirm_question', {
                field: translator.translate('title_device_image')
              })}
              trigger=
              {<a className="uk-badge uk-position-top-right uk-position-cart">
                <i className="fa fa-close"/>
              </a>}
              onOk={(close) => {
                close();
                deleteDeviceImageStart(deviceId, id);
              }}
            />
          }
        </div>
        {
          !main
          &&
          <div className="uk-margin-top uk-flex uk-flex-center">
            <CommonButton className="wc-btn"
              screenWidth={screenWidth}
              onClick={() => {
                this.setMainImage(id)
              }}>
                {translator.translate('btn_set_main_image')}
              </CommonButton>
          </div>
        }
      </div>
    )
  }
  renderLightbox(images, selectedIndex) {
    return (
      <Lightbox
        mainSrc={images[selectedIndex].url}
        nextSrc={images[(selectedIndex + 1) % images.length].url}
        prevSrc={images[(selectedIndex + images.length - 1) % images.length].url}
        onCloseRequest={() => {
          this.setState({ isOpenLightbox: false }, () => {

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
  renderDropzone() {
    const { device, screenWidth, translator } = this.props;
    const { images } = device;
    if(images){
      if(images.length < 3)
        return (
          <Dropzone
            screenWidth={screenWidth}
            accept="image/*"
            maxSize={3145728}
            onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} multiple={false} />
                  <div className="uk-placeholder uk-height-medium uk-flex uk-flex-middle uk-flex-center">
                    <b>{translator.translate('title_placeholder_upload')}</b>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        )
      else return (
        <div className="uk-placeholder uk-height-medium uk-flex uk-flex-middle uk-flex-center">
          <b>{translator.translate('title_maximum_uploads', {
            number: 3
          })}</b>
        </div>
      )
    }else return (
      <Dropzone
        screenWidth={screenWidth}
        accept="image/*"
        maxSize={3145728}
        onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} multiple={false} />
              <div className="uk-placeholder uk-height-medium uk-flex uk-flex-middle uk-flex-center">
                <b>{translator.translate('title_placeholder_upload')}</b>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
  renderMobile() {
    const { device, loading, loadingSelectedDevice, screenWidth, translator } = this.props;
    const { previewImage, selectedIndex, isOpenLightbox } = this.state;

    if (device) {
      const { images } = device;
      return (
        <Fragment>
          <div>
            {loading || loadingSelectedDevice ? <CommonLoading /> : null}
            {
              isOpenLightbox && this.renderLightbox(images, selectedIndex)
            }
            <div className="uk-margin-large-bottom">
              {
                previewImage
                  ?
                  <div>
                    <DeviceCropImage
                      screenWidth={screenWidth}
                      image={previewImage}
                      onAccept={(cropped) => this.handleUpload(cropped)}
                      onCancel={() => this.cancelUpload()}
                    />
                  </div>
                  :
                  this.renderDropzone()
              }
            </div>
            <div className="uk-margin-bottom">
              {
                images
                  ?
                  <div className="uk-grid">
                    {
                      images.map((image, index) => {
                        return this.renderImage(image, index);
                      })
                    }
                  </div>
                  :
                  <div className="uk-placeholder uk-text-center">
                    {translator.translate('title_no_image')}
                  </div>
              }
            </div>
          </div>
        </Fragment>
      )
    } else return <CommonPageHeader />


  }
  render() {
    return this.renderMobile();
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingImage,
  loadingSelectedDevice: selectLoadingSelectedDevice,
  device: selectSelectedDevice,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  addDeviceImageStart: (device) => dispatch(addDeviceImageStart({ device })),
  deleteDeviceImageStart: (deviceId, imageId) => dispatch(deleteDeviceImageStart({ imageId, deviceId })),
  getDeviceStart: (id) => dispatch(getDeviceStart({ id })),
  setMainImageStart: (imageId, deviceId) => dispatch(setMainImageStart({ imageId, deviceId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceUpload));
