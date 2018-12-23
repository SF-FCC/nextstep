import React, { Component } from "react";
import JobForm from "./JobForm";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.css";

/**
 * A dashboard that displays an overview of recent events.
 * TODO: we need specs on this
 */
const JobList = ({ jobs }) => {
  return jobs.map(job => {
    return (
      <li key={job.id} className={styles.card}>
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
  });
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleShowJobForm = this.handleShowJobForm.bind(this);
  }
  componentDidMount() {
    this.props.getAllJobApps();
  }
  handleShowJobForm() {
    this.props.showJobForm();
  }
  render() {
    return (
      <div>
        <div>
          <h2>Dashboard</h2>
          <NavLink to="/tracker">See All →</NavLink>
          <button onClick={this.handleShowJobForm}>Add Job</button>
          <ul className={styles.cards_list}>
            {this.props.allJobApps && <JobList jobs={this.props.allJobApps} />}
          </ul>
          {this.props.isShowingJobForm && <JobForm />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowingJobForm: state.toggleDisplays.isShowingJobForm,
    allJobApps: state.jobApp.jobApps
  };
};

const mapDispatchToProps = dispatch => ({
  showJobForm: () => dispatch(showJobForm()),
  getAllJobApps: () => dispatch(getAllJobApps())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
