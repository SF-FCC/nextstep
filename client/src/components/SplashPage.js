import React, { Component } from "react";
import styles from "./SplashPage.module.css";
import g_styles from "../globals.module.css";
import { NavLink } from "react-router-dom";

/**
 * The splash page a user lands on when not logged in
 */
export default class SplashPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.value_prop}>
          Manage all your opportunities in one central location.
        </h1>
        <div className={styles.cool_image} />
        <NavLink className={g_styles.primary_button + " " + styles.login_button} to="/login">
          Try it for free
        </NavLink>
      </div>
    );
  }
}
