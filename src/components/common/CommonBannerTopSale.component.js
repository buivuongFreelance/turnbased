import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { setCategoryId } from "../../redux/screen/screen.actions";
import { IS_MOBILE } from "../../config";

import { withRouter } from "react-router";
import CommonImage from "./CommonImage.component";
import CommonImageHolder from "./CommonImageHolder.component";

class CommonBannerTopSale extends Component {
  constructor(props) {
    super(props);
  }
  handleFilterCategory(type) {
    const { setCategoryId } = this.props;

    setCategoryId('types', [type]);

    const { history } = this.props;
    setTimeout(() => {
      history.push('/category');
    }, 500);
  }
  render() {
    const { width } = this.props;

    switch (width) {
      case IS_MOBILE:
        return null;
        break;
      default:
        return (
          <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
            <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-2@m uk-text-center">
              <div>
                <div className="uk-inline-clip uk-transition-toggle uk-box-shadow-medium uk-cursor"
                  onClick={() => this.handleFilterCategory('sale')}>
                  <CommonImage className="uk-transition-scale-up uk-transition-opaque" url="images/ad-1.jpg"
                    replace_loader={<div><CommonImageHolder /></div>}
                    replace_unloader={<div><CommonImageHolder /></div>} />
                  <img className="uk-transition-scale-up uk-transition-opaque" src="" alt="" />
                  <div className="uk-position-center-left uk-margin-left">
                    <div className="uk-padding-small uk-background-third uk-border-compare">
                      <h2 className="uk-h3 uk-text-white uk-text-uppercase uk-margin-remove uk-border">Sell Device</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="uk-inline-clip uk-transition-toggle uk-box-shadow-medium uk-cursor"
                  onClick={() => this.handleFilterCategory('exchange')}>
                  <CommonImage className="uk-transition-scale-up uk-transition-opaque" url="images/ad-2.jpg"
                    replace_loader={<div><CommonImageHolder /></div>}
                    replace_unloader={<div><CommonImageHolder /></div>} />
                  <div className="uk-position-center-right uk-margin-right">
                    <div className="uk-padding-small uk-background-third uk-border-compare">
                      <h2 className="uk-h3 uk-text-white uk-text-uppercase uk-margin-remove uk-border">Exchange Device</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        break;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  width: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  setCategoryId: (field, value) => dispatch(setCategoryId(field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonBannerTopSale));
