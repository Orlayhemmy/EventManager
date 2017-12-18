import React from 'react';
import { connect } from 'react-redux';
import { userSignUpRequest } from '../../actions/signUpActions.jsx';
import { addFlashMessage } from '../../actions/flashMessages.jsx';
import PropTypes from 'prop-types';

import Welcome from './HomeContent/welcome.jsx';
import SignInForm from './HomeContent/signInForm.jsx';
import SignUpForm from  './HomeContent/signUpForm.jsx';

class HomeContent extends React.Component {

  render() {
    const { userSignUpRequest, addFlashMessage } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Welcome />
          <SignInForm />
          <SignUpForm userSignUpRequest = {userSignUpRequest} addFlashMessage={addFlashMessage}/>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null,{ userSignUpRequest, addFlashMessage })(HomeContent);