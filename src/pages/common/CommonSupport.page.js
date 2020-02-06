import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE, IS_TABLET, IS_PC } from "../../config";

class CommonSupportPage extends Component {
  constructor(props) {
    super(props);
  }
  renderQuestionCopy() {
    let classGridItem = ['uk-grid-margin'];
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_TABLET:
        classGridItem.push('uk-width-1-2');
        break;
      case IS_PC:
        classGridItem.push('uk-width-1-2');
        break;
    }
    return (
      <div className={classGridItem.join(' ')}>
        <div className="uk-text-center uk-card uk-card-default uk-card-body uk-cursor">
          <h2>Copyright and Trademarks</h2><i className="fa fa-copyright fa-5x" aria-hidden="true"></i>
          <div className="uk-margin-top">Find out about Copyright and Trademark protection, what Intellectual Property is, and why it is important to you.</div>
        </div>
      </div >
    )
  }
  renderQuestionTax() {
    let classGridItem = ['uk-grid-margin'];
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_TABLET:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_PC:
        classGridItem.push('uk-width-1-2');
        break;
    }
    return (
      <div className={classGridItem.join(' ')}>
        <div className="uk-text-center uk-card uk-card-default uk-card-body uk-cursor">
          <h2>Tax & Compliance</h2><i className="fa fa-calculator fa-5x" aria-hidden="true"></i>
          <div className="uk-margin-top">Information to help you understand tax and compliance on Envato Market.</div>
        </div>
      </div>
    )
  }
  renderQuestion() {
    let classGridItem = ['uk-grid-margin'];

    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_TABLET:
        classGridItem.push('uk-width-1-2');
        break;
      case IS_PC:
        classGridItem.push('uk-width-1-3');
        break;
    }
    return (
      <div className="uk-grid uk-grid-match">
        <div className={classGridItem.join(' ')}>
          <div className="uk-text-center uk-card uk-card-default uk-card-body uk-cursor">
            <h2>Buying Support</h2><i className="fa fa-life-ring fa-5x" aria-hidden="true"></i>
            <div className="uk-margin-top">If you need help before, during or after your purchase, this is the place to be.</div>
          </div>
        </div>
        <div className={classGridItem.join(' ')}>
          <div className="uk-text-center uk-card uk-card-default uk-card-body uk-cursor">
            <h2>Licensing</h2><i className="fa fa-sticky-note-o fa-5x" aria-hidden="true"></i>
            <div className="uk-margin-top">Have a question about licensing? Check out our frequently asked questions to find your answer.</div>
          </div>
        </div>
        <div className={classGridItem.join(' ')}>
          <div className="uk-text-center uk-card uk-card-default uk-card-body uk-cursor">
            <h2>Your Account</h2><i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
            <div className="uk-margin-top">Set up your account and keep it safe and sound.</div>
          </div>
        </div>
        {this.renderQuestionCopy()}
        {this.renderQuestionTax()}
      </div>
    )
  }
  renderGettingStarted() {
    let classGridItem = ['uk-flex uk-flex-middle'];
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_TABLET:
        classGridItem.push('uk-width-1-2 uk-grid-margin');
        break;
      case IS_PC:
        classGridItem.push('uk-width-1-2 uk-grid-margin');
        break;
    }

    return (
      <div className="uk-grid">
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            How do I purchase an item?
                </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            How to Download your items?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            View and Download invoices?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            Licenses Overview?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            Do I need a Regular License or an Extended License?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            How Does The Envato Market Affiliate Program Work?
              </a>
        </div>
      </div>
    )
  }
  renderPopularArticles() {
    let classGridItem = ['uk-flex uk-flex-middle'];
    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_TABLET:
        classGridItem.push('uk-width-1-2 uk-grid-margin');
        break;
      case IS_PC:
        classGridItem.push('uk-width-1-2 uk-grid-margin');
        break;
    }

    return (
      <div className="uk-grid">
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            Where Is My Purchase Code?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            What is Item Support?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            Bundled Plugins
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            Theme is missing the style.css stylesheet error
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            How to contact an author?
              </a>
        </div>
        <div className={classGridItem.join(' ')}>
          <i className="fa fa-question-circle fa-2x uk-margin-xsmall-right"></i>
          <a className="uk-text-xlarge uk-link-reset border-breadcrumb uk-padding-small uk-padding-remove-left uk-width-1-1">
            I have Forgotten My Username Or Password
              </a>
        </div>
      </div>
    )
  }
  renderForums() {
    let classGridItem = ['uk-grid-margin'];

    const { screenWidth } = this.props;

    switch (screenWidth) {
      case IS_MOBILE:
        classGridItem.push('uk-width-1-1');
        break;
      case IS_TABLET:
        classGridItem.push('uk-width-1-2');
        break;
      case IS_PC:
        classGridItem.push('uk-width-1-2');
        break;
    }
    return (
      <div>
        <div className="uk-grid uk-grid-match">
          <div className={classGridItem.join(' ')}>
            <div className="uk-card uk-card-default uk-card-body">
              <h2>Ask in the Forums</h2>
              <button className="uk-button uk-button-primary uk-button-small">JOIN</button>
              <div className="uk-margin-top">Join the conversation! We think you would love our community and it is a great place to find Envato announcements or general help.</div>
            </div>
          </div>
          <div className={classGridItem.join(' ')}>
            <div className="uk-card uk-card-default uk-card-body">
              <h2>Visit Our Blog</h2>
              <button className="uk-button uk-button-primary uk-button-small">VISIT</button>
              <div className="uk-margin-top">We love to share ideas! Visit our blog if you are looking for great articles or inspiration to get you going.</div>
            </div>
          </div>
        </div>
        <div className="uk-text-center uk-card uk-card-body uk-padding-remove-bottom">
          <h2>Still no luck? We can help!</h2>
          <div className="uk-margin-bottom"><i className="fa fa-life-ring fa-5x" aria-hidden="true"></i></div>
          <button className="uk-button uk-button-primary uk-button-small">Submit a request</button>
          <div className="uk-margin-top">Contact us and we will get back to you as soon as possible.</div>
        </div>
      </div>
    )
  }
  render() {
    const { screenWidth } = this.props;
    return (
      <div>
        <div className="uk-padding-small uk-background-cover uk-height-large uk-panel uk-flex uk-flex-column uk-flex-center uk-flex-middle"
          style={{ backgroundImage: 'url(../images/banner-support.jpg)' }}>
          <h1 className="uk-text-white">How can we help?</h1>
          <div className={"uk-inline " + (screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-3')}>
            <span className="uk-form-icon uk-icon" uk-icon="search">
              <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" stroke="#000" strokeWidth="1.1" cx="9" cy="9" r="7"></circle>
                <path fill="none" stroke="#000" strokeWidth="1.1" d="M14,14 L18,18 L14,14 Z"></path>
              </svg>
            </span>
            <input className="uk-input" type="text" placeholder="Ask a question" />
          </div>
        </div>
        <div className="uk-container uk-padding-large">
          <h1 className="uk-padding-remove-bottom uk-margin-remove-bottom">Select a topic</h1>
          {this.renderQuestion()}
          <div className="uk-padding uk-padding-remove-left uk-padding-remove-right">
            <h1 className="uk-padding-remove-bottom uk-margin-remove-bottom">Getting started</h1>
            {this.renderGettingStarted()}
            <h1 className="uk-padding-remove-bottom uk-margin-remove-bottom">Popular articles</h1>
            {this.renderPopularArticles()}
          </div>
          {this.renderForums()}
        </div>
      </div >
    )
  }
}

export default withApp(CommonSupportPage);
