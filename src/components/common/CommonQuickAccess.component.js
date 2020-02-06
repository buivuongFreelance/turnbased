import React, { Component } from "react";

class CommonQuickAccess extends Component {
  render() {
    return (
      <div>
        <div className="uk-box-shadow-medium uk-text-uppercase uk-height-small uk-flex uk-flex-middle">
          <div className="uk-padding-small uk-text-small uk-text-uppercase uk-text-emphasis uk-text-bold">
            Quick Access
          </div>
        </div>
        <div className="uk-child-width-1-2 uk-grid uk-grid-small uk-text-center uk-padding-small" uk-grid="true">
          <div className="uk-card uk-first-column">
            <a className="uk-link-reset">
              <div className="uk-quick-access-item uk-text-muted uk-text-small">
                <div>
                  <span uk-icon="icon:phone;ratio:3.5" className="uk-icon">
                    <svg width="70" height="70" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" stroke="#000"
                        d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z">
                      </path>
                      <circle cx="10.5" cy="16.5" r="0.8"></circle>
                    </svg>
                  </span>
                </div>
                <span>Product</span>
              </div>
            </a>
          </div>
          <div className="uk-card">
            <a className="uk-link-reset">
              <div className="uk-quick-access-item uk-text-muted uk-text-small">
                <div>
                  <span uk-icon="icon:user;ratio:3.5" className="uk-icon">
                    <svg width="70" height="70" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" stroke="#000" cx="9.9" cy="6.4" r="4.4"></circle>
                      <path fill="none" stroke="#000" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"></path>
                    </svg>
                  </span>
                </div>
                <span>My Account</span>
              </div>
            </a>
          </div>
          <div className="uk-card uk-grid-margin uk-first-column">
            <a className="uk-link-reset">
              <div className="uk-quick-access-item uk-text-muted uk-text-small">
                <div>
                  <span uk-icon="icon:users;ratio:3.5" className="uk-icon">
                    <svg width="70" height="70" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" stroke="#000" cx="7.7" cy="8.6" r="3.5"></circle>
                      <path fill="none" stroke="#000" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"></path>
                      <path fill="none" stroke="#000" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"></path>
                    </svg>
                  </span>
                </div>
                <span>About Dingtoi</span></div>
            </a>
          </div>
          <div className="uk-card uk-grid-margin">
            <a className="uk-link-reset">
              <div className="uk-quick-access-item uk-text-muted uk-text-small">
                <div><span uk-icon="icon:info;ratio:3.5" className="uk-icon">
                  <svg width="70" height="70" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"></path>
                    <circle fill="none" stroke="#000" cx="10" cy="10" r="9"></circle>
                  </svg>
                </span>
                </div>
                <span>How it work</span></div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
export default CommonQuickAccess;
