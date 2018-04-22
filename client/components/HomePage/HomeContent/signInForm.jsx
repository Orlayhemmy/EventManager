import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userSignInRequest } from '../../../actions/signInActions.js';
import TextField from '../../../common/textField3';
import { validateSigninInput } from '../../../shared/userValidation';

/**
 * @description Signin form component
 */
export class SignInForm extends React.Component {
  /**
   * @memberof SignInForm
   * @description it creates an instance of signinform
   */
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

   /**
   * @memberof SignInForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
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

  /**
   * @memberof SignInForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  /**
   * @memberof SignInForm
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} event
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.userSignInRequest(this.state);
    }
  }

  /**
   * @memberof SignInForm
   * @method render
   * @description it renders the component
   * @returns the HTML of signin form
   */
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
const propTypes = {
  auth: PropTypes.object.isRequired,
  userSignInRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

SignInForm.propTypes = propTypes;

export default connect(mapStateToProps, {userSignInRequest})(SignInForm);