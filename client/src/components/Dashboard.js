import React, { Component } from "react";
import JobForm from "./JobForm";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import { NavLink } from "react-router-dom";

/**
 * A dashboard that displays an overview of recent events.
 * TODO: we need specs on this
 */
const JobList = ({ jobs }) => {
  return (
    jobs.map((job) => <li key={job.id}>{job.company_name}</li>)
  )
}

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
          <NavLink to="/tracker">See All</NavLink>
          <button onClick={this.handleShowJobForm}>Add Job</button>
          <ul>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


