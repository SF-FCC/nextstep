import React, { Component } from 'react';
import JobForm from './JobForm';
import { connect } from 'react-redux';
import { toggleJobForm } from '../actions'; 

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.handleToggleJobForm = this.handleToggleJobForm.bind(this);
  }
  handleToggleJobForm() {
    this.props.dispatch(toggleJobForm());
  }
  render() {
    return (
      <div>
        <div>
          <h3>Job Applications</h3>
          <a href="">See All</a>
          <button onClick={this.handleToggleJobForm}>Add Job</button>
          <ul>
            <li>Job1</li>
            <li>Job2</li>
            <li>Job3</li>
            <li>Job4</li>
          </ul>
          {this.props.showJobForm && <JobForm />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showJobForm: state.toggleDisplays.showJobForm,
  }
}

export default connect(mapStateToProps)(Dashboard);
