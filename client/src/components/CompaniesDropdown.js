import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentJobApp, showJobDetail } from '../actions';
import styles from './CompaniesDropdown.module.css';

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
    const { companyNames } = this.props;
    if (companyNames[0] === 'no results') {
      return (
        <ul className={styles.ul}>
          <li 
            className={styles.li}
            key={this.props.companyNames[0]}>{this.props.companyNames[0]}</li>
        </ul>
      )
    } else {
      return (
        <ul className={styles.ul}>
          {this.props.companyNames.map(companyName => (
            <li 
              className={styles.li_clickable}
              onClick={this.handleCompanySelect.bind(this, companyName[1])}
              key={companyName[1]}>{companyName[0]}</li>
          ))}
        </ul>
      )
    }
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
