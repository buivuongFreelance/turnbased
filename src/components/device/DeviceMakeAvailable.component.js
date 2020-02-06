import React, { Component, Fragment } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectLoadingMakeAvailable, selectLoadingModel,
  selectLoadingCategory, selectCategories,
  selectLoadingBrandByCat, selectBrandsByCat,
  selectModels
} from "../../redux/device/device.selectors";

import {
  selectScreenWidth, selectTranslator
} from "../../redux/screen/screen.selectors";

import {
  makeAvailableStart, listCategoryStart,
  listBrandByCatStart, listModelStart
} from "../../redux/device/device.action";

import { withRouter } from "react-router";

import Loading from "../common/CommonLoading.component";
import CommonButton from "../common/CommonButton.component";

import NumberFormat from "react-number-format";

class DeviceMakeAvailable extends Component {
  constructor(props) {
    super(props);

    const { translator } = this.props;

    this.modelSchemaSell = Yup.object().shape({
      priceSell: Yup.number()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_price_sale')
        }))
        .positive(translator.translate('lbl_error_positive', {
          field: translator.translate('lbl_price_sale')
        }))
        .min(1, translator.translate('lbl_error_min_num', {
          num: 1
        })),
    });

    this.modelSchemaExchange = Yup.object().shape({
      priceExchange: Yup.number()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_price_exchange')
        }))
        .positive(translator.translate('lbl_error_positive', {
          field: translator.translate('lbl_price_exchange')
        }))
        .min(1, translator.translate('lbl_error_min_num', {
          num: 1
        })),
      exchangeCategory: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_category')
        })),
      exchangeBrand: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_brand')
        })),
      exchangeModel: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_model')
        }))
    });

    this.modelSchemaAll = Yup.object().shape({
      priceSell: Yup.number()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_price_sale')
        }))
        .positive(translator.translate('lbl_error_positive', {
          field: translator.translate('lbl_price_sale')
        }))
        .min(1, translator.translate('lbl_error_min_num', {
          num: 1
        })),
      priceExchange: Yup.number()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_price_exchange')
        }))
        .positive(translator.translate('lbl_error_positive', {
          field: translator.translate('lbl_price_exchange')
        })),
      exchangeCategory: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_category')
        })),
      exchangeBrand: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_brand')
        })),
      exchangeModel: Yup.string()
        .required(translator.translate('lbl_error_required', {
          field: translator.translate('lbl_model')
        }))
    });

    this.state = {
      selectedChecked: 'sell',
      selectedOptionExchange: 'pay',
      selectedValidationSchema: this.modelSchemaSell
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
  }
  handleChangeChecked(ev, handleReset) {
    handleReset();
    const { listCategoryStart } = this.props;
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
      listBrandByCatStart(100, 0, ev.target.value);
  }
  handleChangeBrand(ev, setFieldValue, values) {
    const { listModelStart } = this.props;
    setFieldValue('exchangeBrand', ev.target.value);
    setFieldValue('exchangeModel', '');
    if (ev.target.value)
      listModelStart(100, 0, values['exchangeCategory'], ev.target.value);
  }
  onSubmit(values) {
    const { match: { params: { id } }, makeAvailableStart, history } = this.props;
    const { priceSell, priceExchange, exchangeModel } = values;
    const { selectedChecked, selectedOptionExchange } = this.state;

    let priceRealExchange = priceExchange;
    if (selectedOptionExchange === 'no') priceRealExchange = 0;
    else if (selectedOptionExchange === 'get') priceRealExchange = parseFloat(-(priceExchange));

    let device = {
      deviceId: id,
      sale: {
        salePrice: priceSell
      },
      exchange: {
        exchangePrice: priceRealExchange,
        exchangeModelId: exchangeModel
      }
    }

    if (selectedChecked === 'sell') delete device.exchange;
    else if (selectedChecked === 'exchange') delete device.sale;

    makeAvailableStart(device, history);
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
    const { translator } = this.props;

    return (
      <div className="wc-form-group">
        <label>
          <span>{translator.translate('lbl_price_sale')}</span>
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
            {loadingCategory ? <Loading /> : null}
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
            {(loadingCategory || loadingBrand) && <Loading />}
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
            {(loadingCategory || loadingBrand || loadingModel) && <Loading />}
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
    const { translator } = this.props;

    return (
      <Fragment>
        <div className="uk-text-small uk-margin-bottom">
          <div className="uk-text-lead"><b>{translator.translate('title_do_you_want')}</b></div>
          <div className="uk-margin-small-top">
            <label>
              <input className="uk-radio uk-margin-xsmall-right" value="pay" type="radio" name="exchange"
                checked={selectedOptionExchange === 'pay'}
                onChange={(ev) => this.handleChangeExchangeChecked(ev, setFieldValue)}
              />
              {
                translator.translate('title_pay')
                + ' ' +
                translator.translate('title_money')
                + ' ' +
                translator.translate('title_for') + ' '
              }
              <a className="uk-text-danger">Select A Device</a>
            </label>
          </div>
          <div className="uk-margin-xsmall-top">
            <label>
              <input className="uk-radio uk-margin-xsmall-right" value="get" type="radio" name="exchange"
                checked={selectedOptionExchange === 'get'}
                onChange={(ev) => this.handleChangeExchangeChecked(ev, setFieldValue)}
              />
              {
                translator.translate('title_get')
                + ' ' +
                translator.translate('title_money')
                + ' ' +
                translator.translate('title_from') + ' '
              }
              <a className="uk-text-danger">Select A Device</a>
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
    const { screenWidth, translator } = this.props;
    return (
      <div className="wc-form-action-btn uk-flex">
        <CommonButton type="submit" className="wc-btn" screenWidth={screenWidth}>
          {translator.translate('btn_make_available')}
        </CommonButton>
      </div>
    )
  }
  render() {
    const { selectedChecked, selectedValidationSchema } = this.state;
    const { loading, translator } = this.props;

    return (
      <Formik
        initialValues={{
          priceSell: '',
          priceExchange: '',
          exchangeCategory: '',
          exchangeBrand: '',
          exchangeModel: ''
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
                    loading
                      ?
                      <Loading />
                      : null
                  }
                  <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label>
                      <input className="uk-radio" value="sell" type="radio" name="available"
                        checked={selectedChecked === 'sell'}
                        onChange={(ev) => this.handleChangeChecked(ev, handleReset)} /> {translator.translate('title_sale')}
                    </label>
                    <label>
                      <input className="uk-radio" value="exchange" type="radio" name="available"
                        checked={selectedChecked === 'exchange'}
                        onChange={(ev) => this.handleChangeChecked(ev, handleReset)} /> {translator.translate('title_exchange')}
                    </label>
                    <label>
                      <input className="uk-radio" value="all" type="radio" name="available"
                        checked={selectedChecked === 'all'}
                        onChange={(ev) => this.handleChangeChecked(ev, handleReset)} /> {translator.translate('title_all')}
                    </label>
                  </div>
                  <div>
                    {formJSX}
                    {
                      this.renderActions(values)
                    }
                  </div>
                </div>
              </Form>
            )
          }
        }
      </Formik>
    )

  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingMakeAvailable,
  loadingCategory: selectLoadingCategory,
  categories: selectCategories,
  loadingBrand: selectLoadingBrandByCat,
  loadingModel: selectLoadingModel,
  brands: selectBrandsByCat,
  models: selectModels,
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  makeAvailableStart: (device, history) => dispatch(makeAvailableStart({ device, history })),
  listCategoryStart: (limit, offset) => dispatch(listCategoryStart({ limit, offset })),
  listBrandByCatStart: (limit, offset, categoryId) => dispatch(listBrandByCatStart({ limit, offset, categoryId })),
  listModelStart: (limit, offset, categoryId, brandId) => dispatch(listModelStart({ limit, offset, categoryId, brandId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeviceMakeAvailable));
