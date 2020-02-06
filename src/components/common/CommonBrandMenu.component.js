import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLoadingBrand, selectBrands } from "../../redux/device/device.selectors";
import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { listBrandStart } from "../../redux/device/device.action";

import Loading from "../common/CommonLoading.component";
import { DOMAIN_SERVER, IS_MOBILE } from "../../config";

import CommonImage from "../common/CommonImage.component";

class CommonBrandMenu extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { listBrandStart } = this.props;
    listBrandStart(5, 0);
  }
  handleClick(brand) {
    if(this.props.onClick)
      this.props.onClick(brand);
  }
  renderMobile() {
    const { loading, brands } = this.props;
    if (loading)
      return null;
    else
      return (
        <div>
          <div className="uk-flex uk-flex-between uk-margin-top uk-margin-bottom">
            {
              brands.map(brand => {
                return (
                  <div key={brand.id} className="uk-flex uk-flex-middle uk-flex-center
                    wc-brand-image uk-width-1-4 uk-xsmall-padding uk-cursor"
                    onClick={() => this.handleClick(brand)}>
                    <CommonImage url={DOMAIN_SERVER + brand.imageUrl} width="50"
                      replace_loader={<img src="images/nobrand.png" width="50" height="50" />}
                      replace_unloader={<img src="images/nobrand.png" width="50" height="50" />} />
                  </div>
                )
              })
            }
          </div>
        </div >
      )
  }
  renderPC() {
    const { loading, brands } = this.props;
    if (loading)
      return (
        <div className="uk-container wc-header-brand-wrapper">
          <Loading />
        </div>
      )
    else
      return (
        <div className="uk-container wc-header-brand-wrapper">
          <div className="uk-flex uk-flex-center">
            {
              brands.map(brand => {
                return (
                  <div key={brand.id} className="uk-flex uk-flex-middle wc-brand-image"
                    onClick={() => this.handleClick(brand)}>
                    <CommonImage url={DOMAIN_SERVER + brand.imageUrl} width="50"
                      replace_loader={<img src="images/nobrand.png" width="50" height="50" />}
                      replace_unloader={<img src="images/nobrand.png" width="50" height="50" />} />
                  </div>
                )
              })
            }
          </div>
        </div >
      )
  }
  render() {
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        return this.renderMobile();
        break;
      default:
        return this.renderPC();
        break;
    }

  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingBrand,
  brands: selectBrands,
  screenWidth: selectScreenWidth
});

const mapDispatchToProps = dispatch => ({
  listBrandStart: (limit, offset) => dispatch(listBrandStart({ limit, offset }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonBrandMenu);
