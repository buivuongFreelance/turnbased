import React, { Component, Fragment } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectLoadingCategory, selectCategories,
  selectLoadingBrandByCat, selectBrandsByCat,
  selectLoadingModel, selectModels,
  selectLoadingUpdateAvailable,
  selectSelectedDeviceAvailable, selectLoadingSelectedDevice
} from "../../redux/device/device.selectors";

import {
  selectScreenWidth
} from "../../redux/screen/screen.selectors";

import {
  updateAvailableStart, listCategoryStart,
  listBrandByCatStart, listModelStart,
  getDeviceAvailableStart, clearSelectedDeviceAvailable
} from "../../redux/device/device.action";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";
import CommonPageHolder from "../common/CommonPageHolder.component";

import NumberFormat from "react-number-format";

import check from "check-types";


class DeviceUpdateAvailable extends Component {
  constructor(props) {
    super(props);

    this.modelSchemaSell = Yup.object().shape({
      priceSell: Yup.number()
        .required('Price Sale must be required')
        .positive('Price Sale must be positive')
        .min(1, 'Price Sale must be positive'),
    });

    this.modelSchemaExchange = Yup.object().shape({
      priceExchange: Yup.number()
        .required('Price Exchange must be required')
        .positive('Price Exchange must be positive')
        .min(1, 'Price Exchange must be positive'),
      exchangeCategory: Yup.string()
        .required('Category must be required'),
      exchangeBrand: Yup.string()
        .required('Brand must be required'),
      exchangeModel: Yup.string()
        .required('Model must be required')
    });

    this.modelSchemaAll = Yup.object().shape({
      priceSell: Yup.number()
        .required('Price Sale must be required')
        .positive('Price Sale must be positive')
        .min(1, 'Price Sale must be positive'),
      priceExchange: Yup.number()
        .required('Price Exchange must be required')
        .positive('Price Exchange must be positive'),
      exchangeCategory: Yup.string()
        .required('Category must be required'),
      exchangeBrand: Yup.string()
        .required('Brand must be required'),
      exchangeModel: Yup.string()
        .required('Model must be required')
    });

    this.state = {
      selectedChecked: 'sell',
      selectedOptionExchange: 'pay',
      selectedValidationSchema: this.modelSchemaSell,
      exchangePrice: '',
      salePrice: '',
      categoryId: '',
      brandId: '',
      modelId: '',
      reset: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
  }
  componentDidMount() {
    this.setState({ reset: true }, () => {
      const { match: { params: { id } } } = this.props;
      this.props.getDeviceAvailableStart(id);
    });
  }
  componentWillUnmount() {
    this.props.clearSelectedDeviceAvailable();
  }
  componentDidUpdate() {
    if (this.state.reset) {
      const { device } = this.props;
      if (device) {
        const { availableDeviceType, availableDeviceExchangePrice, availableDeviceSalePrice, exchangeCategoryId, exchangeBrandId, exchangeModelId } = device;
        let selectedChecked = '';
        let selectedOptionExchange = '';
        let selectedValidationSchema = '';

        switch (availableDeviceType) {
          case 'sell':
            selectedChecked = 'sell';
            selectedValidationSchema = this.modelSchemaSell;
            break;
          case 'exchange':
            selectedValidationSchema = this.modelSchemaExchange;
            if (check.positive(parseFloat(availableDeviceExchangePrice)))
              selectedOptionExchange = 'pay';
            else if (check.negative(parseFloat(availableDeviceExchangePrice)))
              selectedOptionExchange = 'get';
            else if (parseFloat(availableDeviceExchangePrice) === 0)
              selectedOptionExchange = 'no';
            selectedChecked = 'exchange';
            break;
          case 'sell_exchange':
            selectedChecked = 'all';
            selectedValidationSchema = this.modelSchemaAll;
            if (check.positive(parseFloat(availableDeviceExchangePrice)))
              selectedOptionExchange = 'pay';
            else if (check.negative(parseFloat(availableDeviceExchangePrice)))
              selectedOptionExchange = 'get';
            else if (parseFloat(availableDeviceExchangePrice) === 0)
              selectedOptionExchange = 'no';
            break;
        }

        this.setState({
          selectedChecked,
          exchangePrice: Math.abs(availableDeviceExchangePrice),
          salePrice: availableDeviceSalePrice,
          selectedOptionExchange: selectedOptionExchange,
          selectedValidationSchema: selectedValidationSchema,
          categoryId: exchangeCategoryId,
          brandId: exchangeBrandId,
          modelId: exchangeModelId,
          reset: false
        }, () => {
          if (availableDeviceType === 'exchange' || availableDeviceType === 'sell_exchange') {
            this.props.listCategoryStart(10, 0);
            this.props.listBrandByCatStart(20, 0, exchangeCategoryId);
            this.props.listModelStart(20, 0, exchangeCategoryId, exchangeBrandId);
          }
        });
      }
    }
  }
  handleChangeChecked(ev, handleReset) {
    const { listCategoryStart } = this.props;
    handleReset();
    switch (ev.target.value) {
      case 'sell':
        this.setState({
          selectedChecked: ev.target.value,
          selectedValidationSchema: this.modelSchemaSell
        });
        break;
      case 'exchange':
        this.setState({
          selectedChecked: ev.target.value,
          selectedValidationSchema: this.modelSchemaExchange
        });
        listCategoryStart(20, 0);
        break;
      case 'all':
        this.setState({
          selectedChecked: ev.target.value,
          selectedValidationSchema: this.modelSchemaAll
        });
        listCategoryStart(20, 0);
        break;
    }
  }
  handleChangeExchangeChecked(ev, setFieldValue) {
    setFieldValue('exchangeCategory', '');
    setFieldValue('exchangeBrand', '');
    setFieldValue('exchangeModel', '');
    if (ev.target.value === 'no')
      setFieldValue('priceExchange', 1000);
    else
      setFieldValue('priceExchange', '');
    this.setState({
      selectedOptionExchange: ev.target.value,
    }, () => {
    });
  }
  handleChangeCategory(ev, setFieldValue) {
    const { listBrandByCatStart } = this.props;
    setFieldValue('exchangeCategory', ev.target.value);
    setFieldValue('exchangeBrand', '');
    setFieldValue('exchangeModel', '');
    if (ev.target.value)
      listBrandByCatStart(20, 0, ev.target.value);
  }
  handleChangeBrand(ev, setFieldValue, values) {
    const { listModelStart } = this.props;
    setFieldValue('exchangeBrand', ev.target.value);
    setFieldValue('exchangeModel', '');
    if (ev.target.value)
      listModelStart(20, 0, values['exchangeCategory'], ev.target.value);
  }
  onSubmit(values) {
    const { updateAvailableStart, history, device } = this.props;
    const { priceSell, priceExchange, exchangeModel } = values;
    const { selectedChecked, selectedOptionExchange } = this.state;

    let priceRealExchange = priceExchange;
    if (selectedOptionExchange === 'no') priceRealExchange = 0;
    else if (selectedOptionExchange === 'get') priceRealExchange = parseFloat(-(priceExchange));

    let deviceInstance = {
      sale: {
        salePrice: priceSell
      },
      exchange: {
        exchangePrice: priceRealExchange,
        exchangeModelId: exchangeModel
      }
    }

    if (selectedChecked === 'sell') delete deviceInstance.exchange;
    else if (selectedChecked === 'exchange') delete deviceInstance.sale;

    updateAvailableStart(device.availableDeviceId, deviceInstance, history);
  }
  reset() {
    this.setState({ reset: true });
  }
  renderFormAll({ errors, touched, values, setFieldValue }) {
    return (
      <Fragment>
        {this.renderFormSell({ errors, touched, values, setFieldValue })}
        {this.renderFormExchange({ errors, touched, values, setFieldValue })}
      </Fragment>
    )
  }
  renderFormSell({ errors, touched, values, setFieldValue }) {
    return (
      <div className="wc-form-group">
        <label>
          <span>Price Sale</span>
          <em>*</em>
        </label>
        <NumberFormat name="priceSell" thousandSeparator={true} prefix={'$'}
          value={values['priceSell']}
          onValueChange={(valuesChange) => {
            const { value } = valuesChange;
            setFieldValue('priceSell', value);
          }} />
        {errors.priceSell && touched.priceSell && <div className="wc-field-error">{errors.priceSell}</div>}
      </div>
    )
  }
  renderFieldExchange({ errors, touched, values, setFieldValue }) {
    const { categories, brands, models, loadingBrand, loadingCategory, loadingModel } = this.props;
    const { selectedOptionExchange } = this.state;

    return (
      <Fragment>
        {
          selectedOptionExchange !== 'no'
          &&
          <div className="wc-form-group">
            <label>
              <span>Price Exchange</span>
              <em>*</em>
            </label>
            <NumberFormat name="priceExchange" thousandSeparator={true} prefix={'$'}
              value={values['priceExchange']}
              onValueChange={(valuesChange) => {
                const { value } = valuesChange;
                setFieldValue('priceExchange', value);
              }} />
            {errors.priceExchange && touched.priceExchange && <div className="wc-field-error">{errors.priceExchange}</div>}
          </div>
        }
        {
          <div className="wc-form-group uk-position-relative uk-width-input">
            {(loadingCategory) ? <Loading /> : null}
            <label>
              <span>Category</span>
              <em>*</em>
            </label>
            <div>
              <Field as="select" name="exchangeCategory" className="uk-select"
                onChange={(ev) => this.handleChangeCategory(ev, setFieldValue)}>
                <option value="" />
                {
                  categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                }
              </Field>
            </div>
            {errors.exchangeCategory && touched.exchangeCategory && <div className="wc-field-error">{errors.exchangeCategory}</div>}
          </div>
        }
        {
          values.exchangeCategory
          &&
          <div className="wc-form-group uk-position-relative uk-width-input">
            {(loadingBrand || loadingCategory) ? <Loading /> : null}
            <label>
              <span>Brand</span>
              <em>*</em>
            </label>
            <div>
              <Field as="select" name="exchangeBrand" className="uk-select"
                onChange={(ev) => this.handleChangeBrand(ev, setFieldValue, values)}>
                <option value="" />
                {
                  brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))
                }
              </Field>
            </div>
            {errors.exchangeBrand && touched.exchangeBrand && <div className="wc-field-error">{errors.exchangeBrand}</div>}
          </div>
        }
        {
          (values.exchangeCategory && values.exchangeBrand)
          &&
          <div className="wc-form-group uk-position-relative uk-width-input">
            {(loadingBrand || loadingCategory || loadingModel) ? <Loading /> : null}
            <label>
              <span>Model</span>
              <em>*</em>
            </label>
            <div>
              <Field as="select" name="exchangeModel" className="uk-select">
                <option value="" />
                {
                  models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))
                }
              </Field>
            </div>
            {errors.exchangeModel && touched.exchangeModel && <div className="wc-field-error">{errors.exchangeModel}</div>}
          </div>
        }
      </Fragment >
    )
  }
  renderFormExchange({ errors, touched, values, setFieldValue }) {
    const { selectedOptionExchange } = this.state;

    return (
      <Fragment>
        <div className="uk-text-small">
          <div className="uk-text-lead"><b>Do you want : </b></div>
          <div className="uk-margin-small-top">
            <label>
              <input className="uk-radio uk-margin-xsmall-right" value="pay" type="radio" name="exchange"
                checked={selectedOptionExchange === 'pay'}
                onChange={(ev) => this.handleChangeExchangeChecked(ev, setFieldValue)}
              />
              Pay Money With Device
            </label>
          </div>
          <div className="uk-margin-xsmall-top">
            <label>
              <input className="uk-radio uk-margin-xsmall-right" value="get" type="radio" name="exchange"
                checked={selectedOptionExchange === 'get'}
                onChange={(ev) => this.handleChangeExchangeChecked(ev, setFieldValue)}
              />
              Get Money With Device
            </label>
          </div>
          <div className="uk-margin-xsmall-top uk-margin-bottom">
            <label>
              <input className="uk-radio uk-margin-xsmall-right" value="no" type="radio" name="exchange"
                checked={selectedOptionExchange === 'no'}
                onChange={(ev) => this.handleChangeExchangeChecked(ev, setFieldValue)}
              />
              No Money With Device
            </label>
          </div>
        </div>
        {
          selectedOptionExchange
            ?
            this.renderFieldExchange({ errors, touched, values, setFieldValue })
            : null
        }
      </Fragment>
    )
  }
  renderActions() {
    const { screenWidth } = this.props;
    return (
      <div className="wc-form-action-btn uk-flex">
        <div>
          <CommonButton type="button" className="wc-btn" screenWidth={screenWidth}
            onClick={() => this.reset()}>
            Reset
          </CommonButton>
        </div>
        <div className="uk-margin-xsmall-left">
          <CommonButton type="submit" className="wc-btn" screenWidth={screenWidth}>
            Update Available
          </CommonButton>
        </div>
      </div>
    )
  }
  render() {
    const { selectedChecked, selectedValidationSchema, reset } = this.state;
    const { loadingDevice, loadingUpdateAvailable, device } = this.props;

    if (device && !reset) {
      return (
        <Formik
          initialValues={{
            priceSell: this.state.salePrice,
            priceExchange: this.state.exchangePrice,
            exchangeCategory: this.state.categoryId || '',
            exchangeBrand: this.state.brandId || '',
            exchangeModel: this.state.modelId || ''
          }}
          enableReinitialize={true}
          validationSchema={selectedValidationSchema}
          onSubmit={this.onSubmit}
        >
          {
            ({ errors, touched, handleReset, values, setFieldValue }) => {
              let formJSX = null;

              switch (selectedChecked) {
                case 'sell':
                  formJSX = this.renderFormSell({ errors, touched, values, setFieldValue })
                  break;
                case 'exchange':
                  formJSX = this.renderFormExchange({ errors, touched, values, setFieldValue })
                  break;
                case 'all':
                  formJSX = this.renderFormAll({ errors, touched, values, setFieldValue })
                  break;
              }

              return (
                <Form>
                  <div className="uk-inline uk-dark uk-width-1-1">
                    {
                      (loadingDevice || loadingUpdateAvailable)
                        ?
                        <Loading />
                        : null
                    }
                    <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                      <label>
                        <input className="uk-radio" value="sell" type="radio" name="available"
                          checked={selectedChecked === 'sell'}
                          onChange={(ev) => this.handleChangeChecked(ev, handleReset)} /> Sale
                      </label>
                      <label>
                        <input className="uk-radio" value="exchange" type="radio" name="available"
                          checked={selectedChecked === 'exchange'}
                          onChange={(ev) => this.handleChangeChecked(ev, handleReset)} /> Exchange
                      </label>
                      <label>
                        <input className="uk-radio" value="all" type="radio" name="available"
                          checked={selectedChecked === 'all'}
                          onChange={(ev) => this.handleChangeChecked(ev, handleReset)} /> All
                      </label>
                    </div>
                    <div>
                      {formJSX}
                      {
                        this.renderActions()
                      }
                    </div>
                  </div>
                </Form>
              )
            }
          }
        </Formik>
      )
    } else return (
      <div className="uk-margin-top uk-margin-bottom">
        <CommonPageHolder />
      </div>
    )

  }
}

const mapStateToProps = createStructuredSelector({
  loadingUpdateAvailable: selectLoadingUpdateAvailable,
  loadingDevice: selectLoadingSelectedDevice,
  loadingCategory: selectLoadingCategory,
  categories: selectCategories,
  loadingBrand: selectLoadingBrandByCat,
  loadingModel: selectLoadingModel,
  brands: selectBrandsByCat,
  models: selectModels,
  screenWidth: selectScreenWidth,
  device: selectSelectedDeviceAvailable
});

const mapDispatchToProps = dispatch => ({
  updateAvailableStart: (id, device, history) => dispatch(updateAvailableStart({ id, device, history })),
  listCategoryStart: (limit, offset) => dispatch(listCategoryStart({ limit, offset })),
  listBrandByCatStart: (limit, offset, categoryId) => dispatch(listBrandByCatStart({ limit, offset, categoryId })),
  listModelStart: (limit, offset, categoryId, brandId) => dispatch(listModelStart({ limit, offset, categoryId, brandId })),
  getDeviceAvailableStart: (id) => dispatch(getDeviceAvailableStart({ id })),
  clearSelectedDeviceAvailable: () => dispatch(clearSelectedDeviceAvailable())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceUpdateAvailable));
