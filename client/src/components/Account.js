import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../actions'
import { connect } from 'react-redux'

/**
 * This is a small dropdown when you click "Account" in the navbar.
 * "/account/form" is the page where AccountForm will be rendered.
 */
class Account extends Component {
  onSignOut = e => {
    e.preventDefault()
    this.props.dispatch(logout())
  }
  
  render() {
    const { hideDropdown, userEmail } = this.props
    return (
      <div>
        <p>{userEmail}</p>
        <hr />
        <Link to="/account/form">
          <span onClick={hideDropdown}>Settings</span>
        </Link>
        <hr />
        <button onClick={this.onSignOut}>Sign Out</button>
      </div>
    )
  }
}

Account.propTypes = {
  hideDropdown: PropTypes.func,
  userEmail: PropTypes.string,
  dispatch: PropTypes.func
}

export default connect()(Account)
