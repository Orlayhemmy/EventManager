import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import Navbar from '../../Navbar/Container/navbar';
import Content from '../Template/Content/homeContent';
import Footer from '../../Footer/footer';
import {
  userSignInRequest,
  userSignupRequest
} from '../../../actions/userActions';
import {
  validateSigninInput,
  validateSignupInput
} from '../../../shared/userValidation';
import { getCenters } from '../../../actions/centerActions';
/**
 * @description Homepage component
 */
export class Homepage extends React.Component {
  state = {
    fullname: '',
    email: '',
    password: '',
    retypePass: '',
    errors: {},
    isLoading: '',
    serverError: '',
    image: '',
    loginEmail: '',
    loginPassword: '',
    imageInput: ''
  };

  componentDidMount() {
    this.props.getCenters();
  }
  /**
   * @memberof SignUpForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  /**
   * @memberof SignUpForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid = () => {
    const { errors, isValid } = validateSignupInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  /**
   * @memberof SignInForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  signinValid = () => {
    const { errors, isValid } = validateSigninInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };
  /**
   * @memberof SignInForm
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} event
   * @returns {void}
   */
  signinSubmit = (e) => {
    e.preventDefault();
    if (this.signinValid()) {
      this.props.userSignInRequest(this.state);
    }
  };
  /**
   * @memberof SignUpForm
   * @method onSubmit
   * @description it calls the user signup action
   * @param {object} event
   * @returns {void}
   */
  signupSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      const formData = new FormData();
      formData.append('file', this.state.imageUrl);
      formData.append('upload_preset', 'u8asaoka');

      this.state.title = 'Welcome to Ecenter';
      this.state.message = `Thank you for choosing Ecenter, We hope to make your events
        memorable.<br/> Click on this <a href="#">link</a> to see our event centers and get started`;
      this.props.userSignupRequest(this.state, formData);
    }
  };
  /**
   * @memberof Homepage
   * @description it creates an instance of Homepage
   */
  render() {
    const { isAuth, message } = this.props.auth;
    if (message === 201) {
      swal('Successfully signed up', 'success');
    }
    const {
      fullname,
      email,
      password,
      retypePass,
      errors,
      serverError,
      image,
      loginEmail,
      loginPassword,
      imageInput
    } = this.state;
    const { pathname } = this.props.location;
    return (
      <div id="homepage">
        <Navbar
          path={pathname}
          loginEmail={loginEmail}
          loginPassword={loginPassword}
          onChange={this.onChange}
          errorEmail={errors.email}
          errorPass={errors.password}
          signinSubmit={this.signinSubmit}
        />
        <Content
          email={email}
          errorEmail={errors.email}
          fullname={fullname}
          errorName={errors.fullname}
          retypePass={retypePass}
          errorRetypePass={errors.retypePass}
          password={password}
          errorPass={errors.password}
          onChange={this.onChange}
          errorEmail={errors.email}
          errorPass={errors.password}
          signupSubmit={this.signupSubmit}
          message={this.props.auth.message}
          isAuth={isAuth}
          centerState={this.props.centerState}
        />
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  userSignInRequest: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired
};

Homepage.PropTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth,
  centerState: state.center
});

export default connect(
  mapStateToProps,
  {
    userSignupRequest,
    userSignInRequest,
    getCenters
  }
)(Homepage);
