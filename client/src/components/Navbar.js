import React, { Component } from "react";
import AccountDropdown from "./AccountDropdown";
import LoginPanel from "./LoginPanel";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navbar.module.css";

/**
 * The header navigation bar that displays location and login/account.
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleAccountDropdown = () => {
    this.setState({ isShowingAccountDropdown: !this.state.isShowingAccountDropdown });
  };

  showLoginModal = () => {
    this.setState({ isShowingLoginModal: !this.state.isShowingLoginModal });
  };

  login = () => {
    alert("This is where you would login....");
  };

  render() {
    return (
      <nav style={{ position: "relative" }}>
        <ul className={styles.nav_list}>
          <li className={styles.display_left}>
            <NavLink exact to="/" className={styles.nav_list__item}>
              NextStep
            </NavLink>
          </li>
          {this.props.isLoggedIn ? (
            <>
              <li>
                <NavLink
                  exact
                  to="/"
                  className={styles.nav_list__item}
                  activeClassName={styles.nav_list__item_Active}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tracker"
                  className={styles.nav_list__item}
                  activeClassName={styles.nav_list__item_Active}
                >
                  Tracker
                </NavLink>
              </li>
              <li>
                <button className={styles.nav_list__item} onClick={this.toggleAccountDropdown}>
                  Account
                </button>
              </li>
            </>
          ) : (
            <li>
              <button className={styles.nav_list__item} onClick={this.showLoginModal}>
                Login
              </button>
            </li>
          )}
        </ul>
        <AccountDropdown isVisible={this.state.isShowingAccountDropdown} />
        <LoginPanel isVisible={this.state.isShowingLoginModal} />
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  // Necessary to trigger renders on url change
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    location: state.location
  };
};

export default connect(mapStateToProps)(Navbar);
