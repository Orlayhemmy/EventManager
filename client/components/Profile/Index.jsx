import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../../common/textField3';
import Navbar from '../Navbar/Container/navbar';
import Footer from '../Footer/Container/footer';
import UploadImage from '../ImageUpload/imageUpload';
import { updateUserValidation } from '../../shared/userValidation';
import {
  uploadUserImage,
  checkPassword,
  getUser
} from '../../actions/userActions';
import { eventBooked } from '../../actions/eventActions';
import { logout } from '../../actions/userActions';

/**
 * @description Profile component
 */
export class Profile extends React.Component {
  /**
   * @memberof Profile
   * @description it creates an instance of Profile
   */
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      retypePass: '',
      newPassword: '',
      oldPassword: '',
      errors: {},
      wrongPasswordError: '',
      imageUrl: '',
      createdAt: '',
      image: ''
    };
    this.initialState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.showDiv = this.showDiv.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.showImage = this.showImage.bind(this);
  }
  /**
   * @memberof Profile
   * @method componentWillMount
   * @description it calls an action
   * @param {void}
   * @returns {void}
   */
  componentWillMount() {
    const { id } = this.props.auth.user;
    this.props.eventBooked(id);
    this.props.getUser();
  }
  /**
   * @memberof Profile
   * @method componentWillReceiveProps
   * @description it updates the state when new props are recieved
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.auth != nextProps.auth) {
      const {
        fullname,
        email,
        id,
        imageUrl,
        createdAt
      } = nextProps.auth.userDetails;
      this.setState({
        fullname: fullname || '',
        email: email || '',
        id: id,
        imageUrl: imageUrl,
        createdAt: createdAt || ''
      });
    }
  }
  /**
   * @memberof CenterForm
   * @method showImage
   * @description it sets user input to state
   * @param {object} event
   */
  showImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.state.imageData = event.target.files[0];
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  /**
   * @memberof Profile
   * @method showDiv
   * @description it toggles div display
   * @param {object} event
   */
  showDiv(e) {
    e.preventDefault();
    if (e.target.id === 'details') {
      const div = document.getElementById('editDetails');
      const div2 = document.getElementById('showDetails');
      div.hidden = false;
      div2.hidden = true;
    } else {
      const div = document.getElementById('passwordUpdate');
      const div2 = document.getElementById('submitButton');
      const span = document.getElementById('subtitle');
      div.hidden = !div.hidden;
      div2.hidden = !div2.hidden;
      span.hidden = !span.hidden;
    }
  }
  /**
   * @memberof Profile
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
   * @memberof Profile
   * @method checkPassword
   * @description it calls an action
   * @param {object} event
   */
  checkPassword(e) {
    e.preventDefault();
    this.props.checkPassword(this.state);
  }
  /**
   * @memberof Profile
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid() {
    const { errors, isValid } = updateUserValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @memberof Profile
   * @method onSubmit
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.initialState !== this.state) {
      if (this.isValid()) {
        const formData = new FormData();
        formData.append('file', this.state.imageData);
        formData.append('upload_preset', 'u8asaoka');
        const data = {
          fullname: this.state.fullname,
          email: this.state.email
        };
        this.props.uploadUserImage(data, formData);
      }
    }
  }
  /**
   * @memberof Profile
   * @method componentDidUpdate
   * @description it checks some conditions when component updates
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.auth.message === 'Password Match') {
      const div = document.getElementById('newPasswordDiv');
      const span = document.getElementById('subtitle');
      this.showDiv();
      div.hidden = false;
      span.hidden = true;
    } else if (this.props.auth.message === 'Wrong Password') {
      this.state.wrongPasswordError = 'Wrong Password';
    }
  }
  /**
   * @memberof Profile
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof Profile
   * @method render
   * @description it renders the component
   * @returns the HTML of Profile
   */
  render() {
    if (this.props.event.status === 403) {
      this.logout();
    }
    const {
      fullname,
      email,
      retypePass,
      newPassword,
      oldPassword,
      errors,
      wrongPasswordError,
      imageUrl,
      createdAt,
      image
    } = this.state;
    const dateRegistered = createdAt.slice(0, 10);
    return (
      <div id="profile-page">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="card col-lg-6 text-center pt-4 bb mb-4 pb-4">
              <div className="text-primary">Personal Information</div>
              <hr />
              <div id="showDetails">
                <div>
                  {!imageUrl ? (
                    <div className="imageUpload">
                      <p className="img-fluid dropzone p-5">
                        Click here to upload your image{' '}
                      </p>
                    </div>
                  ) : (
                    <div className="imageUpload">
                      <img src={imageUrl} className="img-fluid dropzone" />
                    </div>
                  )}
                </div>
                <h3 className="pt-4">{fullname.toUpperCase()}</h3>
                <span>{email}</span>
                <span
                  className="subtitle pointer"
                  id="details"
                  onClick={this.showDiv}
                >
                  Edit
                </span>
              </div>
              <form id="editDetails" hidden>
                <UploadImage uploadedImage={image} showImage={this.showImage} />
                <h3 className="pt-1">
                  <TextField
                    id="fullname"
                    value={fullname.toUpperCase()}
                    placeholder="Fullname"
                    type="text"
                    error={errors.fullname}
                    onChange={this.onChange}
                    className="no-border"
                  />
                </h3>
                <TextField
                  id="email"
                  value={email}
                  placeholder="Email Address"
                  type="email"
                  error={errors.email}
                  onChange={this.onChange}
                />

                <span
                  className="subtitle pointer"
                  id="subtitle"
                  onClick={this.showDiv}
                >
                  Click here to change your password
                </span>
                <div id="passwordUpdate" hidden>
                  <span className="help-block">{this.props.auth.message}</span>
                  <br />
                  <span className="subtitle">Password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id="oldPassword"
                        value={oldPassword}
                        placeholder="Type old password"
                        type="password"
                        error=""
                        onChange={this.onChange}
                      />
                      <border />
                    </div>
                  </div>
                  <br />
                  <br />
                  <input
                    type="button"
                    className="btn btn-sm btn-success mt-4"
                    value="check"
                    onClick={this.checkPassword}
                  />
                  <input
                    type="button"
                    className="btn btn-sm btn-danger mt-4"
                    value="cancel"
                    onClick={this.checkPassword}
                  />
                </div>

                <div id="newPasswordDiv" hidden>
                  <span className="subtitle">New password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id="newPassword"
                        value={newPassword}
                        placeholder="New Password"
                        type="password"
                        error={errors.newPassword}
                        onChange={this.onChange}
                      />
                      <border />
                    </div>
                  </div>
                  <span className="subtitle">Retype password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id="retypePass"
                        value={retypePass}
                        placeholder="Retype Password"
                        type="password"
                        error={errors.retypePass}
                        onChange={this.onChange}
                      />
                      <border />
                    </div>
                  </div>
                </div>
                <div id="submitButton">
                  <input
                    id="updateDetails"
                    onClick={this.onSubmit}
                    type="button"
                    value="submit"
                    className="btn btn-sm btn-success mt-4"
                  />
                </div>
              </form>
            </div>
            <div className="card col-lg-3 text-center pt-4 bb">
              <div className="text-primary">Activities</div>
              <hr />
              <div className="mb-4">
                <h4 className="mt-4">Date Joined</h4>
                <h3 className="mt-4">{dateRegistered}</h3>
              </div>
              <div className="mb-4">
                <h4 className="mt-4">Events Booked</h4>
                <span className="display-3">
                  {this.props.event.eventBookedCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  uploadUserImage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  eventBooked: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});
Profile.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    uploadUserImage,
    checkPassword,
    getUser,
    eventBooked,
    logout
  }
)(Profile);
