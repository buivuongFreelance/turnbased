import React, { Component } from "react";

import Reaptcha from "reaptcha";

class CommonCaptcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommonCaptchaReady: false
    }
    this.onLoad = this.onLoad.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reset !== this.props.reset) {
      this.CommonCaptcha.reset();
    } if (prevState.CommonCaptchaReady !== this.state.CommonCaptchaReady) {
      if (this.state.CommonCaptchaReady)
        this.CommonCaptcha.renderExplicitly();
    }
  }
  onLoad() {
    this.setState({
      CommonCaptchaReady: true
    });
  }
  render() {
    return (
      <div>
        <Reaptcha sitekey={process.env.reCommonCaptcha_KEY}
          onLoad={this.onLoad}
          explicit
          {...this.props}
          ref={e => (this.CommonCaptcha = e)}
          hl="en" />
      </div>
    )
  }
}

export default CommonCaptcha
