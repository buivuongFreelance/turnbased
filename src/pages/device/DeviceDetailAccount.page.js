import React, { Component, Fragment } from "react";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingSelectedDevice, selectSelectedDevice, selectLoadingDelete } from "../../redux/device/device.selectors";
import { getDeviceStart, deleteDeviceStart, removeAvailableStart } from "../../redux/device/device.action";

import { IS_MOBILE, DEVICE_GRADE, DEVICE_GRADE_TITLE } from "../../config";
import withApp from "../../hoc/withApp.hoc";
import { historyRedirect, displayStringExchangeBuyerShort } from "../../utils";

import Popup from "reactjs-popup";
import CommonModalConfirm from "../../components/common/CommonModalConfirm.component";
import DeviceImages from "../../components/device/DeviceImages.component";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import CommonLoading from "../../components/common/CommonLoading.component";
import NumberFormat from "react-number-format";
import CommonPageHolder from "../../components/common/CommonPageHolder.component";
import CommonButton from "../../components/common/CommonButton.component";
import { selectTranslator } from "../../redux/screen/screen.selectors";


class DeviceDetailAccountPage extends Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);

    this.state = {
      selectedHeader: 'system'
    }
  }
  componentDidMount() {
    const { getDeviceStart, match: { params: { id } } } = this.props;
    getDeviceStart(id);
  }
  onRedirect(url) {
    const { history } = this.props;
    historyRedirect({ history, uri: url });
  }
  renderActions(closeParent) {
    const { history, deleteDeviceStart,
      device: { availableDevice },
      match: { params: { id } }, screenWidth, removeAvailableStart, translator } = this.props;

    return (
      <ul className="uk-nav-sub">
        <li>
          <a
            onClick={this.onRedirect.bind(this, 'account/device/images/' + id)}
          >{translator.translate('title_select_images')}</a>
        </li>
        {
          !availableDevice
          &&
          <li>
            <a
              onClick={this.onRedirect.bind(this, 'account/edit-device/' + id)}>
              {translator.translate('btn_edit_common', {
                field: translator.translate('title_device')
              })}
          </a>
          </li>
        }
        <li>
          {availableDevice
            &&
            <CommonModalConfirm
              screenWidth={screenWidth}
              onClose={() => closeParent()}
              message="Do you really want to remove available ?"
              onOk={close => {
                removeAvailableStart(availableDevice.availableDeviceId, id, history);
                close();
              }}
              trigger={<a>Remove Available</a>}
            />
          }
        </li>
        <li>
          <CommonModalConfirm
            screenWidth={screenWidth}
            onClose={() => closeParent()}
            message={
              translator.translate('lbl_confirm_question', {
                field: translator.translate('title_device')
              })
            }
            onOk={close => {
              deleteDeviceStart(id, history);
              close();
            }}
            trigger={<a>{translator.translate('btn_delete_common', {
              field: translator.translate('title_device')
            })}</a>}
          />
        </li>
      </ul>
    )
  }
  renderState() {
    const { screenWidth, translator, device } = this.props;

    if(device) {
      const { deviceGrade } = device;

      let classWidth = ['uk-flex'];
      let classTitleHeader = ['uk-text-bold'];

      if(screenWidth !== IS_MOBILE) {
        classTitleHeader.push('uk-width-small');
      } else {
        classWidth.push('uk-flex-between');
      }

      return (
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_grade')}</div>
            <div className="uk-width-small">{translator.translate(DEVICE_GRADE_TITLE[deviceGrade])}</div>
          </div>
        </li>
      )
    }
  }
  renderAvaiNone() {
    const { screenWidth, translator } = this.props;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if(screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <li>
        <div className={classWidth.join(' ')}>
          <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
          <div className="uk-width-small">{translator.translate('title_none')}</div>
        </div>
      </li>
    )
  }
  renderSale() {
    const { device, screenWidth, translator } = this.props;
    const { availableDevice } = device;
    const { availableDeviceSalePrice } = availableDevice;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if(screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <Fragment>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
            <div className="uk-width-small">{translator.translate('title_sale')}</div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_sale_price')}</div>
            <div>
              <div className="uk-width-small">
                <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
          </div>
        </li>
      </Fragment>
    )
  }
  renderDeviceExchange() {
    const { device, translator } = this.props;
    const { availableDevice } = device;
    const { availableDeviceExchangePrice, exchangeModelName } = availableDevice;

    return (
      <div className="uk-width-small">
        {displayStringExchangeBuyerShort(availableDeviceExchangePrice, 0, translator)}
        <b>
          <NumberFormat value={Math.abs(availableDeviceExchangePrice)} displayType="text" thousandSeparator={true} prefix={'$'} />
        </b>
        {displayStringExchangeBuyerShort(availableDeviceExchangePrice, 1, translator)}
        <b>{exchangeModelName}</b>
      </div>
    )
  }

  renderExchange() {
    const { screenWidth, translator } = this.props;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if(screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <Fragment>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
            <div>{translator.translate('title_exchange')}</div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>
              {translator.translate('title_exchange_device')}
            </div>
            <div>
              {this.renderDeviceExchange()}
            </div>
          </div>
        </li>
      </Fragment>
    )
  }

  renderAll() {
    const { device, screenWidth, translator } = this.props;
    const { availableDevice } = device;
    const { availableDeviceSalePrice } = availableDevice;

    let classWidth = ['uk-flex'];
    let classTitleHeader = ['uk-text-bold'];

    if(screenWidth !== IS_MOBILE) {
      classTitleHeader.push('uk-width-small');
    } else {
      classWidth.push('uk-flex-between');
    }

    return (
      <Fragment>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_device_available')}</div>
            <div className="uk-width-small">{translator.translate('title_sale_exchange')}</div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>{translator.translate('title_sale_price')}</div>
            <div>
              <div className="uk-width-small">
                <NumberFormat value={availableDeviceSalePrice} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className={classWidth.join(' ')}>
            <div className={classTitleHeader.join(' ')}>
              {translator.translate('title_exchange_device')}
            </div>
            <div>
              {this.renderDeviceExchange()}
            </div>
          </div>
        </li>
      </Fragment>
    )
  }

  renderAvailable() {
    const { device, screenWidth } = this.props;
    const { modelDetailName, availableDevice } = device;
    let blockAvailable = null;

    let classUL = ['uk-list uk-text-small'];
    if(screenWidth === IS_MOBILE)
      classUL.push('uk-list-striped');

    if(availableDevice){
      const { availableDeviceType } = availableDevice;
      switch (availableDeviceType) {
        case 'exchange':
          blockAvailable = (
            this.renderExchange()
          )
          break;
        case 'sell':
          blockAvailable = (
            this.renderSale()
          )
          break;
        case 'sell_exchange':
          blockAvailable = (
            this.renderAll()
          )
        default:
          break;
      }
    }else
      blockAvailable = (
        this.renderAvaiNone()
      )
    return (
      <Fragment>
        <div className="uk-text-bold uk-text-lead">{modelDetailName}</div>

        <ul className={classUL.join(' ')}>
          {blockAvailable}
          {this.renderState()}
        </ul>
      </Fragment>
    )
  }
  renderSpecHeaders() {
    const { translator, device } = this.props;
    const { selectedHeader } = this.state;

    if(device) {
      const { availableDevice } = device;

      let exchangeHTML = '';
      if(availableDevice) {
        const { availableDeviceType } = availableDevice;
        if(availableDeviceType === 'exchange' || availableDeviceType === 'sell_exchange')
          exchangeHTML =(
            <li className={selectedHeader === "exchange" ? 'uk-active' : null}>
              <a onClick={() => this.setState({selectedHeader: 'exchange'})}>{translator.translate('title_exchange_device')}</a>
            </li>
          )
      }

      return (
        <ul className="uk-tab">
          <li className={selectedHeader === "system" ? 'uk-active' : null}>
            <a onClick={() => this.setState({selectedHeader: 'system'})}>{translator.translate('title_system_config')}</a>
          </li>
          <li className={selectedHeader === "state" ? 'uk-active' : null}>
            <a onClick={() => this.setState({selectedHeader: 'state'})}>{translator.translate('lbl_grade')}</a>
          </li>
          {
            exchangeHTML
          }
        </ul>
      )
    }
  }
  renderContentSystem() {
    const { device, translator, screenWidth } = this.props;

    if(device) {
      const { categoryName, imeiImei, brandName, colorName, deviceOriginalPrice,
        modelName, ramName, capacityName } = device;
      let arrSpec = [
        {t: translator.translate('lbl_imei'), v: imeiImei},
        {t: translator.translate('lbl_category'), v: categoryName},
        {t: translator.translate('lbl_brand'), v: brandName},
        {t: translator.translate('lbl_model'), v: modelName},
        {t: translator.translate('lbl_color'), v: colorName},
        {t: translator.translate('lbl_capacity'), v: capacityName},
        {t: translator.translate('lbl_ram'), v: ramName},
        {t: translator.translate('lbl_original_price'), v: <NumberFormat value={deviceOriginalPrice} displayType="text" thousandSeparator={true} prefix={'$'} />}
      ];

      if(screenWidth !== IS_MOBILE) {
        return (
          <ul className="uk-list">
            {
              arrSpec.map((spec, index) => {
                return (
                  <li key={index}>
                    <div className="uk-flex">
                      <div className="uk-text-bold uk-width-small">{spec.t}</div>
                      <div className="uk-width-medium">{spec.v}</div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        )
      } else {
        return (
          <Fragment>
            <div className="uk-text-bold uk-text-lead">{translator.translate('title_system_config')}</div>
            <ul className="uk-list uk-text-small uk-list-striped">
            {
              arrSpec.map((spec, index) => {
                return (
                  <li key={index}>
                    <div className="uk-flex uk-flex-between uk-width-1-1">
                      <div className="uk-text-bold">{spec.t}</div>
                      <div className="uk-width-small">{spec.v}</div>
                    </div>
                  </li>
                )
              })
            }
            </ul>
          </Fragment>
        )
      }
    }
  }
  renderContentState() {
    const { device, translator, screenWidth } = this.props;

    if(device) {
      const { deviceGrade } = device;
      if(screenWidth !== IS_MOBILE) {
        return (
          <ul className="uk-list uk-list-divider">
          {
            DEVICE_GRADE[deviceGrade].map((item, index) => {
              return (
                <li key={index}>{translator.translate(item)}</li>
              )
            })
          }
          </ul>
        )
      } else {
        return (
          <Fragment>
            <div className="uk-text-bold uk-text-lead">{translator.translate('lbl_grade')}</div>
            <ul className="uk-list uk-text-small uk-list-striped">
            {
              DEVICE_GRADE[deviceGrade].map((item, index) => {
                return (
                  <li key={index}>{translator.translate(item)}</li>
                )
              })
            }
            </ul>
          </Fragment>
        )
      }
    }
  }
  renderContentExchange() {
    const { device, translator, screenWidth } = this.props;

    if(device) {
      const { availableDevice } = device;
      if( availableDevice ){
        const {exchangeBrandName, exchangeCategoryName, exchangeModelName} = availableDevice;

        if(screenWidth !== IS_MOBILE) {
          return (
            <ul className="uk-list">
              <li>
                <div className="uk-flex">
                  <div className="uk-text-bold uk-width-small">{translator.translate('lbl_category')}</div>
                  <div className="uk-width-medium">{exchangeCategoryName}</div>
                </div>
              </li>
              <li>
                <div className="uk-flex">
                  <div className="uk-text-bold uk-width-small">{translator.translate('lbl_brand')}</div>
                  <div className="uk-width-medium">{exchangeBrandName}</div>
                </div>
              </li>
              <li>
                <div className="uk-flex">
                  <div className="uk-text-bold uk-width-small">{translator.translate('lbl_model')}</div>
                  <div className="uk-width-medium">{exchangeModelName}</div>
                </div>
              </li>
            </ul>
          )
        } else {
          return (
            <ul className="uk-list uk-text-small uk-list-striped">
              <li>
                <div className="uk-flex uk-flex-between uk-width-1-1">
                  <div className="uk-text-bold">{translator.translate('lbl_category')}</div>
                  <div className="uk-text-right uk-width-small">{exchangeCategoryName}</div>
                </div>
              </li>
              <li>
                <div className="uk-flex uk-flex-between uk-width-1-1">
                  <div className="uk-text-bold">{translator.translate('lbl_brand')}</div>
                  <div className="uk-text-right uk-width-small">{exchangeBrandName}</div>
                </div>
              </li>
              <li>
                <div className="uk-flex uk-flex-between uk-width-1-1">
                  <div className="uk-text-bold">{translator.translate('lbl_model')}</div>
                  <div className="uk-text-right uk-width-small">{exchangeModelName}</div>
                </div>
              </li>
            </ul>
          )
        }
      }
    }
  }
  renderSpecs() {
    const { device, screenWidth } = this.props;
    const { selectedHeader } = this.state;

    if (device) {
      if(screenWidth === IS_MOBILE)
        return (
          <Fragment>
            {
              this.renderContentSystem()
            }
            {
              this.renderContentState()
            }
          </Fragment>
        )
      else
        return (
          <Fragment>
            {
              this.renderSpecHeaders()
            }
            {
              selectedHeader === 'system'
              &&
              this.renderContentSystem()
            }
            {
              selectedHeader === 'state'
              &&
              this.renderContentState()
            }
            {
              selectedHeader === 'exchange'
              &&
              this.renderContentExchange()
            }
          </Fragment>
        )
    }
  }
  renderCommands() {
    const { screenWidth, history, match: { params: { id } }, device, translator } = this.props;
    const { availableDevice } = device;

    if(screenWidth === IS_MOBILE)
      return (
        <div className="wc-navbar-wrapper-footer">
          <div className="uk-flex">
            <div className="wc-navbar-link-wrapper uk-width-1-1">
              <div className="uk-flex">
                <Popup
                  trigger={
                    <div className="uk-width-1-2">
                      <CommonButton screenWidth={screenWidth}
                        className="wc-btn navbar-button uk-margin-remove">
                        {translator.translate('btn_actions')}
                      </CommonButton>
                    </div>
                  }
                  on="click"
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  position="top left"
                  contentStyle={{ border: "none", padding: 0, zIndex: 9999 }}
                  arrow={false}>
                  {close => this.renderActions(close)}
                </Popup>
                <div className="uk-width-1-2">
                  {
                    !availableDevice
                    ?
                    <CommonButton screenWidth={screenWidth}
                      onClick={() => historyRedirect({ history, uri: 'account/make-available/'+id })}
                      className="wc-btn navbar-button uk-text-white uk-margin-remove" type="inverted">
                      {translator.translate('btn_make_available')}
                    </CommonButton>
                    :
                    <CommonButton screenWidth={screenWidth}
                      onClick={() => historyRedirect({ history, uri: 'account/update-available/'+availableDevice.availableDeviceId })}
                      className="wc-btn navbar-button uk-text-white uk-margin-remove" type="inverted">
                      Update Available
                    </CommonButton>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    else{
      return (
        <div className="uk-flex">
          <Popup
            trigger={
              <div>
                <CommonButton screenWidth={screenWidth}
                  className="wc-btn uk-margin-xsmall-right">
                  {translator.translate('btn_actions')}
                </CommonButton>
              </div>
            }
            on="click"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            position="top left"
            contentStyle={{ border: "none", padding: 0, zIndex: 9999 }}
            arrow={false}>
            {close => this.renderActions(close)}
          </Popup>
          {
            availableDevice
            ?
            <CommonButton screenWidth={screenWidth}
              onClick={() => historyRedirect({ history, uri: 'account/update-available/'+availableDevice.availableDeviceId })}
              className="wc-btn" type="inverted">
              Update Available
            </CommonButton>
            :
            <CommonButton screenWidth={screenWidth}
              onClick={() => historyRedirect({ history, uri: 'account/make-available/'+id })}
              className="wc-btn" type="inverted">
              {translator.translate('btn_make_available')}
            </CommonButton>
          }
        </div>
      )
    }
  }
  renderPC() {
    const { loadingDelete, device, match: { params: { id } }, screenWidth,
      loading, translator } = this.props;

    if (device) {
      return (
        <Fragment>
          <CommonBreadcrumb list={[{ name: translator.translate('title_device_list'), uri: 'account/device' }, { name: translator.translate('title_device_detail') }]} />
          <div className="uk-container uk-margin-medium-top uk-margin-medium-bottom uk-position-relative">
            {
              (loadingDelete || loading) && <CommonLoading />
            }
            <div className="uk-grid">
              <div className="uk-width-1-2 uk-position-relative">
                <div className="uk-position-top-right uk-overlay-default
                  uk-background-active wc-available wc-badge-image"
                  onClick={() => {this.onRedirect('account/device/images/' + id)}}>
                  {translator.translate('title_select_images')}
                </div>
                <DeviceImages device={device} screenWidth={screenWidth} />
              </div>
              <div className="uk-width-1-2">
                {this.renderAvailable()}
                {this.renderCommands()}
              </div>
            </div>
            <div className="uk-margin-large-top">
              {this.renderSpecs()}
            </div>
          </div>
        </Fragment>
      )
    } else return <CommonPageHolder />;
  }
  renderMobile() {
    const { loadingDelete, device, screenWidth, match: {params: {id}},
      loading, translator } = this.props;

    if (device) {
      return (
        <Fragment>
          <div className="uk-position-relative">
            <div className="uk-box-shadow-medium uk-height-small uk-flex uk-flex-middle uk-flex-between uk-container">
              <div className="uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                Device Detail
              </div>
            </div>
            <div className="uk-container uk-margin-top">
              {
                (loadingDelete || loading) && <CommonLoading />
              }
              <div className="wc-block-wrapper">
                <div className="uk-padding uk-position-relative">
                <div className="uk-position-top-right uk-overlay-default
                  uk-background-active wc-available wc-badge-image"
                  onClick={() => {this.onRedirect('account/device/images/' + id)}}>
                    {translator.translate('title_select_images')}
                  </div>
                  <DeviceImages device={device} screenWidth={screenWidth} />
                </div>
                {this.renderAvailable()}
                <hr />
                {this.renderSpecs()}
              </div>
            </div>
          </div>
          {this.renderCommands()}
        </Fragment>
      )
    } else return <CommonPageHolder />;

  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingSelectedDevice,
  loadingDelete: selectLoadingDelete,
  device: selectSelectedDevice,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  getDeviceStart: (id) => dispatch(getDeviceStart({ id })),
  deleteDeviceStart: (id, history) => dispatch(deleteDeviceStart({ id, history })),
  removeAvailableStart: (id, deviceId, history) => dispatch(removeAvailableStart({ id, deviceId, history }))
});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceDetailAccountPage)));
