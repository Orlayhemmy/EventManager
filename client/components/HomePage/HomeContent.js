import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Welcome from './HomeContent/Welcome';
import { validateSignupInput } from '../../shared/userValidation';
import { userSignupRequest } from '../../actions/signInActions';
import Navbar from '../Navbar.jsx';


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
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
  /**
   * @memberof SignUpForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  /**
   * @memberof SignUpForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
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

  onImageSelected(event) {
      if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
  
          reader.onload = (e) => {
            this.setState({
              image: e.target.result
            });
          }
  
          reader.readAsDataURL(event.target.files[0]);
      }
  }
  /**
   * @memberof SignUpForm
   * @method onSubmit
   * @description it calls the user signup action
   * @param {object} event
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
        this.state.title = 'Welcome to Ecenter';
        this.state.message = `Thank you for choosing Ecenter, We hope to make your events
        memorable.<br/> Click on this <a href="#">link</a> to see our event centers and get started`;
      this.props.userSignupRequest(this.state);
    }
  } 

  /**
   * @memberof HomeContent
   * @method render
   * @description it renders the component
   * @returns the HTML of homecontent component
   */
  render() {
    const { isAuth, status } = this.props.auth;
    const {
      fullname,
      email,
      password,
      retypePass,
      errors,
      serverError,
      image,
      loginEmail,
      loginPassword
    } = this.state;
    
    return (
      <div className="container" id="homepage">
        <Navbar path='/' email={this.loginEmail} onChange={this.onChange}/>
        <div className="main-content">
          <div className="row">
            <div className="col-lg-6 intro">
              <h1>Book The Best Center</h1>
              <p>
                Hotel icons, booking and reservation ready and thirteen HTML
                pages, that is roughly said what Colina delivers. Of course,
                there is more. Due to the popularity of mobile users, Colina has
                a mobile-first approach to its web design. But in general, all
                users will experience top-notch and highly adaptable website
                that you are yet to make.
              </p>
              <p>
                Andela’s business model is simply translating brilliant minds
                into world-class developers and inculcating them into software
                engineering teams around the world, to solve the problem of
                shortage of tech talent and also help achieve quality product
                build. Andela proffers solution to companies or individuals
                which are commonly referred to as partners with a shortage of
                technological team or in need of proficient and experienced
                software personnel by offering them world-class developers to
                solve their challenges or bring their ideas into reality using
                technological tools
              </p>
            </div>
            <div className="col-lg-6 form">
              <h1>Get started</h1>
              <span className="help-block">{this.props.auth.message}</span>
              <form id="signup-form" onSubmit={this.onSubmit}>
              {image === '' ? (
                <div className="imageUpload center">
                  <label for="imageInput">
                    <p className="img-fluid img-circle p-5">
                      Click here to upload your image{' '}
                    </p>
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    onChange={this.onImageSelected.bind(this)}
                  />
                </div>
                  ) : (
                    <div className="imageUpload center">
                      <label for="imageInput">
                        <img className="img-fluid img-circle" src={image}/>
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        onChange={this.onImageSelected.bind(this)}
                      />
                    </div>
                  )
                }
                <div className="form-group">
                <span className="help-block">{errors.fullname}</span>
                  <label for="fullname">Fullname</label>
                  <input
                    id="fullname"
                    value={this.state.fullname}
                    placeholder="Fullname"
                    type="text"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>

                <div className="form-group">
                <span className="help-block">{errors.email}</span>
                  <label for="email">Email Address</label>
                  <input
                    id="email"
                    value={this.state.email}
                    placeholder="Email Address"
                    type="email"
                    className="form-control"
                    error={errors.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <span className="help-block">{errors.password || errors.retypePass}</span>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="password">Password</label>
                    <input
                      id="password"
                      value={this.state.password}
                      placeholder="Password"
                      type="password"
                      className="form-control"
                      error={errors.password}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="retypePass">Retype-Password</label>
                    <input
                      id="retypePass"
                      value={this.state.retypePass}
                      placeholder="Re-type Password"
                      type="password"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="center">
                  <input
                    id="signup"
                    type="submit"
                    value="Join Us"
                    className="btn btn-primary mb-2"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row subcontent">
          <div className="col-lg-4">
            <div className="row center">
              <span class="icon">
                <i className="fa fa-dollar" />
              </span>
            </div>
            Hotel icons, booking and reservation ready and thirteen HTML pages,
            that is roughly said what Colina delivers. Of course, there is more.
            Due to the popularity of mobile users, Colina has a mobile-first
            approach to its web design. But in general, all users will
            experience top-notch and highly adaptable website that you are yet
            to make.
          </div>
          <div className="col-lg-4">
            <div className="row center">
              <span class="icon">
                <i className="fa fa-lock" />
              </span>
            </div>
            Hotel icons, booking and reservation ready and thirteen HTML pages,
            that is roughly said what Colina delivers. Of course, there is more.
            Due to the popularity of mobile users, Colina has a mobile-first
            approach to its web design. But in general, all users will
            experience top-notch and highly adaptable website that you are yet
            to make.
          </div>
          <div className="col-lg-4">
            <div className="row center">
              <span class="icon">
                <i className="fa fa-thumbs-up" />
              </span>
            </div>
            Hotel icons, booking and reservation ready and thirteen HTML pages,
            that is roughly said what Colina delivers. Of course, there is more.
            Due to the popularity of mobile users, Colina has a mobile-first
            approach to its web design. But in general, all users will
            experience top-notch and highly adaptable website that you are yet
            to make.
          </div>
        </div>
      </div>
    );
  }
}

const propTypes = {
  auth: PropTypes.object.isRequired,
  userSignupRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

HomeContent.propTypes = propTypes;

export default connect(mapStateToProps, {userSignupRequest})(HomeContent);
