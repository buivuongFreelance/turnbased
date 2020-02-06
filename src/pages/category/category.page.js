import React, { Component } from "react";
import CommonBaseComponent from "../../components/common/CommonBase.component";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.component";
import FilterCategory from "../../components/category/filterCategory.component";
import ListDevice from "../../components/category/listDevice.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { IS_PC } from "../../config";
import withApp from "../../hoc/withApp.hoc";


class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { screenWidth } = this.props;
    return (
      <CommonBaseComponent>
        <Breadcrumb
          list={[
            { name: 'Category', uri: 'category' }
          ]}
        />
        <div className="uk-container">
          <div className="uk-flex uk-flex-between">
            {
              screenWidth === IS_PC
                ?
                <FilterCategory />
                :
                null
            }
            <ListDevice />

          </div>
        </div>
      </CommonBaseComponent>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth
});

export default connect(mapStateToProps)(withApp(CategoryPage));
