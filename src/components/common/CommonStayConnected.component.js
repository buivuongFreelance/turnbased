import React, { Component } from "react";

class CommonStayConnected extends Component {

  render() {
    return (
      <ul className="uk-list">
        <li>
          STAY CONNECTED
        </li>
        <li>
          <ul className="wc-social-icons">
            <li className="facebook">
              <a>
                <i className="fa fa-facebook fa-lg" />
              </a>
            </li>
            <li className="twitter">
              <a>
                <i className="fa fa-twitter fa-lg" />
              </a>
            </li>
            <li className="gplus">
              <a>
                <i className="fa fa-google-plus fa-lg" />
              </a>
            </li>
          </ul>
        </li>
        <li className="uk-margin-medium-top">
          SIGN UP FOR OUR NEWSLETTER
        </li>
        <li className="uk-margin-top">
          <div>
            <div className="wc-input-newsletter">
              <input type="email" placeholder="Enter Your Email Address" required />
              <input type="submit" value="SUBMIT" />
            </div>
          </div>
        </li>
      </ul>
    )
  }
}
export default CommonStayConnected;
