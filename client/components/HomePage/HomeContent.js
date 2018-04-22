import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Welcome from './HomeContent/Welcome';
import SignUpForm from './HomeContent/SignUpForm';
import SignInForm from './HomeContent/SignInForm';

/**
 * @description Signin form component
 */
export class HomeContent extends React.Component { 
  /**
   * @memberof HomeContent
   * @description it creates an instance of HomeContent
   */
  constructor() {
    super();
    this.state = {
      signupHidden: false,
      signinHidden: true,
    }
  }

  /**
   * @memberof HomeContent
   * @method toggleDiv
   * @description it toggles between the signup form
   * @param {void}
   */
  toggleDiv() {
    this.setState({
      signinHidden: !this.state.signinHidden,
      signupHidden: !this.state.signupHidden,
    })
  }
 
  /**
   * @memberof HomeContent
   * @method render
   * @description it renders the component
   * @returns the HTML of homecontent component
   */
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

const propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

HomeContent.propTypes = propTypes;

export default connect(mapStateToProps, {})(HomeContent);

