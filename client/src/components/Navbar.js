import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <h1>NextStep</h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tracker">Tracker</Link>
        <Link to="/account">Account</Link>
      </div>
    );
  }
}

export default Navbar;
