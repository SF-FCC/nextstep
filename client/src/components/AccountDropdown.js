import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./AccountDropdown.module.css";
import { connect } from "react-redux";
import { logout } from "../actions";

/**
 * Displays account info and navigation
 */
const AccountDropdown = ({ email, logout }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.dropdown}>
        <li className={styles.list_item + " " + styles.email}>{email}</li>
        <li className={styles.list_item}>
          <NavLink to="/account">Settings</NavLink>
        </li>
        <li
          className={styles.list_item + " " + styles.button}
          onClick={() => {
            logout();
          }}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

AccountDropdown.propTypes = {
  email: PropTypes.string
};

AccountDropdown.defaultProps = {
  email: ""
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
