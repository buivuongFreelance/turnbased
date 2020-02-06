import React, { Component } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingCheckImei } from "../../redux/device/device.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { checkImeiStart } from "../../redux/device/device.action";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";

class DeviceCheckImei extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: null
    }

    const { translator } = this.props;

    this.modelSchema = Yup.object().shape({
      imei: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_imei')
        }))
        .min(6, translator.translate('lbl_error_min', {
          number: 6
        }))
    });

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values, { resetForm }) {
    const { history } = this.props;
    const { imei } = values;
    this.props.checkImeiStart(imei, history);
    resetForm();
  }
  render() {
    const { loading, screenWidth, translator } = this.props;

    return (
      <Formik
        initialValues={{
          imei: '',
        }}
        validationSchema={this.modelSchema}
        onSubmit={this.onSubmit}
      >
        {
          ({ errors, touched }) => (
            <Form>
              <div className="uk-inline uk-dark uk-width-1-1">
                {
                  loading
                    ?
                    <Loading />
                    : null
                }
                <div>
                  <div className="wc-form-group">
                    <label>
                      <span>{translator.translate('lbl_imei_or_serial')}</span>
                      <em>*</em>
                    </label>
                    <Field type="text" name="imei" />
                    {errors.imei && touched.imei && <div className="wc-field-error">{errors.imei}</div>}
                  </div>
                  <div className="wc-form-action-btn uk-flex">
                    <CommonButton type="submit" className="wc-btn" screenWidth={screenWidth}>
                      {translator.translate('title_check_imei')}
                    </CommonButton>
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

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingCheckImei,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  checkImeiStart: (imei, history) => dispatch(checkImeiStart({ imei, history }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceCheckImei));
