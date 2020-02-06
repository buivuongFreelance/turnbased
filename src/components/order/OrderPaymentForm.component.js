import React, { Component } from "react";
import { IS_MOBILE } from "../../config";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { toggleCheckoutList } from "../../redux/screen/screen.actions";

import { withRouter } from "react-router";
import { selectSelectedShipping, selectSelectedBilling, selectSelectedOrder, selectLoadingPayment, selectLoadingSelectedOrder } from "../../redux/order/order.selectors";
import { getOrderActiveStart } from "../../redux/order/order.actions";

import Cards from 'react-credit-cards';

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import CommonButton from "../common/CommonButton.component";
import valid from "card-validator";

import NumberFormat from "react-number-format";
import { historyRedirect } from "../../utils";
import { paymentStart } from "../../redux/order/order.actions";
import CommonLoading from "../common/CommonLoading.component";

class OrderPaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    }

    this.modelSchema = Yup.object().shape({
      number: Yup.string()
        .test('test-number', 'Card Number is invalid', value => valid.number(value).isValid)
        .required('Card Number is required'),
      name: Yup.string()
        .required('Name is required'),
      expiry: Yup.string()
        .test('test-expiry', 'Card Expiration is invalid', value => valid.expirationDate(value).isValid)
        .required('Expiration Date is required'),
      cvc: Yup.string()
        .test('test-cvc', 'CVC is invalid', value => valid.cvv(value).isValid)
        .required('CVC is required')
    });

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingOrderActive !== this.props.loadingOrderActive) {
      if (this.props.loadingOrderActive === false) {
        if (!this.props.selectedOrder)
          historyRedirect({ history: this.props.history, uri: 'bags' });
      }
    }
  }
  onSubmit(values, { resetForm }) {
    const { cvc, expiry, name, number } = values;
    const { paymentStart, selectedOrder, history } = this.props;
    paymentStart({ orderId: selectedOrder.id, cvc, expiry, name, number, history });
    resetForm();
  }
  expiryCard(val) {
    function expirylimit(val, max) {
      if (val.length === 1 && val[0] > max[0]) {
        val = '0' + val;
      }

      if (val.length === 2) {
        if (Number(val) === 0) {
          val = '01';

          //this can happen when user paste number
        } else if (val > max) {
          val = max;
        }
      }

      return val;
    }
    let month = expirylimit(val.substring(0, 2), '12');
    let year = val.substring(2, 4);

    return month + (year.length ? '/' + year : '');
  }
  renderForm() {
    const { screenWidth } = this.props;

    return (
      <Formik
        initialValues={{
          number: '',
          name: '',
          cvc: '',
          expiry: ''
        }}
        validationSchema={this.modelSchema}
        onSubmit={this.onSubmit}
      >
        {
          ({ errors, touched, values, setFieldValue }) => (
            <Form>
              <div>
                <div className="uk-grid uk-grid-small">
                  <div className="uk-width-1-1 uk-margin-xsmall-bottom">
                    <div className="wc-form-group">
                      <label>
                        <span>Card Number</span>
                        <em>*</em>
                      </label>
                      <NumberFormat name="number" value={values['number']}
                        style={{ maxWidth: '100%' }}
                        format="#### #### #### ####" mask="_"
                        onValueChange={(valuesChange) => {
                          const { value } = valuesChange;
                          setFieldValue('number', value);
                          this.setState({ number: value });
                        }} />
                      {errors.number && touched.number && <div className="wc-field-error">{errors.number}</div>}
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-margin-xsmall-bottom">
                    <div className="wc-form-group">
                      <label>
                        <span>Name</span>
                        <em>*</em>
                      </label>
                      <Field type="text" name="name" autoComplete="name"
                        style={{ maxWidth: '100%' }}
                        onChange={ev => {
                          const value = ev.target.value;
                          setFieldValue('name', value);
                          this.setState({ name: value });
                        }} />
                      {errors.name && touched.name && <div className="wc-field-error">{errors.name}</div>}
                    </div>
                  </div>
                  <div className="uk-width-1-2 uk-margin-xsmall-bottom">
                    <div className="wc-form-group">
                      <label>
                        <span>Expiry</span>
                        <em>*</em>
                      </label>
                      <NumberFormat name="expiry" value={values['expiry']}
                        style={{ maxWidth: '100%' }}
                        format={this.expiryCard}
                        onValueChange={(valuesChange) => {
                          const { value } = valuesChange;
                          setFieldValue('expiry', value);
                          this.setState({ expiry: value });
                        }} />
                      {errors.expiry && touched.expiry && <div className="wc-field-error">{errors.expiry}</div>}
                    </div>
                  </div>
                  <div className="uk-width-1-2 uk-margin-xsmall-bottom">
                    <div className="wc-form-group">
                      <label>
                        <span>CVC</span>
                        <em>*</em>
                      </label>
                      <NumberFormat name="cvc" value={values['cvc']}
                        style={{ maxWidth: '100%' }}
                        format={'###'} mask="_"
                        onValueChange={(valuesChange) => {
                          const { value } = valuesChange;
                          setFieldValue('cvc', value);
                          this.setState({ cvc: value });
                        }} />
                      {errors.cvc && touched.cvc && <div className="wc-field-error">{errors.cvc}</div>}
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-margin-xsmall-bottom uk-margin-xsmall-top">
                    <div className="wc-form-action-btn">
                      <CommonButton className="wc-btn" screenWidth={screenWidth}
                        type="submit">Payment</CommonButton>
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
  renderMobile() {
    const { screenWidth, loadingPayment, loadingOrderActive } = this.props;

    let classItem = ['uk-margin-bottom'];
    if (screenWidth !== IS_MOBILE)
      classItem.push('uk-width-1-2');
    else
      classItem.push('uk-width-1-1');

    return (
      <div className="uk-margin-large-top uk-position-relative">
        {
          (loadingPayment || loadingOrderActive) && <CommonLoading />
        }
        <div className="uk-grid">
          <div className={classItem.join(' ')}>
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focus={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
          </div>
          <div className={classItem.join(' ')}>
            <div className="uk-width-large">
              {this.renderForm()}
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth === IS_MOBILE)
      return this.renderMobile();
    else
      return this.renderMobile();
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  selectedShipping: selectSelectedShipping,
  selectedBilling: selectSelectedBilling,
  selectedOrder: selectSelectedOrder,
  loadingPayment: selectLoadingPayment,
  loadingOrderActive: selectLoadingSelectedOrder
});

const mapDispatchToProps = dispatch => ({
  toggleCheckoutList: status => dispatch(toggleCheckoutList(status)),
  paymentStart: ({ orderId, number, name, expiry, cvc, history }) => dispatch(paymentStart({ orderId, number, name, expiry, cvc, history })),
  getOrderActiveStart: () => dispatch(getOrderActiveStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderPaymentForm));
