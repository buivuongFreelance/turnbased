import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";

import { setCategoryId } from "../../redux/screen/screen.actions";
import { IS_MOBILE } from "../../config";

import { withRouter } from "react-router";

class CommonBannerCategory extends Component {
  constructor(props) {
    super(props);
  }
  handleFilterCategory(name) {
    const { setCategoryId } = this.props;

    switch (name) {
      case 'Smart Phones':
        setCategoryId('categoryIds',['e75c590c-0691-11ea-8d71-362b9e155667']);
        break;
      case 'Tablets':
        setCategoryId('categoryIds',['e75c5c22-0691-11ea-8d71-362b9e155667']);
        break;
      case 'Smart Watches':
        setCategoryId('categoryIds',['ccf0d8b0-1571-11ea-8d71-362b9e155667']);
        break;
    }

    const { history } = this.props;
    setTimeout(() => {
      history.push('/category');
    }, 500);
  }
  renderMobile() {
    return (
      <div>
        <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
          <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
              Browse by propose
          </div>
        </div>
        <div className="uk-child-width-1-3 uk-grid uk-grid-small uk-text-center uk-padding-small">
          <div className="uk-card" onClick={() => this.handleFilterCategory('Smart Phones')}>
            <div className="uk-border-propose">
              <img alt="" src="http://159.203.45.120:7000/1.jpg"/>
              <span className="uk-text-primary uk-text-large">Smart Phones</span>
            </div>
          </div>
          <div className="uk-card" onClick={() => this.handleFilterCategory('Smart Watches')}>
            <div className="uk-border-propose">
              <img alt="" src="http://159.203.45.120:7000/2.jpg"/>
              <span className="uk-text-primary uk-text-large">Smart Watches</span>
            </div>
          </div>
          <div className="uk-card" onClick={() => this.handleFilterCategory('Tablets')}>
            <div className="uk-border-propose">
              <img alt="" src="http://159.203.45.120:7000/3.jpg"/>
              <span className="uk-text-primary uk-text-large">Tablets</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { width } = this.props;

    switch (width) {
      case IS_MOBILE:
        return this.renderMobile();
        break;
      default:
        return (
          <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
            <div className="uk-child-width-1-3 uk-grid uk-grid-small uk-text-center">
              <div>
                <div>
                <div className="wc-banner-category">
                   <div className="uk-background-center-center uk-background-cover uk-height-medium uk-panel uk-flex uk-flex-middle uk-flex-center
                      uk-cursor"
                      onClick={() => this.handleFilterCategory('Smart Phones')}
                      style={{ backgroundImage: `url(${'images/purpose-1.jpg'})` }}>
                      <p className="uk-h3 uk-text-white uk-text-uppercase">Smart Phones</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="wc-banner-category">
                  <div className="uk-background-center-center uk-background-cover uk-height-medium uk-panel uk-flex uk-flex-middle uk-flex-center
                      uk-cursor"
                    style={{ backgroundImage: `url(${'images/purpose-2.jpg'})` }}
                    onClick={() => this.handleFilterCategory('Tablets')}>
                    <p className="uk-h3 uk-text-white uk-text-uppercase">Tablets</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="wc-banner-category">
                  <div className="uk-background-center-center uk-background-cover uk-height-medium uk-panel uk-flex uk-flex-middle uk-flex-center
                      uk-cursor"
                      style={{ backgroundImage: `url(${'images/purpose-3.png'})` }}
                      onClick={() => this.handleFilterCategory('Smart Watches')}>
                      <p className="uk-h3 uk-text-white uk-text-uppercase">Smart Watches</p>
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
  setCategoryId: (field, value) => dispatch(setCategoryId(field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonBannerCategory));
