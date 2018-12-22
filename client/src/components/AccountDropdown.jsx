import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./AccountDropdown.module.css";
import { connect } from "react-redux";
import "./Navbar.css";

/**
 * Dropdown display when account is clicked in the header.
 * This will only be visible when a user is logged in.
 */
const AccountDropdown = ({ isShowing, email }) => {
  if (!isShowing) return null;
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.email}>{email}</li>
        <li className={styles.settings}>
          <NavLink to="/account">Settings</NavLink>
        </li>
        <li className={styles.button}>Sign Out</li>
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
    email: state.email
  };
};

export default connect(mapStateToProps)(AccountDropdown);
