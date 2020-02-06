import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import Loading from "../../components/common/CommonLoading.component";
import CommonButton from "../../components/common/CommonButton.component";

import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE } from "../../config";

class CommonContactUs extends Component {
  constructor(props) {
    super(props);

    this.modelSchema = Yup.object().shape({
      fullname: Yup.string()
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid Email')
        .required('Email is required'),
      comment: Yup.string()
        .required('Comment is required')
    });
  }
  render() {
    const { screenWidth, loading } = this.props;
    return (
      <div>
        <div className="uk-background-cover uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-light"
          style={{ backgroundImage: 'url(../images/banner-contact.jpg)' }}>
          <p className="uk-h1">Contact Us</p>
        </div>
        <div className="uk-container uk-padding-large">
          <h2>Contact to Dingtoi</h2>
          <div className={"uk-grid uk-grid-match " +
            (screenWidth === IS_MOBILE ? 'uk-child-width-1-1' : 'uk-child-width-1-2')}>
            <div className="uk-card">
              <p>Swap-ez is a fast service provider and ensures customer service with the highest quality. With all the passion for the profession, we believe that we can capture the needs of the market accurately and solve the most flexible problem. Contact to Swap-ez if you want to know more and more.</p>
              <h4 className="uk-margin-small-top uk-text-bold">Address</h4>
              <p className="uk-margin-remove-top">248 Avenue, Quebec, Canada</p>
              <h4 className="uk-margin-small-top uk-text-bold">Email</h4>
              <p className="uk-margin-remove-top">info@dingtoi.com</p>
              <h4 className="uk-margin-small-top uk-text-bold">Phone</h4>
              <p className="uk-margin-remove-top">(098)-686-666888</p>
            </div>
            <div className="uk-card">
              <h4>Questions for the Investor Relations department can be submitted below.</h4>
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  comment: ''
                }}
                validationSchema={this.modelSchema}>
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
                            <Field type="text" name="fullname" autoComplete="fullname" placeholder="Full Name" />
                            {errors.fullname && touched.fullname && <div className="wc-field-error">{errors.fullname}</div>}
                          </div>
                          <div className="wc-form-group">
                            <Field type="email" name="email" autoComplete="email" placeholder="Email" />
                            {errors.email && touched.email && <div className="wc-field-error">{errors.email}</div>}
                          </div>
                          <div className="wc-form-group">
                            <Field type="text" name="phone" autoComplete="phone" placeholder="Phone" />
                          </div>
                          <div className="wc-form-group">
                            <Field type="text" name="subject" placeholder="Subject" />
                          </div>
                          <div className="wc-form-group">
                            <Field type="text" component="textarea" name="comment" placeholder="Comment" />
                            {errors.comment && touched.comment && <div className="wc-field-error">{errors.comment}</div>}
                          </div>
                          <div className="wc-form-action-btn uk-flex">
                            <CommonButton className="wc-btn" type="submit" screenWidth={screenWidth}>Send</CommonButton>
                          </div>

                        </div>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withApp(CommonContactUs);
