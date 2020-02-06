import React, { Component } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingUser, selectErrorCode, selectLoadingCheckEmail, selectCheckEmail } from "../../redux/user/user.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { registerStart, checkEmailStart, clearCheckEmail } from "../../redux/user/user.actions";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";
//import CommonCaptcha from "../CommonCaptcha/CommonCaptcha.component";

class UserSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: null,
      resetCommonCaptcha: 0
    }

    const { translator } = this.props;

    this.modelSchema = Yup.object().shape({
      email: Yup.string()
        .email(translator.translate('lbl_error_invalid', {
          field: translator.translate('lbl_email')
        }))
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_email')
        })),
      password: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_password')
        }))
        .min(6, translator.translate('lbl_error_min', {
          number: 6
        })),
      confirmPassword: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_confirm_password')
        }))
        .oneOf([
          Yup.ref('password'),
          null
        ], translator.translate('lbl_error_confirm_password')),
      //reCommonCaptcha: Yup.string()
      //.required('CommonCaptcha must checked')
    });

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheckEmail = this.handleCheckEmail.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingCheckEmail !== this.props.loadingCheckEmail) {
      if (this.props.loadingCheckEmail === false) {
        if (!this.props.checkEmail) {
          this.setFieldValue('email', '');
        }
      }
    }
  }
  componentWillUnmount() {
    this.props.clearCheckEmail();
    this.setFieldValue = null;
  }
  handleCheckEmail(email, error) {
    if (!error && email != '') {
      const { checkEmailStart } = this.props;
      checkEmailStart(email);
    }
  }
  onSubmit(values, { resetForm }) {
    const { email, password } = values;
    const { history } = this.props;
    this.props.registerStart(email, password, history);
    resetForm();
    this.setState(resetCommonCaptcha => {
      return { resetCommonCaptcha: resetCommonCaptcha + 1 }
    })
  }
  render() {
    const { loading, loadingCheckEmail, checkEmail, screenWidth, translator } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          reCommonCaptcha: ''
        }}
        enableReinitialize={true}
        validationSchema={this.modelSchema}
        onSubmit={this.onSubmit}
      >
        {
          ({ errors, touched, values, setFieldValue }) => {
            this.setFieldValue = setFieldValue;
            return (
              <Form>
                <div className="uk-inline uk-dark uk-width-1-1">
                  {
                    loading || loadingCheckEmail
                      ?
                      <Loading />
                      : null
                  }
                  <div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_email')}</span>
                        <em>*</em>
                      </label>
                      <Field type="email" name="email" autoComplete="username"
                        id="register-input-email"
                        placeholder={translator.translate('lbl_email')}
                        onBlur={this.handleCheckEmail.bind(this, values.email, errors.email)} />
                      {checkEmail && <div className="wc-field-success" id="register-success-check-email">{translator.translate('lbl_confirm_email')}</div>}
                      {errors.email && touched.email &&
                        <div className="wc-field-error" id="register-error-email">{errors.email}</div>}
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_password')}</span>
                        <em>*</em>
                      </label>
                      <Field type="password" name="password" autoComplete="new-password"
                        id="register-input-password"
                        placeholder={translator.translate('lbl_password')} />
                      {errors.password && touched.password &&
                        <div className="wc-field-error" id="register-error-password">{errors.password}</div>}
                    </div>
                    <div className="wc-form-group">
                      <label>
                        <span>{translator.translate('lbl_confirm_password')}</span>
                        <em>*</em>
                      </label>
                      <Field type="password" name="confirmPassword" autoComplete="new-password"
                        id="register-input-confirm-password"
                        placeholder={translator.translate('lbl_confirm_password')} />
                      {errors.confirmPassword && touched.confirmPassword &&
                        <div className="wc-field-error" id="register-error-confirm-password">{errors.confirmPassword}</div>}
                    </div>
                    {/*<div className="wc-form-group uk-margin-medium-top uk-margin-small-bottom">
                    <CommonCaptcha
                      reset={this.state.resetCommonCaptcha}
                      onVerify={response => setFieldValue('reCommonCaptcha', response)} />
                    {errors.reCommonCaptcha && <div className="wc-field-error">{errors.reCommonCaptcha}</div>}
                  </div>*/}
                    <div className="wc-form-action-btn">
                      <CommonButton className="wc-btn" screenWidth={screenWidth}
                        id="register-btn-submit"
                        type="submit">{translator.translate('btn_register')}</CommonButton>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }}
      </Formik>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingUser,
  loadingCheckEmail: selectLoadingCheckEmail,
  checkEmail: selectCheckEmail,
  errorCode: selectErrorCode,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  registerStart: (email, password, history) => dispatch(registerStart({ email, password, history })),
  checkEmailStart: (email) => dispatch(checkEmailStart({ email })),
  clearCheckEmail: () => dispatch(clearCheckEmail())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserSignUp));
