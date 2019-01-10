import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./AccountDropdown.module.css";
import { connect } from "react-redux";
import { logout } from "../actions";

/**
 * Displays account info and navigation
 */
const AccountDropdown = ({ email, logout, onHide, hideDropdown }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.dropdown}>
        <li>
          <p className={styles.list_item + " " + styles.email}>{email}</p>
        </li>
        <li>
          <NavLink
            className={styles.list_item + " " + styles.hover_background}
            onClick={() => hideDropdown()}
            to="/account"
          >
            Settings
          </NavLink>
        </li>
        <li
          onClick={() => {
            logout();
            onHide();
          }}
        >
          <p className={styles.list_item + " " + styles.button + " " + styles.hover_background}>
            Sign Out
          </p>
        </li>
      </ul>
    </div>
  );
};

AccountDropdown.propTypes = {
  email: PropTypes.string,
  onHide: PropTypes.func,
  hideDropdown: PropTypes.func
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
