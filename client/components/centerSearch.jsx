import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCenters } from '../actions/centerActions';
import { searchValidation } from '../shared/centerValidations';

/**
 * @description SearchForm  component
 */
export class SearchForm extends React.Component {
  /**
   * @memberof SearchForm
   * @description it creates an instance of SearchForm
   */
  constructor() {
    super();
    this.state = {
      location: '',
      facilities: '',
      capacity: '',
      capacityType: '',
      errors: {},
      btwValue: ''
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  /**
   * @memberof SearchForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
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
  /**
   * @memberof SearchForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid() {
    const { errors, isValid } = searchValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @memberof SearchForm
   * @method search
   * @description it calls a search action
   * @param {object} event
   * @returns {void}
   */
  search(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(getCenters(this.state));
    }
  }
  /**
   * @memberof SearchForm
   * @method render
   * @description it renders the component
   * @returns the HTML of SearchForm
   */
  render() {
    const greater = ' >';
    const lesser = ' <';
    const equal = ' =';
    const between = '<>';
    const { location, facilities, capacity, capacityType, errors } = this.state;
    return (
      <div className="row bw p-3" id="center-search">
        <p className="subtitle">
          <i className="fa fa-filter green" /> filter centers by
        </p>

        <div className="input-group">
          <span class="input-group-addon">
            <i className="fa fa-map-marker p-1" />
          </span>
          <input
            id="location"
            value={this.state.location}
            placeholder="location"
            type="text"
            onChange={this.onChange}
            className="form-control"
          />
          <div className="help-block">{errors.location}</div>

          <span class="input-group-addon">
            <i className="fa fa-cogs p-1" />
          </span>
          <input
            id="facilities"
            value={this.state.facilities}
            placeholder="facilities"
            type="text"
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
            id="capacity"
            value={this.state.capacity}
            placeholder="capacity"
            type="number"
            onChange={this.onChange}
            className="form-control"
          />
          <input
            id="btwValue"
            value={this.state.btwValue}
            placeholder="capacity"
            type="number"
            onChange={this.onChange}
            className="form-control"
            hidden
          />
          <button className="btn btn-success">
            <i className="fa fa-search" onClick={this.search}>
              {' '}
              Search
            </i>
          </button>
        </div>
      </div>
    );
  }
}
const propTypes = {
  getCenters: PropTypes.func.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  center: state.center.centers
});
SearchForm.propTypes = propTypes;

export default connect(mapStateToProps, { getCenters })(SearchForm);
