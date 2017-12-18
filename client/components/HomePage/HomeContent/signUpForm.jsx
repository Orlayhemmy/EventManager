import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import { browserHistory } from 'react-router-dom';

import validateInput from '../../../shared/signup.js';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePass: '',
      errors: {}
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

 

  render() {
    return (
      <div className="col-lg-4">
      <div className="form-outer text-center"> 
        <div className="form-inner">
          <span className="logo text-uppercase"><strong className="text-primary">sign up</strong></span>
          <h2>Please fill in your details to get started</h2>
          <form id="signup-form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input id="fullname" type="text" placeholder="Fullname" onChange={this.onChange} value={this.state.fullname} required/>
            </div>
            <div className="form-group">
              <input id="email" type="email" placeholder="Email" onChange={this.onChange} value={this.state.email} required/>
            </div>
            <div className="form-group">
              <input id="password" type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} required/>
            </div>
            <div className="form-group">
              <input id="retypePass" type="password" placeholder="Retype Password" onChange={this.onChange} value={this.state.retypePass} required/>
            </div>
            <input id="signup" type="submit" value="Create Account" className="btn btn-primary"/>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

SignUpForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default SignUpForm;
