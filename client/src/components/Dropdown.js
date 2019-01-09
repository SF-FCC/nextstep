import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Dropdown.module.css";
import classNames from "classnames";

/**
 * Helper component that displays child components in a dropdown under the parent component.
 */
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, willTriggerMount: true, waitForTransition: false };
  }

  showDropdown = () => {
    if (this.state.waitForTransition) return;
    this.setState({ isVisible: true });
  };

  hideDropdown = () => {
    if (this.state.waitForTransition) return;
    this.setState({ isVisible: false });
  };

  // If optimization becomes necessary, could potentially use an observer pattern.
  // This source may contain ideas https://github.com/juji/react-event-observer
  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeydown);
  }

  /**
   * This allows the children to mount in a transparent state which then immediately triggers
   * another render with the visible styles. This is critical to sync up the css transitions
   * which is currently 300ms.
   */
  componentDidUpdate(prevProps, prevState) {
    const { isVisible, willTriggerMount } = this.state;
    if (isVisible !== prevState.isVisible) {
      if (isVisible && willTriggerMount) {
        setTimeout(() => this.setState({ willTriggerMount: false }), 0);
      } else {
        // This syncs up with the css transition time of the notVisible class
        this.setState({ waitForTransition: true });
        setTimeout(() => this.setState({ willTriggerMount: true, waitForTransition: false }), 300);
      }
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  setComponentRef = node => {
    this.componentRef = node;
  };

  handleKeydown = event => {
    if (this.state.waitForTransition) return;
    if (event.key === "Escape") {
      this.setState({ isVisible: false });
    }
  };

  handleClickOutside = event => {
    if (this.state.waitForTransition || !this.wrapperRef || !this.componentRef) return;
    if (!this.wrapperRef.contains(event.target)) {
      this.setState({ isVisible: false });
    }
  };

  renderDropdown() {
    const { alignRight } = this.props;
    let { isVisible } = this.state;
    if (!isVisible && this.state.willTriggerMount) {
      return null;
    }
    if (this.state.willTriggerMount) {
      isVisible = false;
    }
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
          {React.cloneElement(this.props.dropComponent, {
            hideDropdown: this.hideDropdown
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {React.cloneElement(this.props.displayComponent, {
          onClick: this.showDropdown,
          ref: this.setComponentRef
        })}
        {this.renderDropdown()}
      </>
    );
  }
}

Dropdown.propTypes = {
  alignRight: PropTypes.bool,
  dropComponent: PropTypes.element,
  displayComponent: PropTypes.element
};
