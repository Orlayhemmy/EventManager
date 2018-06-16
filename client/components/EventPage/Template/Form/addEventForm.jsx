import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CenterSearch from '../../../Common/Search';

/**
 * @description AddEventForm component
 */
export class AddEventForm extends React.Component {

  /**
   * @memberof AddEventForm
   * @method render
   * @description it renders the component
   * @returns the HTML of addeventform
   */
  render() {
    const { event } = this.props.event;
    const {
      eventTitle,
      bookedDate,
      description,
      errors,
      isLoading,
      centerId
    } = this.props.eventState;
    
    const showCenters = _.map(this.props.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    
    return (
      <div>        
        <form id="add-event-form" onSubmit={this.props.onFormSubmit}>
          <span className="help-block">{this.props.event.error}</span>
          <CenterSearch 
            criteria={this.props.criteria}
            search={this.props.search}
            onChange={this.props.onChange}
          />
          <p className="subtitle">select your preferred event center</p>
          <div className="input-group">
            <span class="input-group-addon search-icon">
              <i className="fa fa-home"></i>
            </span>
            <select className="form-control" defaultValue={centerId} id="centerId" onChange={this.props.onFormChange}>            
              <option value="">Select Center</option>
              {showCenters}
            </select>
          </div>

          <span className="help-block">{errors.bookedDate}</span>
            <div class="input-group">
              <span class="input-group-addon search-icon">
                <i className="fa fa-calendar"></i>
              </span>
              <input type="text" id="bookedDate" onBlur={this.props.onFormChange} class="form-control" value={bookedDate} placeholder="Select preferred date"/>
            </div>

          <span className="help-block">{errors.eventTitle}</span>  
            <div class="input-group">
              <span class="input-group-addon search-icon">
                <i className="fa fa-microphone"></i>
              </span> 
              <input type="text" id="eventTitle" onChange={this.props.onFormChange} class="form-control" value={eventTitle} placeholder="give your event a title"/>
            </div>

          <span className="help-block">{errors.description}</span>
          <p className="subtitle">describe your event in few words</p>
          <div className="form-group">
            <textarea className="form-control" id="description"
          onChange={this.props.onFormChange} placeholder="Give a brief description of the event"></textarea>
          </div> 
          <input id="add-event" type="submit" value="Add Event" className="btn btn-primary"/>
        </form> 
      </div>
    )
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  centers: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  centers: state.center.centers,
  center: state.center.center,
  dates: state.event.disableDates,
  event: state.event,
})
AddEventForm.propTypes = propTypes;

export default connect(mapStateToProps, {})(AddEventForm);
