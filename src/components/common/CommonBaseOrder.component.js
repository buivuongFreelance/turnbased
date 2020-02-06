import React, { Component } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { IS_MOBILE, NODE_ENV } from "../../config";
import { historyRedirect } from "../../utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectOrderStep, selectSelectedOrder, selectLoadingSelectedOrder } from "../../redux/order/order.selectors";
import { getOrderActiveStart } from "../../redux/order/order.actions";

class CommonBaseOrder extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.props.getOrderActiveStart();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loadingOrderActive !== this.props.loadingOrderActive) {
      if (this.props.loadingOrderActive === false) {
        if (NODE_ENV === 'development')
          console.log('----------------------UPDATE BASE ORDER START------------------');
        const { orderActive, history } = this.props;
        if (orderActive) {
          const { status } = orderActive;
          if (status === 'confirmed')
            historyRedirect({ history, uri: 'order/payment' });
          else {
            const { location: { pathname } } = history;
            if (pathname === '/order/payment')
              historyRedirect({ history, uri: 'order/shipping' });
          }
        }
      }
    }
  }
  goToLink(step) {
    const { orderStep } = this.props;
    if (parseInt(step) < parseInt(orderStep)) {
      let uri = '';
      switch (step) {
        case 1:
          uri = 'order/shipping';
          break;
        case 2:
          uri = 'order/billing';
          break;
      }
      historyRedirect({ history: this.props.history, uri });
    }
  }
  renderMobile() {
    const { active, children } = this.props;

    return (
      <div>
        <div className="uk-grid uk-grid-collapse uk-child-width-1-4 wc-wizard-wrapper">
          <div className="uk-cursor"
            onClick={() => this.goToLink(1)}>
            <div className={active === 'shipping' ? 'wc-wizard-item mobile active' : 'wc-wizard-item mobile'}>
              <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
                <div className="wc-wizard-number">1</div>
                <div>Shipping</div>
              </div>
            </div>
          </div>
          <div className="uk-cursor"
            onClick={() => this.goToLink(2)}>
            <div className={active === 'billing' ? 'wc-wizard-item mobile active' : 'wc-wizard-item mobile'}>
              <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
                <div className="wc-wizard-number">2</div>
                <div>Billing</div>
              </div>
            </div>
          </div>
          <div className="uk-cursor"
            onClick={() => this.goToLink(3)}>
            <div className={active === 'confirm' ? 'wc-wizard-item mobile active' : 'wc-wizard-item mobile'}>
              <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
                <div className="wc-wizard-number">3</div>
                <div>Confirm</div>
              </div>
            </div>
          </div>
          <div>
            <div className={active === 'payment' ? 'wc-wizard-item mobile active' : 'wc-wizard-item mobile'}>
              <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
                <div className="wc-wizard-number">4</div>
                <div>Payment</div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }
  renderPC() {
    const { active, children } = this.props;

    return (
      <div className="uk-margin-xsmall-top">
        <div className="uk-grid uk-grid-collapse uk-child-width-1-4 wc-wizard-wrapper">
          <div onClick={() => this.goToLink(1)} className="uk-cursor">
            <div className={active === 'shipping' ? 'wc-wizard-item active' : 'wc-wizard-item'}>
              <span className="wc-wizard-number">1</span>
              <span>Shipping</span>
            </div>
          </div>
          <div onClick={() => this.goToLink(2)} className="uk-cursor">
            <div className={active === 'billing' ? 'wc-wizard-item active' : 'wc-wizard-item'}>
              <span className="wc-wizard-number">2</span>
              <span>Billing</span>
            </div>
          </div>
          <div onClick={() => this.goToLink(3)} className="uk-cursor">
            <div className={active === 'confirm' ? 'wc-wizard-item active' : 'wc-wizard-item'}>
              <span className="wc-wizard-number">3</span>
              <span>Confirm</span>
            </div>
          </div>
          <div>
            <div className={active === 'payment' ? 'wc-wizard-item wc-no-after active' : 'wc-wizard-item wc-no-after'}>
              <span className="wc-wizard-number">4</span>
              <span>Payment</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;

    if (screenWidth !== IS_MOBILE)
      return this.renderPC();
    else
      return this.renderMobile();
  }
}

CommonBaseOrder.propTypes = {
  active: PropTypes.string.isRequired
}

const mapStateToProps = createStructuredSelector({
  orderStep: selectOrderStep,
  orderActive: selectSelectedOrder,
  loadingOrderActive: selectLoadingSelectedOrder,
});

const mapDispatchToProps = dispatch => ({
  getOrderActiveStart: () => dispatch(getOrderActiveStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonBaseOrder));
