import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {
  getCenters,
  getCenterSelected,
  clearState
} from '../actions/centerActions';
import { getEventSelected } from '../actions/eventActions';
import AddEventForm from './EventPage/addEventForm';
import EditEventForm from './EventPage/editEventForm';
import Modal from './Flash/modal';

/**
 * @description Event component
 */
export class Event extends React.Component {
  /**
   * @memberof Event
   * @method componentWillMount
   * @description it calls an action
   * @param {void} event
   * @returns {void}
   */
  componentWillMount() {
    this.props.getCenters();
  }
  /**
   * @memberof Event
   * @method componentDidUpdate
   * @description it throws an alert when components updates
   * @param {void}
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.event.status === 201) {
      alert(this.props.event.message);
    }
  }
  /**
   * @memberof Event
   * @method render
   * @description it renders the component
   * @returns the HTML of Event
   */
  render() {
    if (this.props.event.status === 201) {
      return <Redirect to="/dashboard" />;
    }
    let content;
    const message = this.props.event.message;
    const { path } = this.props;
    const center = this.props.eventCenter.center;
    let centerInfo;
    if (isEmpty(center)) {
      centerInfo = (
        <div className="form-inner">
          <div className="media largeIcon">
            <i className="fa fa-home">
              <h2>Select a center</h2>
            </i>
          </div>
        </div>
      );
    } else {
      centerInfo = (
        <div className="form-inner">
          <img className="img-fluid" src={center.imageUrl} />
          <div className="media-body">
            <h2 className="media-heading">
              <span>{center.centerName}</span>
            </h2>
            <h3>Location</h3>
            <p>{center.location}</p>
            <h3>Facilities</h3>
            <p>{center.facilities}</p>
            <h3>Description</h3>
            <p>{center.description}</p>
          </div>
        </div>
      );
    }
    if (this.props.path === '/modify-event') {
      content = <EditEventForm />;
    } else {
      content = <AddEventForm />;
    }
    return (
      <div id="event-form">
        <div className="container">
          <div className="row m-auto">
            <div className="col-lg-4 card mr-2 text-center bb">
              {centerInfo}
            </div>
            <div className="col-lg-7 card text-center bb pb-3">
              <div className="logo">
                lets make your <strong className="text-primary">event</strong> a
                memorable one
              </div>
              <hr />
              {content}
            </div>
            <span data-toggle="modal" data-target="#event">
              Modal
            </span>
            <Modal message={message} />
          </div>
        </div>
      </div>
    );
  }
}
const propTypes = {
  getEventSelected: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  eventCenter: state.center,
  event: state.event
});
Event.propTypes = propTypes;

export default connect(mapStateToProps, {
  getCenters,
  getCenterSelected,
  clearState,
  getEventSelected
})(Event);
