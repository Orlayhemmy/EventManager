import React from 'react';

/**
 * @description SearchForm  component
 */
export default class SearchForm extends React.Component {
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
    const { location, facilities, capacity, capacityType, btwValue, errors } = this.props.criteria;
    return (
      <div className="row bw p-3" id="center-search">
        <p className="subtitle">
          <i className="fa fa-filter green" /> filter centers by
        </p>

        <div className="input-group">
          <span class="input-group-addon search-icon p-1">
            <i className="fa fa-map-marker p-1" />
          </span>
          <input
            id="location"
            value={location}
            placeholder="location"
            type="text"
            onChange={this.props.onChange}
            className="form-control"
          />
          <div className="help-block">{errors.location}</div>

          <span class="input-group-addon search-icon p-1">
            <i className="fa fa-cogs p-1" />
          </span>
          <input
            id="facilities"
            value={facilities}
            placeholder="facilities"
            type="text"
            onChange={this.props.onChange}
            className="form-control"
          />
          <div className="help-block">{errors.facilities}</div>
          <div className="input-group-addon search-icon p-1">
            <select onChange={this.props.onChange} id="capacityType">
              <option value="greater">{greater}</option>
              <option value="lesser">{lesser}</option>
              <option value="equal">{equal}</option>
              <option value="between">{between}</option>
            </select>
          </div>
          <input
            id="capacity"
            value={capacity}
            placeholder="capacity"
            type="number"
            onChange={this.props.onChange}
            className="form-control"
          />
          <input
            id="btwValue"
            value={btwValue}
            placeholder="capacity"
            type="number"
            onChange={this.props.onChange}
            className="form-control"
            hidden
          />
          <button className="btn btn-success">
            <i className="fa fa-search" onClick={this.props.search}>
              {' '}
              Search
            </i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  center: state.center
});
