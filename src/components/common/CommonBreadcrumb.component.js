import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth, selectTranslator } from "../../redux/screen/screen.selectors";

import { withRouter } from "react-router-dom";
import { IS_MOBILE } from "../../config";

class CommonBreadcrumb extends Component {
  onRedirect(uri) {
    const { history } = this.props;
    history.push('/' + uri);
  }
  render() {
    const { list, screenWidth, translator } = this.props;
    const lastIndex = parseInt(list.length - 1);

    if (screenWidth === IS_MOBILE)
      return null;
    else
      return (
        <div className="uk-container">
          <ul className="uk-breadcrumb">
            <li>
              <a onClick={this.onRedirect.bind(this, '')}
                id="cy-breadcrumb-home">
                {translator.translate('title_home')}
              </a>
            </li>
            {
              this.props.list.map((item, index) => {
                if (index === lastIndex)
                  return (
                    <li key={index}>
                      <a id={item.id}>
                        {item.name}
                      </a>
                    </li>
                  )
                else
                  return (
                    <li key={index}>
                      <a onClick={this.onRedirect.bind(this, item.uri)}
                        id={item.id}>
                        {item.name}
                      </a>
                    </li>
                  )
              })
            }
          </ul>
        </div>
      )
  }
}

CommonBreadcrumb.propTypes = {
  list: PropTypes.array.isRequired
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  translator: selectTranslator
});

export default connect(mapStateToProps)(withRouter(CommonBreadcrumb));
