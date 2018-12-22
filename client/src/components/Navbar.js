import React, { Component } from "react";
import AccountDropdown from "./AccountDropdown";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navbar.module.css";
import "./Navbar.css";

/**
 * The header navigation bar that displays location and login/account.
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggleAccountDropdown = () => {
    this.setState({ isShowingAccountDropdown: !this.state.isShowingAccountDropdown });
  };
  render() {
    return (
      <nav>
        <ul className={styles.nav_list}>
          <li className={styles.nav_list__item}>
            <NavLink to="/dashboard">NextStep</NavLink>
          </li>
          <li className={styles.nav_list__item}>
            <NavLink to="/dashboard" activeClassName="nav-active">
              Dashboard
            </NavLink>
          </li>
          <li className={styles.nav_list__item}>
            <NavLink to="/tracker" activeClassName="nav-active">
              Tracker
            </NavLink>
          </li>
          {this.props.isLoggedIn ? (
            <li className={styles.nav_list__item} onClick={this.login}>
              Login
            </li>
          ) : (
            <li className={styles.nav_list__item} onClick={this.toggleAccountDropdown}>
              Account
            </li>
          )}
        </ul>
        <AccountDropdown isVisible={this.state.isShowingAccountDropdown} />
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(mapStateToProps)(Navbar);
