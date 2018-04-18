import React from 'react';
import { connect } from 'react-redux';
import TextField from '../common/textField3';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import UploadImage from './imageUpload';
import { updateUserValidation } from '../shared/userValidation';
import { updateUserDetails, checkPassword, getUser } from '../actions/signInActions';
import { eventBooked } from '../actions/eventActions';
import { logout } from '../actions/signInActions';

@connect((store) => {
  return {
    auth: store.auth,
    event: store.event,
  };
})

export default class Profile extends React.Component {
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
    }
    this.initialState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.showDiv = this.showDiv.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }
  componentWillMount() {
    const { id } = this.props.auth.user;
    this.props.dispatch(eventBooked(id));
    this.props.dispatch(getUser());
  }
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
        createdAt: createdAt || '',
      })
    }
  }

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
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  checkPassword(e) {
    e.preventDefault();
    this.props.dispatch(checkPassword(this.state));
  }
  isValid() {
    const {
      errors,
      isValid
    } = updateUserValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.initialState !== this.state) {
      if (this.isValid()) {
        this.props.dispatch(updateUserDetails(this.state));
      }
    }
  }
  componentDidUpdate() {
    if (this.props.auth.message === 'Password Match') {
      const div = document.getElementById('newPasswordDiv');
      const span = document.getElementById('subtitle');
      this.showDiv();
      div.hidden = false;
      span.hidden = true;
    } else if (this.props.auth.message === 'Wrong Password') {
        this.state.wrongPasswordError= 'Wrong Password';
    }
  }
  logout(e) {
    this.props.dispatch(logout());
  }
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
      createdAt
    } = this.state;
    const dateRegistered = createdAt.slice(0, 10);
    return (
      <div id="profile-page">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="card col-lg-6 text-center pt-4 bb mb-4 pb-4">
              <div className="text-primary">Personal Information</div>
              <hr/>
              <div id="showDetails">
                <img src={imageUrl} className="img-fluid dropzone" />
                <h3 className="pt-4">{fullname.toUpperCase()}</h3>
                <span>{email}</span>
                <span className="subtitle pointer" id="details" onClick={this.showDiv}>Edit</span>
              </div>
              <form id="editDetails" hidden>
                <UploadImage path={this.props.location.pathname} uploadedImage={imageUrl}/>
                <h3 className="pt-1">
                  <TextField
                    id='fullname'
                    value={fullname.toUpperCase()}
                    placeholder='Fullname'
                    type='text'
                    error={errors.fullname} 
                    onChange={this.onChange}
                    className="no-border"
                  />
                </h3>
                <TextField
                id='email'
                value={email}
                placeholder='Email Address'
                type='email'
                error={errors.email}
                onChange={this.onChange} />
                
                <span className="subtitle pointer" id="subtitle" onClick={this.showDiv}>Click here to change your password</span>
                <div id="passwordUpdate" hidden>
                  <span className="help-block">{this.props.auth.message}</span>
                  <br/>
                  <span className="subtitle">Password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                    <input id='oldPassword'
                      value={oldPassword}
                      placeholder='Type old password'
                      type='password'
                      error='' 
                      onChange={this.onChange} />
                    <border></border>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <input type="button" className="btn btn-sm btn-success mt-4" value="check" onClick={this.checkPassword} />
                  <input type="button" className="btn btn-sm btn-danger mt-4" value="cancel" onClick={this.checkPassword} />
                </div>

                <div id="newPasswordDiv" hidden>
                  <span className="subtitle">New password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id='newPassword'
                        value={newPassword}
                        placeholder='New Password'
                        type='password'
                        error={errors.newPassword} 
                        onChange={this.onChange} />
                      <border></border>
                    </div>
                  </div>
                  <span className="subtitle">Retype password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id='retypePass'
                        value={retypePass}
                        placeholder='Retype Password'
                        type='password'
                        error={errors.retypePass} 
                        onChange={this.onChange} />
                      <border></border>
                    </div>
                  </div>
                </div>
                <div id="submitButton">
                  <input id="updateDetails" onClick={this.onSubmit} type="button" value="submit" className="btn btn-sm btn-success mt-4"/>
                </div>
              </form>
            </div>
            <div className="card col-lg-3 text-center pt-4 bb">
              
              <div className="text-primary">Activities</div>
              <hr/>
              <div className="mb-4">
              <h4 className="mt-4">Date Joined</h4>
              <h3 className="mt-4">{dateRegistered}</h3>
              </div>
              <div className="mb-4">
              <h4 className="mt-4">Events Booked</h4>
              <span className="display-3">{this.props.event.eventBookedCount}</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
