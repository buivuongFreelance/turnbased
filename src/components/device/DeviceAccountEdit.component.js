import React, { Component } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingAddDevice, selectLoadingSelectedDevice, selectSelectedDevice } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { editDeviceStart, getDeviceStart } from "../../redux/device/device.action";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";

import NumberFormat from "react-number-format";

import CommonPageHolder from "../common/CommonPageHolder.component";
import { IS_MOBILE, DEVICE_GRADE, IS_PC } from "../../config";
import CommonButton from "../common/CommonButton.component";

class DeviceAccountEdit extends Component {
  constructor(props) {
    super(props);

    const { translator } = this.props;

    this.modelSchema = Yup.object().shape({
      originalPrice: Yup.number()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_original_price')
        }))
        .positive(translator.translate('lbl_error_positive', {
          field: translator.translate('lbl_original_price')
        }))
        .min(1, translator.translate('lbl_error_min_num', {
          number: 1
        })),
    });

    this.state = {
      selectedGrade: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { getDeviceStart, match: { params: { id } } } = this.props;
    getDeviceStart(id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingDevice !== this.props.loadingDevice) {
      if (this.props.loadingDevice === false) {
        const { device } = this.props;
        if (device) {
          const { deviceGrade } = device;
          this.setState({ selectedGrade: deviceGrade });
        }
      }
    }
  }
  onSubmit(values) {
    const { history, match: { params: { id } } } = this.props;
    const { selectedGrade } = this.state;

    if (!selectedGrade) {
      alertify.error(translator.translate('lbl_error_select', {
        field: translator.translate('lbl_grade')
      }));
      return;
    }

    const { originalPrice } = values;
    const device = { id, originalPrice, grade: selectedGrade };
    this.props.editDeviceStart(device, history);
  }
  handleChangeChecked(ev) {
    const value = ev.target.value;
    this.setState({ selectedGrade: value });
  }
  renderGrade() {
    const { selectedGrade } = this.state;
    const { translator } = this.props;

    return (
      <div className="uk-margin-xsmall-top uk-grid-small uk-child-width-auto uk-grid uk-text-small">
        <label>
          <input className="uk-radio" value="A" type="radio" name="grade"
            checked={selectedGrade === 'A'}
            onChange={(ev) => this.handleChangeChecked(ev)} /> {translator.translate('lbl_grade_A')}
        </label>
        <label>
          <input className="uk-radio" value="B" type="radio" name="grade"
            checked={selectedGrade === 'B'}
            onChange={(ev) => this.handleChangeChecked(ev)} /> {translator.translate('lbl_grade_B')}
        </label>
        <label>
          <input className="uk-radio" value="C" type="radio" name="grade"
            checked={selectedGrade === 'C'}
            onChange={(ev) => this.handleChangeChecked(ev)} /> {translator.translate('lbl_grade_C')}
        </label>
        <label>
          <input className="uk-radio" value="D" type="radio" name="grade"
            checked={selectedGrade === 'D'}
            onChange={(ev) => this.handleChangeChecked(ev)} /> {translator.translate('lbl_grade_D')}
        </label>
      </div>
    )
  }
  renderGradeDesc() {
    const { screenWidth, translator } = this.props;
    const { selectedGrade } = this.state;

    let classCardWrapper = ['uk-card uk-card-default uk-card-body'];

    if (screenWidth === IS_PC)
      classCardWrapper.push('uk-width-1-2');

    if (selectedGrade) {
      return (
        <div className="uk-margin-xsmall-top">
          <div className={classCardWrapper.join(' ')}>
            <ul className="uk-list uk-list-divider">
              {
                DEVICE_GRADE[selectedGrade].map((item, index) => {
                  return (
                    <li key={index}>{translator.translate(item)}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      )
    }
  }
  render() {
    const { loading, device, screenWidth, translator } = this.props;

    if (device) {
      const { categoryName, imeiImei, brandName, colorName, deviceCondition, deviceOriginalPrice,
        modelName, ramName, capacityName } = device;
      return (
        <Formik
          initialValues={{
            originalPrice: deviceOriginalPrice,
            condition: deviceCondition
          }}
          validationSchema={this.modelSchema}
          onSubmit={this.onSubmit}
        >
          {
            ({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="uk-inline uk-dark uk-width-1-1">
                  {
                    loading
                      ?
                      <Loading />
                      : null
                  }
                  <div className={screenWidth === IS_MOBILE ? '' : 'uk-child-width-1-2 uk-grid'}>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_imei_or_serial')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="imei" defaultValue={imeiImei} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_category')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="category" defaultValue={categoryName} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_brand')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="brand" defaultValue={brandName} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_model')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="model" defaultValue={modelName} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_color')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="color" defaultValue={colorName} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_capacity')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="capacity" defaultValue={capacityName} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_ram')}</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="ram" defaultValue={ramName} readOnly />
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_original_price')} Price</span>
                        <em>*</em>
                      </label>
                      {/*<Field type="number" name="originalPrice" />*/}
                      <NumberFormat name="originalPrice" thousandSeparator={true} prefix={'$'}
                        value={values['originalPrice']}
                        onValueChange={(values) => {
                          const { value } = values;
                          setFieldValue('originalPrice', value);
                        }} />
                      {errors.originalPrice && touched.originalPrice && <div className="wc-field-error">{errors.originalPrice}</div>}
                    </div>
                    <div className="wc-form-group uk-width-1-1">
                      <label>
                        <span>{translator.translate('lbl_grade')}</span>
                        <em>*</em>
                      </label>
                      {
                        this.renderGrade()
                      }
                      {
                        this.renderGradeDesc()
                      }
                    </div>
                    <div className="wc-form-action-btn uk-flex uk-margin-xsmall-top">
                      <div>
                        <CommonButton type="submit" className="wc-btn" screenWidth={screenWidth}>
                          {translator.translate('btn_edit_common', { field: translator.translate('title_device') })}
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>
      )
    } else
      return <CommonPageHolder />
  }
}

const mapStateToProps = createStructuredSelector({
  loadingDevice: selectLoadingSelectedDevice,
  loading: selectLoadingAddDevice,
  device: selectSelectedDevice,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  editDeviceStart: (device, history) => dispatch(editDeviceStart({ device, history })),
  getDeviceStart: (id) => dispatch(getDeviceStart({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceAccountEdit));
