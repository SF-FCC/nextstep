import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Dropdown.module.css";
import classNames from "classnames";

/**
 * Helper component that displays child components in a dropdown under the parent component. *Note children are always mounted.
 */
export default class Dropdown extends Component {
  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeydown);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleKeydown = event => {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose();
    }
  };

  render() {
    const { alignRight, isVisible } = this.props;
    return (
      <div
        className={classNames([styles.outer], {
          [styles.visible]: isVisible,
          [styles.notVisible]: !isVisible,
          [styles.align_right]: alignRight
        })}
        ref={this.setWrapperRef}
      >
        <div
          className={classNames([styles.inner], {
            [styles.slideIn]: isVisible,
            [styles.slideOut]: !isVisible
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
