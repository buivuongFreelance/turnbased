import React from "react";

import CommonDynamicComponent from "./components/common/CommonDynamic.component";
import CommonPageHolder from "./components/common/CommonPageHolder.component";

//import loadData from "./utils/loadData";

const CommonHomePage = (props) => (
  <CommonDynamicComponent load={() => import('./pages/common/CommonHome.page')}>
    {
      (Component) => Component === null
        ? <CommonPageHolder />
        : <Component {...props} />
    }
  </CommonDynamicComponent>
)

const Routes = [
  {
    path: '/',
    exact: true,
    component: CommonHomePage,
    //loadData: () => loadData('posts')
  },
  /*{
    component: CommonNotFoundPage
  }*/

];

export default Routes;
