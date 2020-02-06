import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsOpenSidebar, selectScreenWidth, selectTriggerSearch, selectTranslator } from "../../redux/screen/screen.selectors";
import { toggleSidebar, setCategoryId, triggerSearchMenu } from "../../redux/screen/screen.actions";
import { logoutStart } from "../../redux/user/user.actions";

import { selectCurrentUser } from "../../redux/storage/storage.selectors";

import { slide as Menu } from "react-burger-menu";
import { IS_TABLET, SMARTPHONE_ID, TABLET_ID, SMARTWATCH_ID } from "../../config";
import Logo from "./CommonLogo.component";

import { withRouter } from "react-router";

import CommonSearchMenu from "./CommonSearchMenu.component";

class CommonSidebarNav extends Component {
  constructor(props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
    this.onCloseSidebar = this.onCloseSidebar.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      isSearch: false
    }
  }
  componentDidUpdate() {
    if (this.props.triggerSearch) {
      this.setState({
        isSearch: true
      }, () => {
        this.props.triggerSearchMenu(false);
      });
    }
  }
  handleClickSearchItem(id) {
    this.props.toggleSidebar(false);

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/device/' + id);
    }, 500);
  }
  handleSearch(value) {
    this.setState({ isSearch: false }, () => {
      this.props.toggleSidebar(false);
      const { setCategoryId, history } = this.props;
      setCategoryId('categoryTitle', {
        type: 'bestMatch',
        value
      });
      history.push('/empty');
      setTimeout(() => {
        history.replace('/category');
      }, 500);
    });
  }
  handleFilterOneCategory(name) {
    const { setCategoryId } = this.props;

    setCategoryId('categoryIds', [name]);
    this.props.toggleSidebar(false);

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  handleFilterBrand(brand) {
    const { setCategoryId } = this.props;
    setCategoryId('brandIds', [brand]);
    this.props.toggleSidebar(false);

    const { history } = this.props;
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  onStateChange(state) {
    const { isOpen } = state;

    if (isOpen === false) {
      this.setState({ isSearch: false }, () => {
        this.props.toggleSidebar(false);
      })
    }
  }
  onCloseSidebar() {
    this.props.toggleSidebar(false);
  }
  onRedirect(url) {
    const { history } = this.props;
    this.props.toggleSidebar(false);
    setTimeout(() => {
      history.push('/' + url);
    }, 500);
  }
  onLogout() {
    const { logoutStart, history, toggleSidebar } = this.props;
    logoutStart(history);
    toggleSidebar(false);
    history.push('/empty');
    setTimeout(() => {
      history.replace('/');
    }, 500);
  }
  handleFilterCategory(name) {
    const { setCategoryId, toggleSidebar } = this.props;

    switch (name) {
      case 'Smart Phones':
        setCategoryId('categoryIds', [SMARTPHONE_ID]);
        break;
      case 'Tablets':
        setCategoryId('categoryIds', [TABLET_ID]);
        break;
      case 'Smart Watches':
        setCategoryId('categoryIds', [SMARTWATCH_ID]);
        break;
    }
    const { history } = this.props;
    toggleSidebar(false);
    history.push('/empty');
    setTimeout(() => {
      history.replace('/category');
    }, 500);
  }
  renderMenu() {
    const { user, translator } = this.props;

    return (
      <Fragment>
        <div className="wc-sidebar-search uk-search uk-search-default wc-sidebar-search">
          <span className="uk-icon uk-search-icon">
            <img src="icons/iconmonstr-search-thin-240.png" alt="search" width="20" height="20" />
          </span>
          <input className="uk-search-input" type="search" placeholder="Search..."
            onFocus={() => this.setState({ isSearch: true })} />
        </div>
        <div className="wc-sidebar-link">
          <a onClick={this.onRedirect.bind(this, '')}>{translator.translate('title_home')}</a>
        </div>
        <div className="wc-sidebar-link">
          <a onClick={() => this.handleFilterCategory('Smart Phones')}>
            {translator.translate('title_category_smartphones')}
          </a>
        </div>
        <div className="wc-sidebar-link">
          <a onClick={() => this.handleFilterCategory('Tablets')}>
            {translator.translate('title_category_tablets')}
          </a>
        </div>
        <div className="wc-sidebar-link">
          <a onClick={() => this.handleFilterCategory('Smart Watches')}>
            {translator.translate('title_category_smartwatches')}
          </a>
        </div>
        <div className="wc-sidebar-link">
          <a onClick={() => {
            const { user } = this.props;
            if (!user) {
              this.onRedirect('signInAndSignUp');
            } else {
              this.onRedirect('account/wishlist');
            }

          }}>My Wishlist</a>
        </div>
        {
          !user &&
          <React.Fragment>
            <div className="wc-sidebar-link">
              <a onClick={this.onRedirect.bind(this, 'signInAndSignUp')}
                id="common-header-login-or-register">
                {translator.translate('btn_login')}
              </a>
            </div>
            <div className="wc-sidebar-link">
              <a onClick={this.onRedirect.bind(this, 'signUp')}
                id="common-header-register">
                {translator.translate('btn_register')}
              </a>
            </div>
          </React.Fragment>
        }
        {
          user &&
          <React.Fragment>
            <div className="wc-sidebar-link">
              <a onClick={this.onRedirect.bind(this, 'account/device')}>
                {translator.translate('title_my_account')}
              </a>
            </div>
            <div className="wc-sidebar-link">
              <a id="common-header-logout" onClick={this.onLogout}>{translator.translate('btn_logout')}</a>
            </div>
          </React.Fragment>
        }
      </Fragment>
    )
  }
  render() {
    const { width } = this.props;
    const { isSearch } = this.state;

    return (
      <Menu
        pageWrapId="page-wrap"
        isOpen={this.props.isOpen}
        width={width === IS_TABLET ? '70%' : '100%'}
        onStateChange={this.onStateChange}
        customBurgerIcon={false}
        customCrossIcon={false}
        left>
        <div className={"wc-sidebar-wrapper uk-container menu " +
          (width === IS_TABLET ? 'sidebar-menu-tablet' : 'sidebar-menu-mobile')}
          style={{ maxHeight: '100vh', overflow: 'auto' }}>
          <div className="wc-sidebar-nav">
            <div className="wc-sidebar-header">
              <div className="wc-close-button" onClick={this.onCloseSidebar}>
                <img src="icons/iconmonstr-x-mark-thin-240.png" alt="close" width="20" height="20" />
              </div>
              <div onClick={this.onRedirect.bind(this, '')}>
                <Logo type="header" />
              </div>
            </div>
            {
              isSearch
                ?
                <CommonSearchMenu
                  onClickSearchItem={(id) => this.handleClickSearchItem(id)}
                  onSearch={(value) => this.handleSearch(value)}
                  onCancelSearch={() => this.setState({ isSearch: false })}
                  onFilterCategory={(name) => this.handleFilterOneCategory(name)}
                  onFilterBrand={((brand) => this.handleFilterBrand(brand))} />
                : this.renderMenu()
            }
          </div>
        </div>
      </Menu>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpenSidebar,
  width: selectScreenWidth,
  user: selectCurrentUser,
  triggerSearch: selectTriggerSearch,
  translator: selectTranslator
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: status => dispatch(toggleSidebar(status)),
  logoutStart: history => dispatch(logoutStart({ history })),
  setCategoryId: (field, value) => dispatch(setCategoryId(field, value)),
  triggerSearchMenu: (status) => dispatch(triggerSearchMenu(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonSidebarNav));
