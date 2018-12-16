import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import "./Navbar.css";

const AccountDropdown = ({ toggleAccountDropdown }) => {
  return (
    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdownUl}>
        <li className={styles.userLi}>useremail@mail.com</li>
        <li onClick={toggleAccountDropdown} className={styles.emailPasswordLi}>
          <NavLink to="/account">Email & Password</NavLink>
        </li>
        <li className={styles.signoutLi}>Sign Out</li>
      </ul>
    </div>
  );
};

/**
 * The header navigation bar that displays location and login/account.
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccountDropdown: false
    };
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
  }
  toggleAccountDropdown() {
    this.setState({ showAccountDropdown: !this.state.showAccountDropdown });
  }
  render() {
    return (
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink to="/dashboard">NextStep</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName="nav-active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracker" activeClassName="nav-active">
              Tracker
            </NavLink>
          </li>
          <li className={styles.accountLi} onClick={this.toggleAccountDropdown}>
            Account
          </li>
        </ul>
        {this.state.showAccountDropdown && (
          <AccountDropdown toggleAccountDropdown={this.toggleAccountDropdown} />
        )}
      </nav>
    );
  }
}

export default Navbar;
