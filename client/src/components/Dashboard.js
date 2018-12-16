import React, { Component } from "react";
import JobForm from "./JobForm";
import { connect } from "react-redux";
import { showJobForm } from "../actions";
import { NavLink } from "react-router-dom";

/**
 * A dashboard that displays an overview of recent events.
 * TODO: we need specs on this
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleShowJobForm = this.handleAddJob.bind(this);
  }
  handleAddJob() {
    this.props.dispatch(showJobForm());
  }
  render() {
    return (
      <div>
        <div>
          <h3>Job Applications</h3>
          <NavLink to="/tracker">See All</NavLink>
          <button onClick={this.handleAddJob}>Add Job</button>
          <ul>
            <li>Job1</li>
            <li>Job2</li>
            <li>Job3</li>
            <li>Job4</li>
          </ul>
          {this.props.isShowingJobForm && <JobForm />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowingJobForm: state.toggleDisplays.isShowingJobForm
  };
};

export default connect(mapStateToProps)(Dashboard);
