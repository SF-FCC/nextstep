import React, { Component } from "react";
import styles from "./SplashPage.module.css";

/**
 * The splash page a user lands on when not logged in
 */
export default class SplashPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.value_prop}>
          Track your stuff and be awesome! Aslo some other thing that sounds cool.
        </p>
        <div className={styles.cool_image} />
      </div>
    );
  }
}
