import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./AccountDropdown.module.css";
import { connect } from "react-redux";
import { logout } from "../actions";

/**
 * Dropdown display when account is clicked in the header.
 * This will only be visible when a user is logged in.
 */
const AccountDropdown = ({ isVisible, email, logout, onHide }) => {
  if (!isVisible) return null;
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.email}>{email}</li>
        <li className={styles.settings}>
          <NavLink to="/account">Settings</NavLink>
        </li>
        <li
          className={styles.button}
          onClick={() => {
            logout();
            onHide();
          }}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

AccountDropdown.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    email: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDropdown);
