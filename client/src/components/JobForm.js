import React, { Component } from "react";
import PropTypes from "prop-types";
import { sources } from "../data";
import styles from "./JobForm.module.css";
import { connect } from "react-redux";
import { hideJobForm } from "../actions";

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

const DisplaySource = ({ sourceSymbol, source, reset }) => (
  <div className={styles.companyName} onClick={reset}>
    <span>{sourceSymbol + " - "}</span>
    <span>{source}</span>
  </div>
);

/**
 * A panel that allows users to create a new job entry.
 */
class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobPostingUrl: "",
      company: "",
      jobTitle: "",
      status: "interested",
      location: "",
      source: "",
      sourceSymbol: "",
      sourceOptions: null,
      displaySourceForm: true
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSourceOptionSelect = this.handleSourceOptionSelect.bind(this);
    this.resetSourceOptionSelect = this.resetSourceOptionSelect.bind(this);
    this.handleClosePanel = this.handleClosePanel.bind(this);
  }
  handleSourceOptionSelect(companyName) {
    this.setState({ sourceSymbol: companyName[1] });
    this.setState({ source: companyName[0] });
    this.setState({ displaySourceForm: !this.state.displaySourceForm });
  }
  resetSourceOptionSelect() {
    this.setState({ displaySourceForm: !this.state.displaySourceForm });
    this.setState({
      sourceSymbol: "",
      source: ""
    });
  }
  handleSave(e) {
    e.preventDefault();
    console.log("handling submit...", this.state);
    this.setState({
      jobPostingUrl: "",
      company: "",
      jobTitle: "",
      status: "interested",
      location: "",
      source: "",
      sourceSymbol: "",
      sourceOptions: null,
      displaySourceForm: true
    });
    this.handleClosePanel();
  }
  handleClosePanel(e) {
    this.props.dispatch(hideJobForm());
  }
  handleInputChange(e) {
    if (e.target.id === "source") {
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
                id="jobPostingUrl"
                onChange={this.handleInputChange}
                value={this.state.jobPostingUrl}
              />
            </label>
            <label>
              Company
              <input id="company" onChange={this.handleInputChange} value={this.state.company} />
            </label>
            <label>
              Job Title
              <input id="jobTitle" onChange={this.handleInputChange} value={this.state.jobTitle} />
            </label>
            <label>
              Status
              <select id="status" value={this.state.status} onChange={this.handleInputChange}>
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
              <input id="location" onChange={this.handleInputChange} value={this.state.location} />
            </label>
            <label>
              Source
              {this.state.displaySourceForm ? (
                <div>
                  <input
                    id="source"
                    placeholder="Where did you find this job?"
                    onChange={this.handleInputChange}
                    value={this.state.source}
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
                  source={this.state.source}
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
