// TODO - need to add a job description field

import React, { Component } from "react";
import styles from "./JobAppDetail.module.css";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { hideJobDetail, updateJobApp } from "../actions";
import JobAppDeleteModal from "./JobAppDeleteModal";

class JobAppDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubmitButton: false,
      deleteConfirmationIsShowing: false,
      company_name : props.currentJobApp.company_name,
      job_title : props.currentJobApp.job_title,
      current_status : props.currentJobApp.current_status,
      job_location : props.currentJobApp.job_location,
      job_source : props.currentJobApp.job_source,
      posting_url : props.currentJobApp.posting_url,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleHideJobAppDetail = this.handleHideJobAppDetail.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.hideDeleteConfirmation = this.hideDeleteConfirmation.bind(this);
    this.isActive = this.isActive.bind(this);
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
      id : this.props.currentJobApp.id,
      company_name : this.state.company_name,
      job_title : this.state.job_title,
      current_status : this.state.current_status,
      job_location : this.state.job_location,
      job_source : this.state.job_source,
      active: this.isActive(this.state.current_status),
      posting_url : this.state.posting_url,
    }
    this.props.updateJobApp(details);
    this.props.hideJobDetail();
  }
  isActive(status) {
    let res = ["withdrawn", "expired", "notAFit"].indexOf(status) === -1;
    console.log(res); 
    return res;
  }
  showDeleteConfirmation() {
    this.setState({deleteConfirmationIsShowing: true});
  }
  hideDeleteConfirmation() {
    this.setState({deleteConfirmationIsShowing: false});
  }
  handleHideJobAppDetail(e) {
    if (e.target.id === "formOuterContainer") this.props.hideJobDetail();
  }
  render() {
    const { currentJobApp } = this.props;
    return (
      <div 
        id="formOuterContainer"
        onClick={this.handleHideJobAppDetail} 
        className={styles.jobAppDetail__formOuterContainer}>
        <div className={styles.jobAppDetail__formInnerContainer}>
          <div className={styles.jobAppDetail__header}>
            <h3>{currentJobApp.company_name}</h3>
            <span 
              onClick={this.props.hideJobDetail}
              className="closeForm">X</span>
          </div>
            <form 
              onSubmit={this.handleFormSubmit}
              className={styles.jobAppDetail__form}>
              <label>Company
                <input 
                  className={styles.jobAppDetail__input}
                  onChange={this.handleInputChange}
                  id={"company_name"}
                  value={this.state.company_name} />
              </label>
              <label>Job Title
                <input
                  className={styles.jobAppDetail__input}
                  onChange={this.handleInputChange}
                  id={"job_title"}
                  value={this.state.job_title} />
              </label>
              <label>Status
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
              <label>Location
                <input
                  className={styles.jobAppDetail__input}
                  onChange={this.handleInputChange}
                  id={"job_location"}
                  value={this.state.job_location} />
              </label>
              <label>Source
                <input
                  className={styles.jobAppDetail__input}
                  onChange={this.handleInputChange}
                  id={"job_source"}
                  value={this.state.job_source} />
              </label>
              <label>Job Posting URL
                <input
                  className={styles.jobAppDetail__input}
                  onChange={this.handleInputChange}
                  id={"posting_url"}
                  value={this.state.posting_url} />
              </label>
              <p className={styles.jobAppDetail__delete}
                 onClick={this.showDeleteConfirmation}>delete this job</p>
              {this.state.deleteConfirmationIsShowing && 
                <JobAppDeleteModal 
                  jobAppId={this.props.currentJobApp.id}
                  hideDeleteConfirmation={this.hideDeleteConfirmation} />}
              {this.state.showSubmitButton && 
                <button>submit</button>}
            </form>
        </div>
      </div>
    )
  }
}

JobAppDetail.propTypes = {
  currentJobApp: PropTypes.object, 
}

const mapDispatchToProps = dispatch => ({
  hideJobDetail: () => dispatch(hideJobDetail()),
  updateJobApp: (details) => dispatch(updateJobApp(details))
})

export default connect(null, mapDispatchToProps)(JobAppDetail);
