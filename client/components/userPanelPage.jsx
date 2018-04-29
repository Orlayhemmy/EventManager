import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getEvents, getEventSelected } from '../actions/eventActions';
import EventForm from '../components/EventPage/EditEventForm';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import DeleteModal from './deleteModal';
import { centerSelected, getCenterSelected } from '../actions/centerActions';
import Modal from './Flash/Modal';
import { logout } from '../actions/signInActions';
import { getActivity } from '../actions/activityActions';

/**
 * @description Dashboard component
 */
export class Dashboard extends React.Component {
  /**
   * @memberof Dashboard
   * @method componentWillMount
   * @description it calls an action
   * @param {void}
   * @returns {void}
   */
  componentWillMount() {
    this.props.getEvents();
    this.props.getActivity(this.props.auth.user.id);
  }
  /**
   * @memberof Dashboard
   * @method onClick
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onClick(e) {
    this.props.getCenterSelected(e.target.parentNode.id);
    this.props.getEventSelected(e.target.id);
  }
  /**
   * @memberof Dashboard
   * @method getId
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  getId(e) {
    this.props.eventSelected(e.target.id);
  }
  /**
   * @memberof Dashboard
   * @method getCenter
   * @description it calls an action
   * @param {String} id
   * @returns {void}
   */
  getCenter(id) {
    this.props.centerSelected(id);
  }
  /**
   * @memberof Dashboard
   * @method componentDidUpdate
   * @description it checks some conditions when component updates
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.userEvent.status === 200) {
      $(document).ready(function() {
        $('#deleteModal').modal('hide');
      });
      swal(this.props.userEvent.message);
    }
  }
  /**
   * @memberof Dashboard
   * @method onDelete
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onDelete(e) {
    const eventData = {
      eventId: e.target.id,
      eventName: e.target.parentNode.id
    };
    this.props.eventSelected(eventData);
  }
  /**
   * @memberof Dashboard
   * @method showDiv
   * @description it toggles div display
   * @param {object} event
   */
  showHiddenDiv(e) {
    const targetDiv = e.target.id;
    const div = document.getElementById(targetDiv);
    div.hidden = !div.hidden;
  }
  /**
   * @memberof Dashboard
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof Dashboard
   * @method render
   * @description it renders the component
   * @returns the HTML of Dashboard
   */
  render() {
    let content;
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.props.userEvent.status === 401) {
      this.logout();
    }
    const { activities } = this.props.activity;

    const { message } = this.props.userEvent;
    let eventId, editEventId, eventBody, form;
    const { pathname } = this.props.location;
    if (isEmpty(this.props.userEvent.events)) {
      content = (
        <div className="emptyEvent img-fluid text-center ml-2 mt-3 pt-2">
          <span>
            <p className="display-3">No Event Booked Yet</p>
          </span>
        </div>
      );
    } else {
      const eventsArray = this.props.userEvent.events;
      content = eventsArray.map((bookedEvent, index) => {
        console.log(bookedEvent);
        const {
          centerName,
          capacity,
          location,
          facilities,
          imageUrl
        } = bookedEvent.Center;
        eventId = `eventDetails${index}`;
        editEventId = `eventDetails${index}`;
        form = `form${index}`;
        let dateBooked = `date${index}`;
        return (
          <div className="center" key={index}>
            <div key={eventId} className="text-center">
              <div className="card p-1 bb mb-3">
                <div id={index}>
                  <img className="img" src={imageUrl} />
                  <h2>
                    <span className="media-heading" id={index}>
                      <Link
                        to="/modify-event"
                        id={event.id}
                        onClick={this.onClick.bind(this)}
                      >
                        {bookedEvent.eventTitle}
                      </Link>
                    </span>
                  </h2>
                </div>
                <div id={eventId} hidden>
                  <div className="media-body">
                    <h3>
                      <span>Date: </span> {bookedEvent.bookedDate}
                    </h3>
                    <h3>
                      <span>Center: </span> {centerName}
                    </h3>
                    <h3>
                      <span>Capacity: </span> {capacity}
                    </h3>
                    <h3>
                      <span>Location: </span> {location}
                    </h3>
                    <h3>
                      <span>facilities: </span> {facilities}
                    </h3>
                    <h3>
                      <span>Event description: </span> {bookedEvent.description}
                    </h3>
                  </div>
                </div>
                <span>
                  <i
                    id={eventId}
                    className="fa fa-pencil main-color edit"
                    onClick={this.showHiddenDiv}
                  />
                  <i
                    id={event.id}
                    className="fa fa-trash trash"
                    onClick={this.onDelete.bind(this)}
                    data-toggle="modal"
                    data-target="#deleteModal"
                  />
                </span>
              </div>
            </div>
          </div>
        );
      });
    }
    const recentActivity = activities.map((activity, index) => {
      const creationDate = activity.createdAt
        .replace(/-/g, '/')
        .replace('Z', '')
        .replace('T', ' ')
        .slice(0, 16);
      return (
        <div className="row card p-1 mb-1" key={index}>
          <span>
            <p
              className="activity-font mb-0 p-1"
              onClick={this.onClick.bind(this)}
              id={activity.eventId}
            >
              {activity.description}
              <br />
              {creationDate}
            </p>
          </span>
        </div>
      );
    });
    return (
      <div id="event-page">
        <Navbar />
        <div className="container">
          <div className="row pt-4">
            <div className="col-lg-9">
              <div className="row">
                {content}
                <DeleteModal path={pathname} />
                <Modal message={this.props.userEvent.message} />
              </div>
            </div>
            <div className="col-lg-3">{recentActivity}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
  getEventSelected: PropTypes.func.isRequired,
  centerSelected: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  userEvent: state.event,
  activity: state.adminActivity
});
Dashboard.propTypes = propTypes;

export default connect(mapStateToProps, {
  centerSelected,
  getCenterSelected,
  logout,
  getEvents,
  getEventSelected,
  getActivity
})(Dashboard);
