import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";

class CommonPermissionPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //const wcInit = document.getElementById('init-padding');
    //wcInit.className = 'wc-init-404';
  }
  render() {
    return (
      <div className="wc-not-found uk-background-cover uk-background-blend-screen uk-panel uk-flex uk-flex-center uk-flex-middle uk-flex-column"
        style={{ backgroundImage: 'url("images/notfound-bg.jpg")' }}>
        <h1>501</h1>
        <h3>OOPS... YOU DO NOT HAVE PERMISSION!</h3>
        <div>
          <button className="uk-button uk-button-primary uk-CommonButton-large uk-margin-large-right">RETURN TO STORE</button>
          <button className="uk-button uk-button-primary uk-CommonButton-large">SHOP THE COLLECTIONS</button>
        </div>

      </div>
    )
  }
}

export default withApp(CommonPermissionPage);
