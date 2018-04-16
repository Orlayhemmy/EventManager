import React from 'react';
import { connect } from 'react-redux';
import { sendMail, userSignupRequest } from '../../../actions/signInActions.js';
import { validateSignupInput } from '../../../shared/userValidation';
import TextField from '../../../common/textField3';

@connect((store) => {
  return {
    auth: store.auth,
  }
})
export default class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePass: '',
      errors: {},
      isLoading: '',
      serverError: '',
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  isValid() {
    const {
      errors,
      isValid
    } = validateSignupInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }


  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const title = 'Welcome to Ecenter';
      const message = `Thank you for choosing Ecenter, We hope to make your events
      memorable.<br/> Click on this <a href="#">link</a> to see our event centers and get started`;
      const email = this.state.email;  
      this.props.dispatch(userSignupRequest(this.state, title, message, email));

      // this.context.router.history.push('/dashboard');
    }
  } 

  render() {
    const {
      fullname,
      email,
      password,
      retypePass,
      errors,
      serverError
    } = this.state;
    return (
      <div>
        <div className="logo text-uppercase"><strong className="text-primary">Sign Up</strong></div>          
        <h2>Please fill in your details to get started</h2>
        <span className="help-block">{this.props.auth.message}</span>
        <form id="signup-form" onSubmit={this.onSubmit}>
          <TextField
            id='fullname'
            value={this.state.fullname}
            placeholder='Fullname'
            type='text'
            error={errors.fullname} 
            onChange={this.onChange} />
            
            <TextField
            id='email'
            value={this.state.email}
            placeholder='Email Address'
            type='email'
            error={errors.email}
            onChange={this.onChange} />
            
            <TextField
            id='password'
            value={this.state.password}
            placeholder='Password'
            type='password'
            error={errors.password} 
            onChange={this.onChange} />
            
            <TextField
            id='retypePass'
            value={this.state.retypePass}
            placeholder='Re-type Password'
            type='password'
            error={errors.retypePass} 
            onChange={this.onChange} />

          <input id="signup" type="submit" value="Create Account" className="btn btn-primary"/>
        </form>     
      </div>
    )
  }
}

