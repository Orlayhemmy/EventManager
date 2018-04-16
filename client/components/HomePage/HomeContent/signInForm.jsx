import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSignInRequest } from '../../../actions/signInActions.js';
import TextField from '../../../common/textField3';
import { validateSigninInput } from '../../../shared/userValidation';

@connect((store) => {
  return {
    auth: store.auth,
  }
})

export default class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: '',
      loginPassword: '',
      errors: {},
      isLoading: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const {
      errors,
      isValid
    } = validateSigninInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(userSignInRequest(this.state));
    }
  }

  render() {

    const {
      loginEmail,
      loginPassword,
      errors
    } = this.state;
    return (
      <div>  
        <div className="logo text-uppercase"><strong className="text-primary">Sign In</strong></div>
        <h2>Welcome Back!</h2>
        <span className="help-block">{this.props.auth.message}</span>
        <form id="login-form" onSubmit={this.onSubmit}>
          <TextField
              id='loginEmail'
              value={loginEmail}
              placeholder='Email Address'
              type='email'
              error={errors.loginEmail}
              onChange={this.onChange} />
              
            <TextField
              id='loginPassword'
              value={loginPassword}
              placeholder='Password'
              type='password'
              error={errors.loginPassword} 
              onChange={this.onChange} />

          <input id="login" type="submit" value="login" className="btn btn-primary" disabled={this.state.isLoading}/>
        </form>
        <Link to="/recover-password">Forgot Password? Click Here</Link>
      </div>
             
    );
  }
}
