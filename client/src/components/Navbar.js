import React, { Component } from "react";
import AccountDropdown from "./AccountDropdown";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navbar.module.css";
import { clearLoginError, clearRegisterError } from "../actions/userActions";
import Dropdown from "./Dropdown";
import classNames from "classnames";

/**
 * The header navigation bar that displays location and login/account.
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingNavDropdown: false
    };
  }

  toggleNavDropdown = e => {
    this.setState({ isShowingNavDropdown: !this.state.isShowingNavDropdown });
  };
  render() {
    return (
      <nav style={{ position: "relative" }}>
        <ul className={styles.nav_list}>
          <li className={styles.display_left}>
            <NavLink exact to="/" className={styles.nav_list__header}>
              NextStep
            </NavLink>
          </li>
          {this.props.isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={this.toggleNavDropdown}
                  className={classNames([styles.hamburger], [styles.stick_top_right], {
                    [styles.hamburger_Active]: this.state.isShowingNavDropdown
                  })}
                >
                  &#9776;
                </button>
              </li>
              <li>
                <NavLink
                  exact
                  to="/"
                  className={classNames([styles.nav_list__item], {
                    [styles.hide]: !this.state.isShowingNavDropdown
                  })}
                  activeClassName={styles.nav_list__item_Active}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tracker"
                  className={classNames([styles.nav_list__item], {
                    [styles.hide]: !this.state.isShowingNavDropdown
                  })}
                  activeClassName={styles.nav_list__item_Active}
                >
                  Tracker
                </NavLink>
              </li>
              <li>
                <Dropdown
                  alignRight
                  dropComponent={<AccountDropdown onHide={this.toggleNavDropdown} />}
                  displayComponent={
                    <button
                      className={classNames([styles.nav_list__item], {
                        [styles.hide]: !this.state.isShowingNavDropdown
                      })}
                    >
                      Account
                    </button>
                  }
                />
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className={styles.nav_list__item + " " + styles.stick_top_right}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  // Necessary to trigger renders on url change
  location: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    clearLoginError: () => dispatch(clearLoginError()),
    clearRegisterError: () => dispatch(clearRegisterError())
  };
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user && state.user.isLoggedIn,
    location: state.location
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
