import React, { Component, Fragment } from "react";
import withApp from "../../hoc/withApp.hoc";

import { IS_MOBILE } from "../../config";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb.component";
import DeviceCategory from "../../components/device/DeviceCategory.component";
import CommonButton from "../../components/common/CommonButton.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsOpenFilterModal } from "../../redux/screen/screen.selectors";
import { toggleFilterModal, toggleSortCategory } from "../../redux/screen/screen.actions";

class DeviceCategoryPage extends Component {
  constructor(props) {
    super(props);
  }
  renderCommands() {
    const { screenWidth } = this.props;

    return (
      <div className="wc-navbar-wrapper-footer">
        <div className="uk-flex">
          <div className="wc-navbar-link-wrapper uk-width-1-1">
            <div className="uk-flex">
              <div className="uk-width-1-2">
                <CommonButton screenWidth={screenWidth}
                  onClick={() => this.props.toggleFilterModal(true)}
                  className="wc-btn navbar-button uk-margin-remove" type="inverted">
                  <div className="uk-flex uk-flex-middle uk-flex-center uk-text-white">
                    <i className="fa fa-filter" />
                    <div className="uk-margin-xsmall-left">Filter</div>
                  </div>
                </CommonButton>
              </div>
              <div className="uk-width-1-2">
                <CommonButton screenWidth={screenWidth}
                  onClick={() => this.props.toggleSortCategory(true)}
                  className="wc-btn navbar-button uk-margin-remove">
                  <div className="uk-flex uk-flex-middle uk-flex-center">
                    <i className="fa fa-sort" />
                    <div className="uk-margin-xsmall-left">Sort By</div>
                  </div>
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderMobile() {
    const { screenWidth } = this.props;

    return (
      <Fragment>
        {screenWidth !== IS_MOBILE && <CommonBreadcrumb list={[{ name: 'Category' }]} />}
        {
          screenWidth === IS_MOBILE
            ?
            <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle uk-flex-between">
              <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
                Device Category
              </div>
            </div>
            :
            <div className="uk-container uk-margin-top">
              <article className="uk-article">
                <h3>List Category</h3>
                <hr />
              </article>
            </div>
        }
        <div className="uk-container uk-margin-top">
          <div className="wc-block-wrapper">
            <DeviceCategory />
          </div>
        </div>
        {screenWidth === IS_MOBILE && this.renderCommands()}
      </Fragment>
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
  isOpenFilter: selectIsOpenFilterModal
});

const mapDispatchToProps = dispatch => ({
  toggleFilterModal: (status) => dispatch(toggleFilterModal(status)),
  toggleSortCategory: (status) => dispatch(toggleSortCategory(status))

});

export default withApp(connect(mapStateToProps, mapDispatchToProps)(DeviceCategoryPage));
