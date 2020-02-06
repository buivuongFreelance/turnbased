import React, { Component } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { selectLoadingCreateBilling, selectSelectedBilling, selectLoadingUpdateBilling, selectSelectedShipping, selectOrderStep } from "../../redux/order/order.selectors";
import { createBillingStart, clearBilling, updateBillingStart, setOrderStep } from "../../redux/order/order.actions";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";
import { IS_MOBILE, COUNTRY_LIST } from "../../config";
import CommonInputPhone from "../common/CommonInputPhone.component";

class OrderBillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShipping: false,
      name: '',
      address: '',
      apartment: '',
      city: '',
      country: '',
      postalCode: '',
      phone: '',
      countryOptions: COUNTRY_LIST
    }

    this.modelSchema = Yup.object().shape({
      name: Yup.string()
        .required('Full Name is required'),
      address: Yup.string()
        .required('Street Address is required'),
      city: Yup.string()
        .required('City is required'),
      country: Yup.string()
        .required('Country is required'),
      postalCode: Yup.string()
        .required('Postal Code is required'),
      phone: Yup.string()
        .required('Phone is required')
    });

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.setOrderStep(2);
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.selectedBilling) !== JSON.stringify(this.props.selectedBilling)) {
      if (this.props.selectedBilling) {
        const { receiverName, streetAddress, extendedAddress, cityName, countryId, zipCode, phoneNumber } = this.props.selectedBilling;

        let isShipping = false;

        if (prevState.isShipping !== this.state.isShipping)
          isShipping = this.state.isShipping;

        this.setState({
          name: receiverName,
          address: streetAddress,
          apartment: extendedAddress,
          city: cityName,
          country: countryId,
          postalCode: zipCode,
          phone: phoneNumber,
          isShipping
        });
      } else {
        this.setState({
          name: '',
          address: '',
          apartment: '',
          city: '',
          country: '',
          postalCode: '',
          phone: ''
        });
      }
    }

    if (prevProps.orderStep !== this.props.orderStep) {
      if (this.props.selectedBilling) {
        const { receiverName, streetAddress, extendedAddress, cityName, countryId, zipCode, phoneNumber } = this.props.selectedBilling;
        this.setState({
          name: receiverName,
          address: streetAddress,
          apartment: extendedAddress,
          city: cityName,
          country: countryId,
          postalCode: zipCode,
          phone: phoneNumber
        });
      } else {
        this.setState({
          name: '',
          address: '',
          apartment: '',
          city: '',
          country: '',
          postalCode: '',
          phone: ''
        });
      }
    }
  }
  handleClearBilling() {
    this.props.clearBilling();
    this.setState({
      isShipping: false
    });
  }
  handleChecked(ev) {
    const checked = ev.target.checked;
    if (checked) {
      const { selectedShipping: {
        receiverName: name,
        streetAddress: address,
        extendedAddress: apartment,
        zipCode: postalCode,
        cityName: city,
        countryId: country,
        phoneNumber: phone
      } } = this.props;
      this.setState({
        isShipping: true
      }, () => {
        this.props.clearBilling();
        setTimeout(() => {
          this.setState({
            name, address, apartment, city, country, postalCode, phone
          });
        }, 300);
      });
    } else {
      this.setState({
        name: '', address: '', apartment: '', city: '', country: '', postalCode: '', phone: '',
        isShipping: false
      });
    }
  }
  onSubmit(values) {
    const { selectedBilling } = this.props;
    const { name, address, apartment, city, country, postalCode, phone } = values;
    const { isShipping } = this.state;

    if (isShipping) {
      this.props.createBillingStart({
        receiverName: name,
        streetAddress: address,
        extendedAddress: apartment,
        cityName: city,
        countryId: country,
        zipCode: postalCode,
        phoneNumber: phone
      });
    } else {
      if (!selectedBilling) {
        this.props.createBillingStart({
          receiverName: name,
          streetAddress: address,
          extendedAddress: apartment,
          cityName: city,
          countryId: country,
          zipCode: postalCode,
          phoneNumber: phone,
          useAsBillingAddress: 0
        });
      } else {
        this.props.updateBillingStart({
          id: selectedBilling.id,
          receiverName: name,
          streetAddress: address,
          extendedAddress: apartment,
          cityName: city,
          countryId: country,
          zipCode: postalCode,
          phoneNumber: phone
        });
      }
    }
    if (this.props.onSuccess)
      this.props.onSuccess();
  }
  renderPC() {
    const { loadingCreateBilling, loadingUpdateBilling, screenWidth, selectedBilling } = this.props;
    const { countryOptions, name, address, apartment, city, country, postalCode, phone, isShipping } = this.state;

    return (
      <div className="uk-position-relative">
        <Formik
          initialValues={{
            name: name,
            address: address,
            apartment: apartment,
            city: city,
            country: country,
            postalCode: postalCode,
            phone: phone
          }}
          enableReinitialize={true}
          validationSchema={this.modelSchema}
          onSubmit={this.onSubmit}
        >
          {
            ({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="uk-dark uk-width-1-1 uk-margin-top uk-position-relative">
                  {
                    (loadingCreateBilling || loadingUpdateBilling)
                      ?
                      <Loading />
                      : null
                  }
                  <div>
                    <div className="uk-grid uk-grid-small uk-width-large">
                      <div className="wc-form-group uk-width-1-1">
                        <label>
                          <input className="uk-checkbox uk-margin-xsmall-right" value="isShipping" type="checkbox" name="isShipping"
                            checked={isShipping}
                            onChange={(ev) => {
                              this.handleChecked(ev);
                            }}
                          />
                          Same with Shipping Address
                        </label>
                      </div>
                      <div className="wc-form-group uk-width-1-1">
                        <label>
                          <span>Full Name</span>
                          <em>*</em>
                        </label>
                        <Field type="text" name="name" autoComplete="name" style={{ maxWidth: '100%' }} />
                        {errors.name && touched.name && <div className="wc-field-error">{errors.name}</div>}
                      </div>
                      <div className="wc-form-group uk-width-1-1">
                        <label>
                          <span>Address</span>
                          <em>*</em>
                        </label>
                        <Field type="text" name="address" autoComplete="address" style={{ maxWidth: '100%' }} />
                        {errors.address && touched.address && <div className="wc-field-error">{errors.address}</div>}
                      </div>
                      <div className="wc-form-group uk-width-1-1">
                        <label>
                          <span>Apartment, Building</span>
                        </label>
                        <Field type="text" name="apartment" autoComplete="apartment" style={{ maxWidth: '100%' }} />
                      </div>
                      <div className="wc-form-group uk-width-1-1">
                        <label>
                          <span>City</span>
                          <em>*</em>
                        </label>
                        <Field type="text" name="city" autoComplete="city" style={{ maxWidth: '100%' }} />
                        {errors.city && touched.city && <div className="wc-field-error">{errors.city}</div>}
                      </div>
                      <div className="wc-form-group uk-width-1-2">
                        <label>
                          <span>Country</span>
                          <em>*</em>
                        </label>
                        <Field as="select" name="country" className="uk-select">
                          <option value="" />
                          {
                            countryOptions.map(country => (
                              <option key={country.id} value={country.id}>{country.name}</option>
                            ))
                          }
                        </Field>
                        {errors.country && touched.country && <div className="wc-field-error">{errors.country}</div>}
                      </div>
                      <div className="wc-form-group uk-width-1-2">
                        <label>
                          <span>Zip Code</span>
                          <em>*</em>
                        </label>
                        <Field type="text" name="postalCode" autoComplete="postalCode" style={{ maxWidth: '100%' }} />
                        {errors.postalCode && touched.postalCode && <div className="wc-field-error">{errors.postalCode}</div>}
                      </div>
                      <div className="wc-form-group uk-width-1-1">
                        <label>
                          <span>Phone Number</span>
                          <em>*</em>
                        </label>
                        <CommonInputPhone name="phone" value={values['phone']}
                          style={{ maxWidth: '100%' }}
                          onValueChange={(valuesChange) => {
                            const { value } = valuesChange;
                            setFieldValue('phone', value);
                          }} />
                        {errors.phone && touched.phone && <div className="wc-field-error">{errors.phone}</div>}
                      </div>
                    </div>
                    <div className="wc-form-action-btn">
                      {
                        selectedBilling
                        &&
                        <CommonButton className="wc-btn uk-margin-xsmall-right" screenWidth={screenWidth}
                          onClick={() => this.handleClearBilling()}
                          type="inverted">Clear</CommonButton>
                      }
                      <CommonButton className="wc-btn" screenWidth={screenWidth}
                        type="submit">Save Billing</CommonButton>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth !== IS_MOBILE)
      return this.renderPC();
    else
      return this.renderPC();
  }
}

const mapStateToProps = createStructuredSelector({
  loadingCreateBilling: selectLoadingCreateBilling,
  loadingUpdateBilling: selectLoadingUpdateBilling,
  screenWidth: selectScreenWidth,
  selectedBilling: selectSelectedBilling,
  selectedShipping: selectSelectedShipping,
  orderStep: selectOrderStep
});

const mapDispatchToProps = dispatch => ({
  createBillingStart: (billing) => dispatch(createBillingStart(billing)),
  updateBillingStart: (billing) => dispatch(updateBillingStart(billing)),
  clearBilling: () => dispatch(clearBilling()),
  setOrderStep: (step) => dispatch(setOrderStep(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderBillingForm));
