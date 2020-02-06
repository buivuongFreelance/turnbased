import React, { Component } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/storage/storage.selectors";
import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";
import { selectLoadingUser, selectErrorCode } from "../../redux/user/user.selectors";
import { loginStart } from "../../redux/user/user.actions";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";

class UserSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: null
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
        }))
    });

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values, { resetForm }) {
    const { history } = this.props;
    const { email, password } = values;
    this.props.loginStart(email, password, history);
    resetForm();
  }
  render() {
    const { loading, screenWidth, translator } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
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
                      <span>{translator.translate('lbl_email')}</span>
                      <em>*</em>
                    </label>
                    <Field type="email" name="email" autoComplete="email"
                      id="login-input-email"
                      placeholder={translator.translate('lbl_email')} />
                    {errors.email && touched.email && <div className="wc-field-error">{errors.email}</div>}
                  </div>
                  <div className="wc-form-group">
                    <label>
                      <span>{translator.translate('lbl_password')}</span>
                      <em>*</em>
                    </label>
                    <Field type="password" name="password" autoComplete="current-password"
                      id="login-input-password"
                      placeholder={translator.translate('lbl_password')} />
                    {errors.password && touched.password && <div className="wc-field-error">{errors.password}</div>}
                  </div>
                  <div className="wc-form-action-btn uk-flex">
                    <CommonButton className="wc-btn" type="submit" screenWidth={screenWidth}
                      id="login-btn-submit">
                      {translator.translate('btn_login')}
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
  loading: selectLoadingUser,
  currentUser: selectCurrentUser,
  errorCode: selectErrorCode,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  loginStart: (email, password, history) => dispatch(loginStart({ email, password, history }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserSignIn));
