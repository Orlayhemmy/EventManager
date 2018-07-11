import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uploadImage from '../../../../actions/imageAction';
import { addCenterValidation } from '../../../../shared/centerValidations';
import TextField from '../../../../common/textField2';
import UploadImage from '../../../ImageUpload/ImageUpload';

/**
 * @description CenterForm component
 */
export class CenterForm extends React.Component {
  state = {
    centerName: '',
    location: '',
    description: '',
    facilities: '',
    capacity: '',
    errors: {},
    image: '',
    cost: ''
  };
  /**
   * @memberof CenterForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  /**
   * @memberof CenterForm
   * @method showImage
   * @description it sets user input to state
   * @param {object} event
   */
  showImage = event => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    this.state.imageData = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ image: reader.result });
    };
    reader.readAsDataURL(file);
  };
  /**
   * @memberof CenterForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid = e => {
    e.preventDefault();
    const { errors, isValid } = addCenterValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    this.onSubmit(e);
  };
  /**
   * @memberof CenterForm
   * @method onSubmit
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onSubmit = e => {
    e.preventDefault();
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
    };
    this.props.uploadImage(data, formData, 'center');
  };

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
      image,
      cost
    } = this.state;
    let buttonValue,
      nameHolder,
      facHolder,
      descHolder,
      locationHolder,
      capacityHolder;

    nameHolder = 'Center name';
    facHolder = 'Facilities in center';
    descHolder = 'Describe center in few words';
    locationHolder = 'Center location';
    capacityHolder = 'Capacity';
    return (
      <form id="add-center-form" onSubmit={this.isValid}>
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
          value="Add Center"
          class="btn btn-primary basic"
        />
      </form>
    );
  }
}
const propTypes = {
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user,
  center: state.center
});
CenterForm.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    uploadImage
  }
)(CenterForm);
