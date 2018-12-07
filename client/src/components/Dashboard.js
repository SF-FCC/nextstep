import React, { Component } from 'react';
import JobForm from './JobForm';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showJobForm: false,
    }
    this.toggleJobForm = this.toggleJobForm.bind(this);
  }
  toggleJobForm() {
    this.setState({showJobForm: !this.state.showJobForm});
  }
  render() {
    return (
      <div>
        <div>
          <h3>Job Applications</h3>
          <a href="">See All</a>
          <button onClick={this.toggleJobForm}>Add Job</button>
          <ul>
            <li>Job1</li>
            <li>Job2</li>
            <li>Job3</li>
            <li>Job4</li>
          </ul>
          {this.state.showJobForm && 
            <JobForm hideForm={this.toggleJobForm} />}
        </div>
      </div>
    )
  }
}

export default Dashboard;
