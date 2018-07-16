import React from 'react';
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
  /**
   * @memberof ModifyEventPage
   * @method removeDate
   * @description it sets user input to state
   * @param {object} e
   */
  clickDate = e => {
    e.preventDefault();
    this.props.clearEventState();
    const button = document.getElementById(e.target.id);
    button.parentNode.removeChild(button);
    this.props.removeDate(e.target.parentNode.id);
  };
  /**
   * @memberof EditEventForm
   * @method render
   * @description it renders the component
   * @returns the HTML of editeventform
   */
  render() {
    const {
      eventState,
      onChange,
      onFormSubmit,
      eventCenter,
      checkDate,
      search,
      onFormChange,
      criteria,
      userEvent
    } = this.props;
    const {
      eventTitle, description, errors, centerId, dateArray, centerName
    } = eventState;
    let eventDate;
    const showCenters = eventCenter.centers.map((center, index) => (
      <option key={index} value={center.id}>
        {center.centerName}
      </option>
    ));
    if (dateArray.length > 0) {
      eventDate = dateArray.map((eachEvent, index) => (
        <span id={index}>
        <p class="btn btn-success ml-2 mb-2" id={eachEvent} key={index}>
          {eachEvent}{' '}
          <i className="fa fa-times" id={eachEvent} onClick={this.clickDate} />
        </p>
        </span>
      ));
    }
    return (
      <form id="edit-event-form" onSubmit={onFormSubmit}>
        <span className="help-block">{userEvent.error}</span>
        <CenterSearch criteria={criteria} search={search} onChange={onChange} />
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
            onChange={onFormChange}
            disabled={dateArray.length !== 0 ? true : ''}
          >
            <option value="">{centerName}</option>
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
              type="date"
              id="bookedDate"
              onBlur={onFormChange}
              class="form-control"
              placeholder="Select preferred date"
            />
          </div>
          <div className="col-2">
            <input
              id="modify-date"
              type="button"
              value="Select"
              onClick={checkDate}
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
            onChange={onFormChange}
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
            onChange={onFormChange}
            value={description}
          />
        </div>
        <input
          id="edit-event"
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
