import React, { Component } from "react";
import PropTypes from "prop-types";
import JobForm from "./JobForm";
import JobAppDetail from "./JobAppDetail";
import { connect } from "react-redux";
import { setCurrentJobApp, showJobDetail, showJobForm, getAllJobApps } from "../actions";
import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.css";

// TODO: change updated to minutes once 60s threshold reached (basic formatting)

const JobItem = ({ job, handleShowJobAppDetail }) => {
  return (
    <li className={styles.card} onClick={handleShowJobAppDetail}>
      <div className={styles.card_top}>
        <span>
          <div className={styles.card_top__company}>{job.company_name}</div>
          <div className={styles.card_top__jobtitle}>{job.job_title}</div>
        </span>
        <div>{job.current_status}</div>
      </div>
      <div className={styles.card_bottom}>
        Updated {Math.round((Date.now() - Date.parse(`${job.updated}`)) / 1000)}s ago
      </div>
    </li>
  );
};

/**
 * A dashboard that displays an overview of recent events.
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleShowJobForm = this.handleShowJobForm.bind(this);
  }
  componentDidMount() {
    this.props.getAllJobApps();
  }
  handleShowJobAppDetail(jobApp) {
    this.props.setCurrentJobApp(jobApp);
    this.props.showJobDetail();
  }
  handleShowJobForm() {
    this.props.showJobForm();
  }

  renderCards = jobs => {
    if (jobs.length > 0) {
      const filterActiveJobs = jobs.filter(job => job.active);
      return filterActiveJobs.map(job => (
        <JobItem
          key={job.id}
          job={job}
          handleShowJobAppDetail={this.handleShowJobAppDetail.bind(this, job)}
        />
      ));
    }
  };

  render() {
    return (
      <div>
        <div>
          <h2>Dashboard</h2>
          <div className={styles.card_list_container}>
            <div className={styles.header}>
              <h3 className={styles.inline_header}>Jobs</h3>
              <NavLink to="/tracker" className={styles.see_all}>
                See All →
              </NavLink>
            </div>
            <ul className={styles.card_list}>
              <li
                onClick={this.handleShowJobForm}
                className={styles.card + " " + styles.add_job_card}
              >
                <span className={styles.bold}>+</span> Add Job
              </li>
              {this.renderCards(this.props.allJobApps)}
            </ul>
          </div>
          {this.props.isShowingJobForm && <JobForm />}
          {this.props.isShowingJobDetail && (
            <JobAppDetail currentJobApp={this.props.currentJobApp} />
          )}
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  allJobApps: PropTypes.array
};
Dashboard.defaultProps = {
  allJobApps: []
};

const mapStateToProps = state => {
  return {
    isShowingJobDetail: state.toggleDisplays.isShowingJobDetail,
    isShowingJobForm: state.toggleDisplays.isShowingJobForm,
    currentJobApp: state.jobApp.currentJobApp,
    allJobApps: state.jobApp.jobApps
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentJobApp: job => dispatch(setCurrentJobApp(job)),
  showJobDetail: () => dispatch(showJobDetail()),
  showJobForm: () => dispatch(showJobForm()),
  getAllJobApps: () => dispatch(getAllJobApps())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
