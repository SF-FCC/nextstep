import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

class AccountDropdown extends Component {
  componentDidMount() {
    document.addEventListener("click", this.onOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onOutsideClick, false);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  onOutsideClick = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.toggleAccountDropdown();
    }
  };

  render() {
    return (
      <div className={styles.dropdownContainer} ref={this.setWrapperRef}>
        <ul className={styles.dropdownUl}>
          <li className={styles.userLi}>useremail@mail.com</li>
          <li onClick={this.props.toggleAccountDropdown} className={styles.emailPasswordLi}>
            <NavLink to="/account">Email & Password</NavLink>
          </li>
          <li className={styles.signoutLi}>Sign Out</li>
        </ul>
      </div>
    );
  }
}

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
