import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentJobApp, showJobDetail } from '../actions';

class CompaniesDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleCompanySelect = this.handleCompanySelect.bind(this);
  }
  handleCompanySelect(idx) {
    this.props.setCurrentJobApp(this.props.jobApps[idx]);
    this.props.showJobDetail();
    this.props.resetDropdown();
  }
  render() {
    return (
      <ul>
        {this.props.companyNames.map(companyName => (
          <li 
            onClick={this.handleCompanySelect.bind(this, companyName[1])}
            key={companyName[1]}>{companyName[0]}</li>
        ))}
      </ul>
    )
  }
}

CompaniesDropdown.propTypes = {
  companyNames: PropTypes.array,
  resetDropdown: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    jobApps: state.jobApp.jobApps,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showJobDetail: () => dispatch(showJobDetail()),
    setCurrentJobApp: (job) => dispatch(setCurrentJobApp(job)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDropdown);
