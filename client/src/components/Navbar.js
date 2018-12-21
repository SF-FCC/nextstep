import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

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

  componentDidMount() {
    document.addEventListener("click", this.outsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.outsideClick, false);
  }

  toggleAccountDropdown() {
    this.setState({ showAccountDropdown: !this.state.showAccountDropdown });
  }

  outsideClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.setState({ showAccountDropdown: false });
    }
  };

  render() {
    return (
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/dashboard">NextStep</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName={styles.navActive}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracker" activeClassName={styles.navActive}>
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
