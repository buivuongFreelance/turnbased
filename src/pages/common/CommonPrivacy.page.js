import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";

import axios from "axios";

class CommonPrivacy extends Component {
  componentDidMount() {
    axios.get('http://dingtoi.com:30080/api/v1/modelDetails?limit=300&pageNum=1')
      .then((data) => {
        console.log('model details', data);
      })
  }
  render() {
    return (
      <div>
        <form>
          <select>

          </select>
        </form>
        <div className="uk-background-cover uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-light"
          style={{ backgroundImage: 'url(../images/banner.jpg)' }}>
          <p className="uk-h1">Privacy Policy</p>
        </div>
        <div className="uk-container uk-padding-large">
          <h2>Privacy Policy</h2>
          <p>Your privacy is important to Swap-ez so we’ve developed a Privacy Policy that covers how we collect, use, disclose, transfer, and store your personal information. In addition to this Privacy Policy, we provide data and privacy information imbedded in our products for certain features that ask to use your personal information. You can review this information before enabling these features, in Settings related to those features or online at</p>
          <h2>Collection and Use of Personal Information</h2>
          <p>Personal information is data that can be used to identify or contact a single person.</p>
          <p>You may be asked to provide your personal information anytime you are in contact with Swap-ez or an Swap-ez affiliated company. Swap-ez and its affiliates may share this personal information with each other and use it consistent with this Privacy Policy. They may also combine it with other information to provide and improve our products, services, content, and advertising. You are not required to provide the personal information that we have requested, but, if you chose not to do so, in many cases we will not be able to provide you with our products or services or respond to any queries you may have.</p>
          <h2>What personal information we collect</h2>
          <ul>
            <li>When you create an Swap-ez ID, apply for commercial credit, purchase a product, download a software update, register for a class at an Swap-ez Retail Store, connect to our services, contact us or participate in an online survey, we may collect a variety of information, including your name, mailing address, phone number, email address, contact preferences, device identifiers, IP address, location information and credit card information.</li>
            <li>When you share your content with family and friends using Swap-ez products, send gift certificates and products, or invite others to participate in Swap-ez services or forums, Swap-ez may collect the information you provide about those people such as name, mailing address, email address, and phone number. Swap-ez will use such information to fulfill your requests, provide the relevant product or service, or for anti-fraud purposes.</li>
            <li>In certain jurisdictions, we may ask for a government issued ID in limited circumstances including when setting up a wireless account and activating your device, for the purpose of extending commercial credit, managing reservations, or as required by law.</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withApp(CommonPrivacy);
