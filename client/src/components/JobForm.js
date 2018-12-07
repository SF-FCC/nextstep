import React, {Component} from 'react';
import PropTypes from 'prop-types';

class JobForm extends Component {
  render() {
    return (
      <div onClick={this.props.hideForm}>job form goes here</div>
    )
  }
}

JobForm.propTypes = {
  hideForm: PropTypes.func,
}

export default JobForm;
