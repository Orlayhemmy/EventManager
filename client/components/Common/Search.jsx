import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * @description SearchForm  component
 */
export class SearchForm extends React.Component {

  resetSearch = () => {
    const { getCenters } = this.props;
    getCenters('', 0);
  };

  /**
   * @memberof SearchForm
   * @method render
   * @description it renders the component
   * @returns the HTML of SearchForm
   */
  render() {
    const greater = 'greater >';
    const lesser = 'lesser <';
    const equal = 'equal =';
    const between = 'between <>';
    const {
      criteria: {
        location,
        facilities,
        capacity,
        btwValue,
        errors,
        capacityType
      },
      search,
      onChange
    } = this.props;
    return (
      <div id="search-nav" className="search-nav">
        <div className="search-field">
          <p className="subtitle">
            <i className="fa fa-filter green" /> filter centers by
          </p>

          <div className="input-group pb-2 pt-3">
            <div className="help-block">{errors.location}</div>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-map-marker" />
              </span>
            </div>
            <input
              id="location"
              value={location}
              placeholder="location"
              type="text"
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="input-group pb-2">
            <div className="help-block">{errors.facilities}</div>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-cog" />
              </span>
            </div>
            <input
              id="facilities"
              value={facilities}
              placeholder="facilities"
              type="text"
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="input-group pb-2">
            <select
              onChange={onChange}
              id="capacityType"
              className="form-control"
            >
              <option>capacity conditions</option>
              <option value="greater">{greater}</option>
              <option value="lesser">{lesser}</option>
              <option value="equal">{equal}</option>
              <option value="between">{between}</option>
            </select>
          </div>

          <div className="input-group pb-2" id="otherConditions">
            <div className="help-block">{errors.facilities}</div>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-users" />
              </span>
            </div>
            <input
              id="capacity"
              value={capacity}
              placeholder="capacity"
              type="number"
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="pb-2" id="btwValue" hidden={capacityType === 'between' ? '' : true}>
            <div className="input-group">
              <div className="help-block">{errors.facilities}</div>
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-users" />
                </span>
              </div>
              <input
                id="btwValue"
                value={btwValue}
                placeholder="Capacity"
                type="number"
                onChange={onChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="input-group pt-2" id="submit">
            <button
              type="button"
              className="btn btn-success"
              id="submit"
              onClick={search}
            >
              <i className="fa fa-search"> Search</i>
            </button>
            <button
              type="button"
              id="reset"
              className="btn btn-danger fr"
              onClick={this.resetSearch}
            >
              <i className="fa fa-sync-alt"> Reset</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  center: state.center
});

const propTypes = {
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  criteria: PropTypes.object.isRequired
};

SearchForm.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {}
)(SearchForm);
