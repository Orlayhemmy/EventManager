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
      const div = document.getElementById('chosenDates');
      div.insertAdjacentHTML(
        'afterbegin',
        `<button id="chosen-dates" class="btn btn-success ml-2 mb-3">
      ${bookedDate} <i class="fa fa-times" id=${bookedDate}></i>
      </button>`
      );
      this.props.eventState.bookedDate = '';
      this.props.clearEventState();
    }
    const button = document.getElementById('chosen-dates');
    if (button) {
      button.addEventListener('click', e => {
        e.preventDefault();
        this.props.clearEventState();
        this.props.eventState.dateArray = [];
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
    const {
      userEvent,
      onFormChange,
      onFormSubmit,
      eventCenter,
      eventState,
      checkDate
    } = this.props;
    const { centers } = eventCenter;
    const {
      eventTitle, bookedDate, errors, centerId, dateArray
    } = eventState;

    const showCenters = centers.map((center, index) => (
        <option key={center.id} value={center.id} id={index}>
          {center.centerName}
        </option>
    ));
    return (
      <div>
        <form id="add-event-form" onSubmit={onFormSubmit}>
          <span className="help-block">{userEvent.error}</span>
          <p className="subtitle">select your preferred event center</p>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-home" />
              </div>
            </div>
            <select
              className="form-control"
              defaultValue={centerId}
              id="centerId"
              onChange={onFormChange}
              disabled={dateArray.length > 0 ? true : ''}
            >
              <option value="">Select Center</option>
              {showCenters}
            </select>
          </div>

          <span className="help-block">{errors.dateArray}</span>
          <div class="form-row">
            <div className="input-group col-10 pr-0 mb-3">
              <span class="input-group-prepend">
                <span class="input-group-text">
                  <i className="fa fa-calendar" />
                </span>
              </span>
              <input
                type="date"
                id="bookedDate"
                onChange={onFormChange}
                class="form-control"
                value={bookedDate}
                placeholder="Select preferred date"
              />
            </div>
            <div className="col-2">
              <input
                id="add-date"
                type="button"
                value="Select"
                onClick={checkDate}
                className="btn btn-primary date-button"
              />
            </div>
          </div>
          <div id="chosenDates" className="chosen-date-div" />

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
              onChange={onFormChange}
              class="form-control"
              value={eventTitle}
              placeholder="give your event a title"
            />
          </div>

          <span className="help-block">{errors.description}</span>
          <p className="subtitle">describe your event in few words</p>
          <div className="form-group mb-4">
            <textarea
              className="form-control"
              id="description"
              onChange={onFormChange}
              placeholder="Give a brief description of the event"
            />
          </div>
          <input
            id="submit-event"
            type="submit"
            value="Add Event"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  clearEventState: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  eventCenter: state.center,
  userEvent: state.event
});
AddEventForm.propTypes = propTypes;

export default connect(
  mapStateToProps,
  { clearEventState }
)(AddEventForm);
