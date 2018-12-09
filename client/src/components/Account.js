import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AccountForm from './AccountForm'
import PropTypes from 'prop-types'
import { logout } from '../actions'
import { connect } from 'react-redux'

/**
 * Some description.... Is this a header or the actual the account page???
 *
 */
class Account extends Component {
  onSignOut = e => {
    e.preventDefault()
    this.props.dispatch(logout())
  }
  render() {
    const { hideDropdown, email, onSignOut } = this.props
    return (
      <div>
        <p>{email}</p>
        <hr />
        <Link to="/account/form">
          <span onClick={hideDropdown}>settings</span>
        </Link>
        <hr />
        <button onClick={onSignOut}>sign out</button>
      </div>
    )
  }
}

Account.propTypes = {
  hideDropdown: PropTypes.func,
  onSignOut: PropTypes.func,
  userEmail: PropTypes.string,
  dispatch: PropTypes.func
}

export default connect()(Account)
