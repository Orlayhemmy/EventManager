import React from 'react';
import { connect } from 'react-redux';
import { getCenters } from '../actions/centerActions';
import { searchValidation } from '../shared/centerValidations';
import { equal } from 'assert';

@connect((store) => {
  return {
    centers: store.center.centers,
  }
})

export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      facilities: '',
      capacity: '',
      capacityType: '',
      errors: {},
      btwValue: '',
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.isValid = this.isValid.bind(this);
  }
 
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    let div = document.getElementById('btwValue');
    if (e.target.value === 'between' || e.target.id === 'btwValue') {
      div.hidden = false;
    } else {
      div.hidden = true;
    }
  }
  isValid() {
    const {
      errors,
      isValid
    } = searchValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  search(e) {
    e.preventDefault();
    if (this.isValid()) {;
      this.props.dispatch(getCenters(this.state));
    }
  }

  render() {
    const greater = " >";
    const lesser = " <";
    const equal = " =";
    const between = "<>";
    const {
      location,
      facilities,
      capacity,
      capacityType,
      errors
    } = this.state;
    return (
      <div className="row bw p-3" id="center-search">
        <p className="subtitle"><i className="fa fa-filter green"></i> filter centers by</p>
 
        <div className="input-group">
          <span class="input-group-addon">
            <i className="fa fa-map-marker p-1"></i>
          </span>
          <input
            id='location'
            value={this.state.location}
            placeholder='location'
            type='text'
            onChange={this.onChange}
            className="form-control"
          />
          <div className="help-block">{errors.location}</div>

          <span class="input-group-addon">
            <i className="fa fa-cogs p-1"></i>
          </span>
          <input
          id='facilities'
          value={this.state.facilities}
          placeholder='facilities'
          type='text'
          onChange={this.onChange}
          className="form-control" 
          />
          <div className="help-block">{errors.facilities}</div>
          <div className="input-group-addon">
            <select onChange={this.onChange} id="capacityType">
              <option value="greater">{greater}</option>
              <option value="lesser">{lesser}</option>
              <option value="equal">{equal}</option>
              <option value="between">{between}</option>
            </select>
          </div>
          <input
          id='capacity'
          value={this.state.capacity}
          placeholder='capacity'
          type='number'
          onChange={this.onChange}
          className="form-control" 
          />
          <input
          id='btwValue'
          value={this.state.btwValue}
          placeholder='capacity'
          type='number'
          onChange={this.onChange}
          className="form-control" hidden
          />
          <button className="btn btn-success"><i className="fa fa-search" onClick={this.search}> Search</i></button>
        </div>
      </div>
    )
  }

}