import React, { Component } from "react";
import AccountDropdown from "./AccountDropdown";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navbar.module.css";
console.log("styles found");
console.log(styles);

/**
 * The header navigation bar that displays location and login/account.
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleAccountDropdown = () => {
    this.setState({ isShowingAccountDropdown: !this.state.isShowingAccountDropdown });
  };

  login = () => {
    alert("This is where you would login....");
  };

  render() {
    return (
      <nav>
        <ul className={styles.nav_list}>
          <li className={styles.display_left}>
            <NavLink exact to="/" className={styles.nav_list__item}>
              NextStep
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/"
              className={styles.nav_list__item}
              activeClassName={styles.nav_list__item_Active}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tracker"
              className={styles.nav_list__item}
              activeClassName={styles.nav_list__item_Active}
            >
              Tracker
            </NavLink>
          </li>
          {this.props.isLoggedIn ? (
            <li>
              <button className={styles.nav_list__item} onClick={this.toggleAccountDropdown}>
                Account
              </button>
            </li>
          ) : (
            <li>
              <button className={styles.nav_list__item} onClick={this.login}>
                Login
              </button>
            </li>
          )}
        </ul>
        <AccountDropdown isVisible={this.state.isShowingAccountDropdown} />
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  // Necessary to trigger renders on url change
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    location: state.location
  };
};

export default connect(mapStateToProps)(Navbar);
