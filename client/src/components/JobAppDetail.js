// TODO - need to add a job description field

import React, { Component } from "react";
import styles from "./JobAppDetail.module.css";
import g_styles from "../globals.module.css";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { hideJobDetail, updateJobApp } from "../actions";
import JobAppDeleteModal from "./JobAppDeleteModal";
import classNames from "classnames";

class JobAppDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubmitButton: false,
      deleteConfirmationIsShowing: false,
      company_name: props.currentJobApp.company_name,
      job_title: props.currentJobApp.job_title,
      current_status: props.currentJobApp.current_status,
      job_location: props.currentJobApp.job_location,
      job_source: props.currentJobApp.job_source,
      posting_url: props.currentJobApp.posting_url
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleHideJobAppDetail = this.handleHideJobAppDetail.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.hideDeleteConfirmation = this.hideDeleteConfirmation.bind(this);
    this.isActive = this.isActive.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpaque: true });
    }, 20);
  }
  handleInputChange(e) {
    this.setState({
      showSubmitButton: true,
      [e.target.id]: e.target.value
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ showSubmitButton: false });
    const details = {
      id: this.props.currentJobApp.id,
      company_name: this.state.company_name,
      job_title: this.state.job_title,
      current_status: this.state.current_status,
      job_location: this.state.job_location,
      job_source: this.state.job_source,
      active: this.isActive(this.state.current_status),
      posting_url: this.state.posting_url
    };
    this.props.updateJobApp(details);
    // Synced to css transition
    this.setState({ isOpaque: false }, () => {
      setTimeout(() => {
        this.props.hideJobDetail();
      }, 100);
    });
  }
  isActive(status) {
    return ["withdrawn", "expired", "notAFit"].indexOf(status) === -1;
  }
  showDeleteConfirmation() {
    this.setState({ deleteConfirmationIsShowing: true });
  }
  hideDeleteConfirmation() {
    this.setState({ deleteConfirmationIsShowing: false });
  }
  handleHideJobAppDetail(e) {
    if (e.target.id === "formOuterContainer") {
      // Synced to css transition
      this.setState({ isOpaque: false }, () => {
        setTimeout(() => {
          this.props.hideJobDetail();
        }, 100);
      });
    }
  }
  render() {
    const { currentJobApp } = this.props;
    return (
      <div
        id="formOuterContainer"
        onClick={this.handleHideJobAppDetail}
        className={classNames([styles.jobAppDetail__formOuterContainer], {
          [styles.opaque]: this.state.isOpaque
        })}
      >
        <div className={styles.jobAppDetail__formInnerContainer}>
          <div className={styles.jobAppDetail__header}>
            <h3>{currentJobApp.company_name}</h3>
            <span 
              id="formOuterContainer"
              onClick={this.props.handleHideJobAppDetail}
              className={g_styles.close_form}>
              X
            </span>
          </div>
          <form onSubmit={this.handleFormSubmit} className={styles.jobAppDetail__form}>
            <label>
              Company
              <input
                className={styles.jobAppDetail__input}
                onChange={this.handleInputChange}
                id={"company_name"}
                value={this.state.company_name}
              />
            </label>
            <label>
              Job Title
              <input
                className={styles.jobAppDetail__input}
                onChange={this.handleInputChange}
                id={"job_title"}
                value={this.state.job_title}
              />
            </label>
            <label>
              Status
              <select
                className={styles.jobAppDetail__input}
                id="current_status"
                value={this.state.current_status}
                onChange={this.handleInputChange}
              >
                <option value="interested">&#9679; Interested</option>
                <option value="applied">&#9679; Applied</option>
                <option value="phoneCall">&#9679; Phone Call</option>
                <option value="assignment">&#9679; Assignment</option>
                <option value="interview">&#9679; Interview</option>
                <option value="offer">&#9679; Offer</option>
                <option value="accepted">&#9679; Accepted</option>
                <option value="withdrawn">&#9679; Withdrawn</option>
                <option value="expired">&#9679; Expired</option>
                <option value="notAFit">&#9679; Not A Fit</option>
              </select>
            </label>
            <label>
              Location
              <input
                className={styles.jobAppDetail__input}
                onChange={this.handleInputChange}
                id={"job_location"}
                value={this.state.job_location}
              />
            </label>
            <label>
              Source
              <input
                className={styles.jobAppDetail__input}
                onChange={this.handleInputChange}
                id={"job_source"}
                value={this.state.job_source}
              />
            </label>
            <label>
              Job Posting URL
              <input
                className={styles.jobAppDetail__input}
                onChange={this.handleInputChange}
                id={"posting_url"}
                value={this.state.posting_url}
              />
            </label>
            <button
              className={g_styles.primary_button + " " + styles.disabled}
              disabled={!this.state.showSubmitButton}
            >
              submit
            </button>
            <button
              className={styles.jobAppDetail__delete + " " + g_styles.cancel_button}
              type="button"
              onClick={this.showDeleteConfirmation}
            >
              delete this job
            </button>
            {this.state.deleteConfirmationIsShowing && (
              <JobAppDeleteModal
                jobAppId={this.props.currentJobApp.id}
                hideDeleteConfirmation={this.hideDeleteConfirmation}
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

JobAppDetail.propTypes = {
  currentJobApp: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  hideJobDetail: () => dispatch(hideJobDetail()),
  updateJobApp: details => dispatch(updateJobApp(details))
});

export default connect(
  null,
  mapDispatchToProps
)(JobAppDetail);
