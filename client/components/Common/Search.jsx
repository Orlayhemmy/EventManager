import React from 'react';

/**
 * @description SearchForm  component
 */
export default class SearchForm extends React.Component {

  onChange = (e) => {
    this.props.onChange(e);
    const div = document.getElementById('btwValue');
    if (e.target.id === "capacityType" ) {
      if (e.target.value === 'between' || e.target.id === 'btwValue') {
        div.hidden = false;
      } else {
        div.hidden = true;
      }
    }
  }
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
      location,
      facilities,
      capacity,
      capacityType,
      btwValue,
      errors
    } = this.props.criteria;
    return (
      <div id="search-nav" class="search-nav">
        <div className="search-field">
          <p className="subtitle">
            <i className="fa fa-filter green" /> filter centers by
          </p>

          <div className="input-group pb-2">
            <div className="help-block">{errors.location}</div>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i className="fa fa-map-marker" />
              </span>
            </div>
            <input
              id="location"
              value={location}
              placeholder="location"
              type="text"
              onChange={this.onChange}
              className="form-control"
            />
          </div>
          <div className="input-group pb-2">
            <div className="help-block">{errors.facilities}</div>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i className="fa fa-cog" />
              </span>
            </div>
            <input
              id="facilities"
              value={facilities}
              placeholder="facilities"
              type="text"
              onChange={this.onChange}
              className="form-control"
            />
          </div>

          <div className="input-group pb-2">
            <select
              onChange={this.onChange}
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
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i className="fa fa-users" />
              </span>
            </div>
            <input
              id="capacity"
              value={capacity}
              placeholder="capacity"
              type="number"
              onChange={this.onChange}
              className="form-control"
            />
          </div>
          <div className="pb-2" id="btwValue" hidden>
            <div className="input-group">
              <div className="help-block">{errors.facilities}</div>
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i className="fa fa-users" />
                </span>
              </div>
              <input
                id="btwValue"
                value={btwValue}
                placeholder="Capacity"
                type="number"
                onChange={this.onChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="input-group pt-2">
            <button className="btn btn-success" onClick={this.props.search}>
              <i className="fa fa-search"> Search</i>
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
