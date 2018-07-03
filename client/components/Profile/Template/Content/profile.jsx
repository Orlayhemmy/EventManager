import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../Form/profile';
import { checkPassword } from '../../../../actions/userActions';
import { updateUserValidation } from '../../../../shared/userValidation';
import uploadImage from '../../../../actions/imageAction';

export class Content extends React.Component {
  state = {
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

  /**
   * @memberof Profile
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid = () => {
    const { errors, isValid } = updateUserValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };
  /**
   * @memberof Profile
   * @method checkPassword
   * @description it calls an action
   * @param {object} event
   */
  checkPassword = e => {
    e.preventDefault();
    this.props.checkPassword(this.state);
  };
  /**
   * @memberof Profile
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        this.setState({
          errors: {}
        });
      }
    );
  };
  /**
   * @memberof Profile
   * @method onSubmit
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onSubmit = e => {
    e.preventDefault();
    if (this.initialState !== this.state) {
      if (this.isValid(this.state)) {
        const formData = new FormData();
        formData.append('file', this.state.imageData);
        formData.append('upload_preset', 'u8asaoka');
        const data = {
          fullname: this.state.fullname,
          email: this.state.email
        };
        if (this.initialState.image === this.state.image) {
          this.props.updateUserDetails(this.state);
        } else {
          this.props.uploadImage(data, formData);
        }
      }
    }
  };
  /**
   * @memberof CenterForm
   * @method showImage
   * @description it sets user input to state
   * @param {object} event
   */
  showImage = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.state.imageData = event.target.files[0];
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
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
      this.setState(
        {
          fullname: fullname || '',
          email: email || '',
          id: id,
          imageUrl: imageUrl,
          createdAt: createdAt || ''
        },
        () => {
          this.initialState = this.state;
        }
      );
    }
  }
  render() {
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
      <div className="container">
        <div className="row">
          <div className="card col-lg-6 text-center pt-4 bb mb-4 pb-4">
            <div className="text-primary">Personal Information</div>
            <hr />
            <div id="showDetails">
              <div>
                {!imageUrl ? (
                  <div className="imageUpload">
                    <img
                      src="./images/imageholder.jpg"
                      className="img-fluid dropzone"
                    />
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
                className="subtitle"
                id="show-form"
                onClick={this.props.showDiv}
              >
                Edit
              </span>
            </div>
            <Form
              profileState={this.state}
              onChange={this.onChange}
              showImage={this.showImage}
              checkPassword={this.checkPassword}
              onSubmit={this.onSubmit}
              showDiv={this.props.showDiv}
              passwordError={this.props.auth.message}
              newPasswordError={this.state.errors.retypePass}
            />
          </div>
          <div className="card col-lg-3 m-auto text-center pt-4 bb mh">
            <div className="text-primary">Activities</div>
            <hr />
            <div className="mb-4">
              <h4 className="mt-4">Date Joined</h4>
              <h3 className="mt-4">{dateRegistered}</h3>
            </div>
            <div className="mb-4">
              <h4 className="mt-4">Events Booked</h4>
              <span className="display-3">
                {this.props.userEvent.eventBookedCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const propTypes = {
  auth: PropTypes.object.isRequired,
  checkPassword: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  userEvent: state.event
});
Content.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    checkPassword,
    uploadImage
  }
)(Content);
