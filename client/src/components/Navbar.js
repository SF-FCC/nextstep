import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Account from './Account';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccountDropdown: false,
    }
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
  }
  toggleAccountDropdown() {
    this.setState({ showAccountDropdown: !this.state.showAccountDropdown });
  }
  render() {
    return (
      <div>
        <h1>NextStep</h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tracker">Tracker</Link>
        <div>
          <p onClick={this.toggleAccountDropdown}>Account</p>
          {this.state.showAccountDropdown && <Account />}
        </div>
      </div>
    );
  }
}

export default Navbar;
