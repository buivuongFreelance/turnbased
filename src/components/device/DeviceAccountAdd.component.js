import React, { Component } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingAddDevice, selectImei } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { addDeviceStart } from "../../redux/device/device.action";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";

import { Redirect } from "react-router";
import { IS_MOBILE, IS_PC, DEVICE_GRADE } from "../../config";
import NumberFormat from "react-number-format";

class DeviceAccountAdd extends Component {
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
  onSubmit(values) {
    const { history, translator } = this.props;
    const { selectedGrade } = this.state;
    const { originalPrice } = values;

    if (!selectedGrade) {
      alertify.error(translator.translate('lbl_error_select', {
        field: translator.translate('lbl_grade')
      }));
      return;
    }

    const imei = this.props.imei.imeiImei;
    const device = { imei, originalPrice, grade: selectedGrade };
    this.props.addDeviceStart(device, history);
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
    const { imei, loading, screenWidth, translator } = this.props;

    if (!imei)
      return <Redirect to="/account/check-imei" />
    else {
      const { imeiImei, categoryName, brandName,
        capacityName, colorName, modelName, ramName } = imei;
      return (
        <Formik
          initialValues={{
            originalPrice: '',
            condition: 0
          }}
          validationSchema={this.modelSchema}
          onSubmit={this.onSubmit}
        >
          {
            ({ errors, touched, setFieldValue }) => (
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
                          {translator.translate('btn_add_device')}
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
    }
  }
}

const mapStateToProps = createStructuredSelector({
  imei: selectImei,
  loading: selectLoadingAddDevice,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  addDeviceStart: (device, history) => dispatch(addDeviceStart({ device, history }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceAccountAdd));
