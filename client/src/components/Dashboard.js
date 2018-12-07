import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Job Applications</h3>
          <a href="">See All</a>
          <button>Add Job</button>
          <ul>
            <li>Job1</li>
            <li>Job2</li>
            <li>Job3</li>
            <li>Job4</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Dashboard;