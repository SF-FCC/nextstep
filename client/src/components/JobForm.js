import React, { Component } from "react";
import PropTypes from "prop-types";
import { sources } from "../data";
import styles from "./JobForm.module.css";
import { connect } from "react-redux";
import { hideJobForm, postJobApp } from "../actions";

const SourceOptionsList = ({ companyNames, handleClick }) => {
  if (companyNames) {
    return (
      <ul>
        {companyNames.map(companyArr => {
          return (
            <li
              className={styles.companyAutoPopulate}
              key={companyArr[1]}
              onClick={handleClick.bind(this, companyArr)}
            >
              <span>{companyArr[1] + " - "}</span>
              <span>{companyArr[0]}</span>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <ul />;
  }
};

const DisplaySource = ({ sourceSymbol, job_source, reset }) => (
  <div className={styles.companyName} onClick={reset}>
    <span>{sourceSymbol + " - "}</span>
    <span>{job_source}</span>
  </div>
);

/**
 * A panel that allows users to create a new job entry.
 */
class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posting_url: "",
      company_name: "",
      job_title: "",
      current_status: "interested",
      job_location: "",
      job_source: "",
      sourceSymbol: "",
      sourceOptions: null,
      displaySourceForm: true
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSourceOptionSelect = this.handleSourceOptionSelect.bind(this);
    this.resetSourceOptionSelect = this.resetSourceOptionSelect.bind(this);
    this.handleClosePanel = this.handleClosePanel.bind(this);
    this.isActive = this.isActive.bind(this);
  }
  handleSourceOptionSelect(companyName) {
    this.setState({ sourceSymbol: companyName[1] });
    this.setState({ job_source: companyName[0] });
    this.setState({ displaySourceForm: !this.state.displaySourceForm });
  }
  resetSourceOptionSelect() {
    this.setState({ displaySourceForm: !this.state.displaySourceForm });
    this.setState({
      sourceSymbol: "",
      job_source: ""
    });
  }
  handleSave(e) {
    e.preventDefault();
    this.props.dispatch(
      postJobApp({
        posting_url: this.state.posting_url,
        company_name: this.state.company_name,
        job_title: this.state.job_title,
        current_status: this.state.current_status,
        job_location: this.state.job_location,
        active: this.isActive(this.state.current_status),
        job_source: this.state.job_source,
        sourceSymbol: this.state.sourceSymbol
      })
    );

    this.setState(
      {
        posting_url: "",
        company_name: "",
        job_title: "",
        current_status: "interested",
        job_location: "",
        job_source: "",
        sourceSymbol: "",
        sourceOptions: null,
        displaySourceForm: true
      },
      () => this.handleClosePanel()
    );
  }
  isActive(status) {
    return ["withdrawn", "expired", "notAFit"].indexOf(status) === -1;
  }
  handleClosePanel(e) {
    this.props.dispatch(hideJobForm());
  }
  handleInputChange(e) {
    if (e.target.id === "job_source") {
      this.setState({ sourceOptions: sources[e.target.value.toLowerCase()] });
    }
    this.setState({ [e.target.id]: e.target.value });
  }
  render() {
    return (
      <div className={styles.formOuterContainer}>
        <div className={styles.formInnerContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.h1}>Add New Job</h1>
            <span className={"closeForm"} onClick={this.handleClosePanel}>
              X
            </span>
          </div>
          <form onSubmit={this.handleSave}>
            <label>
              Job Posting URL
              <input
                className={styles.jobForm__input}
                id="posting_url"
                onChange={this.handleInputChange}
                value={this.state.posting_url}
              />
            </label>
            <label>
              Company
              <input 
                className={styles.jobForm__input}
                id="company_name"
                onChange={this.handleInputChange}
                value={this.state.company_name} />
            </label>
            <label>
              Job Title
              <input 
                className={styles.jobForm__input}
                id="job_title"
                onChange={this.handleInputChange}
                value={this.state.job_title} />
            </label>
            <label>
              Status
              <select 
                id="current_status"
                value={this.state.current_status}
                onChange={this.handleInputChange}>
                  <option value="interested">Interested</option>
                  <option value="applied">Applied</option>
                  <option value="phoneCall">Phone Call</option>
                  <option value="assignment">Assignment</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="accepted">Accepted</option>
                  <option value="withdrawn">Withdrawn</option>
                  <option value="expired">Expired</option>
                  <option value="notAFit">Not A Fit</option>
              </select>
            </label>
            <label>
              Location
              <input
                className={styles.jobForm__input}
                id="job_location"
                onChange={this.handleInputChange}
                value={this.state.job_location} />
            </label>
            <label>
              Source
              {this.state.displaySourceForm ? (
                <div>
                  <input
                    className={styles.jobForm__input}
                    id="job_source"
                    placeholder="Where did you find this job?"
                    onChange={this.handleInputChange}
                    value={this.state.job_source}
                  />
                  <SourceOptionsList
                    handleClick={this.handleSourceOptionSelect}
                    companyNames={this.state.sourceOptions}
                  />
                </div>
              ) : (
                <DisplaySource
                  reset={this.resetSourceOptionSelect}
                  sourceSymbol={this.state.sourceSymbol}
                  job_source={this.state.job_source}
                />
              )}
            </label>
            <button type="button" onClick={this.handleClosePanel}>
              CANCEL
            </button>
            <button className={styles.saveButton}>SAVE</button>
          </form>
        </div>
      </div>
    );
  }
}

JobForm.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(JobForm);
