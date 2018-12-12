import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Account from './Account';
import './Navbar.css';

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
          <li>
            <NavLink to="/account" activeClassName="nav-active">
              Account
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
