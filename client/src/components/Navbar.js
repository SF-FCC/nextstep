import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import './Navbar.css';

const AccountDropdown = () => {
  return (
    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdownUl}>
        <li className={styles.userLi}>useremail@mail.com</li>
        <li className={styles.emailPasswordLi}>Email & Password</li>
        <li className={styles.signoutLi}>Sign Out</li>
      </ul>
    </div>
  )
}

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
          <li 
            className={styles.accountLi}
            onClick={this.toggleAccountDropdown}>Account</li>
        </ul>
        {this.state.showAccountDropdown && <AccountDropdown />}
      </nav>
    );
  }
}

export default Navbar;
