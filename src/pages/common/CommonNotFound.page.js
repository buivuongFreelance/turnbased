import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }
  renderTitleDesktop() {
    return (
      <h1>404</h1>
    )
  }
  renderTitleMobile() {
    return (
      <h2>404</h2>
    )
  }
  renderButton() {
    let classFlexWrapper = ['uk-flex'];
    let classItemFlex = ['uk-button uk-button-primary']
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classFlexWrapper.push('uk-flex-column');
        classItemFlex.push('uk-margin-xsmall-bottom')
        break;
      case IS_TABLET:
        classFlexWrapper.push('');
        classItemFlex.push('uk-margin-right');
        break;
      case IS_PC:
        classFlexWrapper.push('');
        classItemFlex.push('uk-margin-right');
        break;
    }
    return (
      <div className={classFlexWrapper.join(' ')}>
        <button className={classItemFlex.join(' ')}>RETURN TO STORE</button>
        <button className={classItemFlex.join(' ')}>SHOP THE COLLECTIONS</button>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;
    return (
      <div className="wc-not-found uk-padding-small uk-background-cover uk-background-blend-screen uk-panel uk-flex uk-flex-center uk-flex-middle uk-flex-column"
        style={{ backgroundImage: 'url("images/notfound-bg.jpg")' }}>
        {
          screenWidth === IS_MOBILE
            ?
            this.renderTitleMobile()
            :
            this.renderTitleDesktop()
        }
        <h3>OOPS... THE PAGE YOU LOOKING FOR CLOCKED OUT!</h3>
        {this.renderButton()}
      </div>
    )
  }
}

NotFoundPage.defaultProps = {
  staticContext: {
    status: 404
  }
}

export default withApp(NotFoundPage);
