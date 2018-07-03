import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CenterSearch from '../../../Common/Search';
import { clearEventState } from '../../../../actions/eventActions';

/**
 * @description EditEventForm component
 */
export class EditEventForm extends React.Component {
  /**
   * @memberof EditEventForm
   * @method componentDidUpdate
   * @returns {void}
   */
  componentDidUpdate() {
    const { dateArray, bookedDate } = this.props.eventState;
    if (this.props.userEvent.isAvailable) {
      dateArray.push(bookedDate);
      this.props.eventState.bookedDate = '';
      this.props.clearEventState();
    }
  }
  clickDate = (e) => {
    e.preventDefault();
    this.props.clearEventState();
    const button = document.getElementById(e.target.parentNode.id);
    button.parentNode.removeChild(button);
    this.props.removeDate(e.target.parentNode.id);
  }
  /**
   * @memberof EditEventForm
   * @method render
   * @description it renders the component
   * @returns the HTML of editeventform
   */
  render() {
    const {
      userEvent,
      onFormChange,
      onFormSubmit,
      eventCenter,
      eventState,
      checkDate
    } = this.props;
    const {
      eventTitle,
      description,
      errors,
      centerId,
      dateArray
    } = eventState;
    let eventDate;
    const showCenters = this.props.eventCenter.centers.map(center => {
      return (
        <option key={center.id} value={center.id}>
          {center.centerName}
        </option>
      );
    });
    if (dateArray) {
      eventDate = dateArray.map((eventDate, index) => {
        return (
          <span id={eventDate} class="btn btn-success ml-2 mb-2" key={index}>
            {eventDate} <i class="fa fa-times" onClick={this.clickDate}/>
          </span>
        );
      });
    }
    
    return (
      <form id="edit-event-form" onSubmit={this.props.onFormSubmit}>
        <span className="help-block">{this.props.userEvent.error}</span>
        <CenterSearch
          criteria={this.props.criteria}
          search={this.props.search}
          onChange={this.props.onChange}
        />
        <p className="subtitle">select your preferred event center</p>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i className="fa fa-home" />
            </div>
          </div>
          <select
            className="form-control"
            defaultValue={centerId}
            id="centerId"
            onChange={this.props.onFormChange}
            disabled={dateArray.length > 0 ? true : ''}
          >
            <option value="">Select Center</option>
            {showCenters}
          </select>
        </div>

        <span className="help-block">{errors.bookedDate}</span>
        <div class="form-row">
          <div className="input-group col-10 pr-0 mb-2">
            <span class="input-group-prepend">
              <span class="input-group-text">
                <i className="fa fa-calendar" />
              </span>
            </span>
            <input
              type="text"
              id="bookedDate"
              onBlur={this.props.onFormChange}
              class="form-control"
              placeholder="Select preferred date"
            />
          </div>
          <div className="col-2">
            <input
              id="add-event"
              type="button"
              value="Select"
              onClick={this.props.checkDate}
              className="btn btn-primary date-button"
            />
          </div>
          <div id="chosenDates" className="chosen-date-div">
            {eventDate}
          </div>
        </div>

        <span className="help-block">{errors.eventTitle}</span>
        <div class="input-group">
          <span class="input-group-prepend">
            <span class="input-group-text">
              <i className="fa fa-microphone" />
            </span>
          </span>
          <input
            type="text"
            id="eventTitle"
            onChange={this.props.onFormChange}
            class="form-control"
            value={eventTitle}
            placeholder="give your event a title"
          />
        </div>

        <span className="help-block">{errors.description}</span>
        <p className="subtitle">describe your event in few words</p>
        <div className="form-group">
          <textarea
            className="form-control"
            id="description"
            onChange={this.props.onFormChange}
            value={description}
          />
        </div>
        <input
          id="add-event"
          type="submit"
          value="Add Event"
          className="btn btn-primary"
        />
      </form>
    );
  }
}

const propTypes = {
  user: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  clearEventState: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.auth,
  eventCenter: state.center,
  userEvent: state.event,
  centers: state.center.centers
});
EditEventForm.propTypes = propTypes;

export default connect(
  mapStateToProps,
  { clearEventState }
)(EditEventForm);
