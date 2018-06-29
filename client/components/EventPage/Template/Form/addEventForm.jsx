import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearEventState } from '../../../../actions/eventActions';

/**
 * @description AddEventForm component
 */
export class AddEventForm extends React.Component {
    /**
    * @memberof EditEventForm
    * @method componentDidUpdate
    * @returns {void}
    */
  componentDidUpdate() {
    const { dateArray, bookedDate } = this.props.eventState;
    if (this.props.userEvent.isAvailable) {
      dateArray.push(bookedDate);
      let div = document.getElementById('chosenDates');
      div.insertAdjacentHTML('afterbegin', `<button id="chosen-dates" class="btn btn-success ml-2 mb-2">
      ${bookedDate} <i class="fa fa-times" id=${bookedDate}></i>
      </button>`);
      this.props.eventState.bookedDate = '';
      this.props.clearEventState();
    };
    const button = document.getElementById("chosen-dates");
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.props.removeDate(e.target.id);
        button.parentNode.removeChild(button);
      });
    }
  }
    /**
   * @memberof AddEventForm
   * @method render
   * @description it renders the component
   * @returns the HTML of addeventform
   */
  render() {
    const { event } = this.props.userEvent;
    const {
      eventTitle,
      bookedDate,
      errors,
      centerId,
    } = this.props.eventState;
  
    const showCenters = _.map(this.props.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    return (
      <div>        
        <form id="add-event-form" onSubmit={this.props.onFormSubmit}>
          <span className="help-block">{this.props.userEvent.error}</span>
          <p className="subtitle">select your preferred event center</p>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-home"></i>
              </div>
            </div>
            <select className="form-control" defaultValue={centerId} id="centerId" onChange={this.props.onFormChange}>            
              <option value="">Select Center</option>
              {showCenters}
            </select>
          </div>

          <span className="help-block">{errors.bookedDate}</span>
            <div class="form-row">
              <div className="input-group col-10 pr-0 mb-2">
                <span class="input-group-prepend">
                  <span class="input-group-text">
                  <i className="fa fa-calendar"></i>
                  </span>
                </span>
                <input type="text" id="bookedDate" onBlur={this.props.onFormChange} class="form-control" value={bookedDate} placeholder="Select preferred date"/>
              </div>
              <div className="col-2">
                <input id="add-event" type="button" value="Select" onClick={this.props.checkDate} className="btn btn-primary date-button"/>
              </div>
            </div>
            <div id="chosenDates" className="chosen-date-div"></div>
          
          <span className="help-block">{errors.eventTitle}</span>  
            <div class="input-group">
            <span class="input-group-prepend">
                  <span class="input-group-text">
                  <i className="fa fa-microphone"></i>
                  </span>
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
  userEvent: PropTypes.object.isRequired,
  clearEventState: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  centers: state.center.centers,
  center: state.center.center,
  userEvent: state.event,
})
AddEventForm.propTypes = propTypes;

export default connect(mapStateToProps, { clearEventState })(AddEventForm);
