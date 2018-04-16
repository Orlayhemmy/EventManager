import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { addCenter, modifyCenter } from '../actions/centerActions';
import { addCenterValidation, modifyCenterValidation } from '../shared/centerValidations';
import TextField from '../common/textField2';
import { logout } from '../actions/signInActions';
import UploadImage from './imageUpload';

@connect((store) => {
  return {
    user: store.auth.user,
    center: store.center,
  }
})

export default class CenterForm extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      centerName: '',
      location: '',
      description: '',
      facilities: '',
      capacity: '',
      errors: {},
      imageUrl: '',
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.logout = this.logout.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.state.imageUrl = this.props.center.url;
      this.props.dispatch(addCenter(this.state));
    } 
  }

  isValid() {
    if (this.props.path === '/add-center') {
      const {
        errors,
        isValid
      } = addCenterValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    }
  }

  logout(e) {
    this.props.logout();
  }

  render() {
    const {
      centerName,
      location,
      facilities,
      description,
      capacity,
      errors,
      serverError,
    } = this.state;
    let buttonValue, nameHolder, facHolder, descHolder, locationHolder, capacityHolder;
    if (this.props.path === '/add-center') {
      buttonValue = 'Add Center';
    } else {
      buttonValue = 'Save';
    }

    nameHolder = 'Center name';
    facHolder = "Facilities in center";
    descHolder = "Describe center in few words";
    locationHolder = "Center location";
    capacityHolder = "Capacity";
    return ( 
      <form id="add-center-form" onSubmit={this.onSubmit}>
        <UploadImage uploadedImage={this.props.center.url}/>
        <span className="help-block">{this.props.center.error}</span>
        <TextField
          id='centerName'
          value={centerName}
          placeholder={nameHolder}
          type='text'
          error={errors.centerName} 
          onChange={this.onChange} />

        <TextField
          id='location'
          value={this.state.location}
          placeholder={locationHolder}
          type='text'
          error={errors.location} 
          onChange={this.onChange} />
        <p class="subtitle">separate facilities with commas. Do not include spaces</p>
        <TextField
          id='facilities'
          value={this.state.facilities}
          placeholder={facHolder}
          type='text'
          error={errors.facilities} 
          onChange={this.onChange} />

        <TextField
          id='capacity'
          value={this.state.capacity}
          placeholder={capacityHolder}
          type='text'
          error={errors.capacity} 
          onChange={this.onChange} />

          <span className="help-block">{errors.description}</span>
          <p class="subtitle">describe the center in few words</p>
          <div class="form-group">
            <textarea class="form-control" id="description" onChange={this.onChange} placeholder={descHolder} value={this.state.description}></textarea>
          </div> 
          <input id="add-event" type="submit" value={buttonValue} class="btn btn-primary basic"/>
      </form>
    );
  }
}


