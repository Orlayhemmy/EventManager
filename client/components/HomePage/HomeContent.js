import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userSignInRequest } from '../../actions/signInActions.js';
import Welcome from './HomeContent/welcome.jsx';
import SignInForm from './HomeContent/signInForm.jsx';
import SignUpForm from  './HomeContent/signUpForm.jsx';

@connect((store) => {
  return {
    auth: store.auth,
  }
})

export default class HomeContent extends React.Component { 
  constructor() {
    super();
    this.state = {
      signupHidden: false,
      signinHidden: true,
    }
  }
  toggleDiv() {
    this.setState({
      signinHidden: !this.state.signinHidden,
      signupHidden: !this.state.signupHidden,
    })
  }
 

  render() {
    const {
      isAuth,
      status
    } = this.props.auth;
    let messageDisplay, form;
    if (this.state.signupHidden) {
      messageDisplay = "Are you new here? Create An Account";
    }
    else {
      messageDisplay = "Already Signed Up? Sign In To Your Account";
    }
    if (!isAuth) {
 
        form =  (
          <div className="form-outer text-center">
            <div className="form-inner">
              {!this.state.signupHidden && <SignUpForm />}    
              {!this.state.signinHidden && <SignInForm />}
              <span onClick={this.toggleDiv.bind(this)} className="goto">{messageDisplay}</span>       
            </div>
          </div>
        )
       
    }
    return (
      <div className="container" id="homepage">
        <div className="row">
          <div className="col-lg-8">
            <Welcome />
          </div>        
          <div className="col-lg-4">
            {form}
          </div>
        </div>
      </div>
    );
  }
}

