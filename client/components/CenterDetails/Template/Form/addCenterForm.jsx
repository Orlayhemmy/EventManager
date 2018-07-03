import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uploadImage from '../../../../actions/imageAction';
import { addCenterValidation } from '../../../../shared/centerValidations';
import TextField from '../../../../common/textField2';
import { logout } from '../../../../actions/userActions';
import UploadImage from '../../../ImageUpload/imageUpload';

/**
 * @description CenterForm component
 */
export class CenterForm extends React.Component {
  /**
   * @memberof CenterForm
   * @description it creates an instance of CenterForm
   */
  constructor(props) {
    super(props);
    this.state = {
      centerName: '',
      location: '',
      description: '',
      facilities: '',
      capacity: '',
      errors: {},
      image: '',
      cost: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.logout = this.logout.bind(this);
    this.showImage = this.showImage.bind(this);
  }
  /**
   * @memberof CenterForm
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
   * @memberof CenterForm
   * @method showImage
   * @description it sets user input to state
   * @param {object} event
   */
  showImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.state.imageData = event.target.files[0]
      reader.onload = (e) => {
          this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  /**
   * @memberof CenterForm
   * @method onSubmit
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const formData = new FormData();
      formData.append('file', this.state.imageData);
      formData.append('upload_preset', 'u8asaoka');
      const data = {
        centerName: this.state.centerName,
        location: this.state.location,
        description: this.state.description,
        facilities: this.state.facilities,
        capacity: this.state.capacity,
        cost: this.state.cost
      }
      this.props.uploadImage(data, formData, 'center');
    }
  }
  /**
   * @memberof CenterForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid() {
    if (this.props.path === '/add-center') {
      const { errors, isValid } = addCenterValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    }
  }
  /**
   * @memberof CenterForm
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }

  /**
   * @memberof CenterForm
   * @method render
   * @description it renders the component
   * @returns the HTML of CenterForm
   */
  render() {
    const {
      centerName,
      location,
      facilities,
      description,
      capacity,
      errors,
      serverError,
      image,
      cost
    } = this.state;
    let buttonValue,
      nameHolder,
      facHolder,
      descHolder,
      locationHolder,
      capacityHolder;

    if (this.props.path === '/add-center') {
      buttonValue = 'Add Center';
    } else {
      buttonValue = 'Save';
    }

    nameHolder = 'Center name';
    facHolder = 'Facilities in center';
    descHolder = 'Describe center in few words';
    locationHolder = 'Center location';
    capacityHolder = 'Capacity';
    return (
      <form id="add-center-form" onSubmit={this.onSubmit}>
        <UploadImage
          uploadedImage={image}
          showImage={this.showImage}
          path={this.props.path}
        />
        <span className="help-block">{this.props.center.error}</span>
        <span className="main-color">Title</span>
        <TextField
          id="centerName"
          value={centerName}
          placeholder={nameHolder}
          type="text"
          error={errors.centerName}
          onChange={this.onChange}
        />
        <span className="main-color"> Location</span>
        <TextField
          id="location"
          value={location}
          placeholder={locationHolder}
          type="text"
          error={errors.location}
          onChange={this.onChange}
        />
        <span className="main-color"> Facilities</span>
        <p class="subtitle">
          separate facilities with commas. Do not include spaces
        </p>
        <TextField
          id="facilities"
          value={facilities}
          placeholder={facHolder}
          type="text"
          error={errors.facilities}
          onChange={this.onChange}
        />

        <span className="main-color">Capacity</span>
        <TextField
          id="capacity"
          value={capacity}
          placeholder={capacityHolder}
          type="text"
          error={errors.capacity}
          onChange={this.onChange}
        />

        <span className="main-color">Price</span>
        <TextField
          id="cost"
          value={cost}
          placeholder="NGN"
          type="text"
          error={errors.cost}
          onChange={this.onChange}
        />

        <span className="main-color"> Description</span>
        <span className="help-block">{errors.description}</span>
        <p class="subtitle">describe the center in few words</p>
        <div class="form-group">
          <textarea
            class="form-control"
            id="description"
            onChange={this.onChange}
            placeholder={descHolder}
            value={description}
          />
        </div>
        <input
          id="add-event"
          type="submit"
          value={buttonValue}
          class="btn btn-primary basic"
        />
      </form>
    );
  }
}
const propTypes = {
  uploadImage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user,
  center: state.center
});
CenterForm.propTypes = propTypes;

export default connect(mapStateToProps, {
  uploadImage,
  logout
})(CenterForm);
