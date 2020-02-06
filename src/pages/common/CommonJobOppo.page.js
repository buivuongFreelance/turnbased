import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";
import { IS_MOBILE } from "../../config";

class CommonJobOppo extends Component {
  render() {
    const { screenWidth } = this.props;
    return (
      <div>
        <div className="uk-background-cover uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-light"
          style={{ backgroundImage: 'url(../images/banner-job.jpg)' }}>
          <p className="uk-h1">Job Opportunities</p>
        </div>
        <div className="uk-container uk-padding-large">
          <div className="uk-flex-middle uk-flex uk-flex-column uk-text-center">
            <p className={"uk-text-xlarge " +
              (screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2')}>
              This is where some of the world’s smartest, most passionate people create the world’s most innovative products and experiences. Join us and you’ll do the best work of your life — and make a difference in other people’s lives.</p>
            <a className="uk-text-xlarge uk-margin-large-bottom">Learn more about working at Swap-ez</a>
          </div>
          <div className={"uk-grid-collapse uk-margin-large-top uk-grid " +
            (screenWidth === IS_MOBILE ? 'uk-child-width-1-1' : 'uk-child-width-1-2')}>
            <div className="uk-first-column">
              <a className="uk-link-reset">
                <div className="uk-margin-xsmall-right uk-margin-xsmall-bottom uk-inline">
                  <img src="http://159.203.45.120:7000/job-1.jpg" />
                  <div className="uk-padding uk-position-top-left uk-text-primary">
                    <div className="uk-text-xlarge">About Dingtoi</div>
                    <div className="uk-h3 uk-margin-remove">See what driver us</div>
                  </div>
                </div>
              </a>
            </div>
            <div>
              <a className="uk-link-reset">
                <div className="uk-margin-xsmall-right uk-margin-xsmall-bottom uk-inline">
                  <img src="http://159.203.45.120:7000/job-2.jpg" />
                  <div className="uk-padding uk-position-top-left uk-text-primary">
                    <div className="uk-text-xlarge">Team</div>
                    <div className="uk-h3 uk-margin-remove">Find your calling</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="uk-first-column uk-grid-margin">
              <a className="uk-link-reset">
                <div className="uk-margin-xsmall-right uk-margin-xsmall-bottom uk-inline">
                  <img src="http://159.203.45.120:7000/job-3.jpg" />
                  <div className="uk-padding uk-position-top-left uk-text-primary">
                    <div className="uk-text-xlarge">Dingtoi Retail</div>
                    <div className="uk-h3 uk-margin-remove">Share Dingtoi with your community</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="uk-grid-margin">
              <a className="uk-link-reset">
                <div className="uk-margin-xsmall-right uk-margin-xsmall-bottom uk-inline">
                  <img src="http://159.203.45.120:7000/job-4.jpg" />
                  <div className="uk-padding uk-position-top-left uk-text-primary">
                    <div className="uk-text-xlarge">Student</div>
                    <div className="uk-h3 uk-margin-remove">Get your start here</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="uk-padding-large uk-padding-remove-bottom">
            <div className="uk-flex-middle uk-flex uk-flex-column uk-text-center">
              <p className={"uk-text-xlarge uk-margin-remove " +
                (screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2')}>
                <b>Get discovered.</b> Introduce yourself, and we’ll get in touch if there’s a role that seems like a good match.
              </p>
              <a className="uk-text-xlarge">Get started</a>
            </div>
            <div className="uk-flex-middle uk-flex uk-flex-column uk-text-center uk-margin-top">
              <p className={"uk-text-xlarge uk-margin-remove " +
                (screenWidth === IS_MOBILE ? 'uk-width-1-1' : 'uk-width-1-2')}>
                <b>Swap-ez is open.</b> We believe humanity is plural, not singular. The best way the world works is everybody in. Nobody out.</p>
              <a className="uk-text-xlarge">Learn more</a>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default withApp(CommonJobOppo);
