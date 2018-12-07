import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountForm from './AccountForm';
import PropTypes from 'prop-types';

class Account extends Component {
  render() {
    return (
      <div>
        <p>one@one.com</p>
         <hr/>
         <Link to='/account/form'>
           <span onClick={this.props.hideDropdown}>settings</span>
         </Link>
         <hr />
         <a href=''>sign out</a>
      </div>
    )
  }
}

Account.propTypes = {
  hideDropdown: PropTypes.func,
}

export default Account;
