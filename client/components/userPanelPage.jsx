/* eslint disable */
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
import Footer from './footer.jsx';
import DeleteModal from './deleteModal';
import {
  getCenterSelected,
  clearCenterStorage
} from '../actions/centerActions';
import Modal from './Flash/Modal';
import { logout } from '../actions/userActions';
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
    this.props.clearCenterStorage();
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
    let legend;
    const { status } = this.props.userEvent;
    let content;
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (status === 498 || status === 403) {
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
      legend = (
        <div className="row center">
          <span className="legend">
            Approved Booking: <i className="fa fa-thumbs-up green" />
          </span>
          <span className="legend">
            Edit Booking: ...<i className="fa fa-pencil main-color" />
          </span>
          <span className="legend">
            Delete Booking: <i className="fa fa-trash trash" />
          </span>
        </div>
      );
      const eventsArray = this.props.userEvent.events;
      content = _.map(eventsArray, (bookedEvent, index) => {
        const {
          centerName,
          capacity,
          location,
          facilities,
          imageUrl
        } = bookedEvent.Center;
        let eStatus;
        if (bookedEvent.isApproved) {
          eStatus = <i className="fa fa-thumbs-up green float-left" />;
        } else {
          eStatus = <i className="fa fa-spinner main-color float-left" />;
        }
        eventId = `eventDetails${index}`;
        editEventId = `eventDetails${index}`;
        form = `form${index}`;
        let dateBooked = `date${index}`;
        return (
          <div className="center" key={index}>
            <div key={eventId} className="text-center">
              <div className="card p-1 mb-3 mw">
                <div id={index} className="grid-view">
                  <span>{eStatus}</span>
                  <img className="img m-auto" src={imageUrl} />
                  <h2>
                    <span className="media-heading" id={index}>
                      <Link
                        to="/modify-event"
                        id={bookedEvent.id}
                        onClick={this.onClick.bind(this)}
                      >
                        {bookedEvent.eventTitle}
                      </Link>
                    </span>
                  </h2>
                </div>
                {/* <div id={eventId} hidden>
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
                </div> */}
                <span>
                  <Link
                    to="/modify-event"
                    id={bookedEvent.id}
                    onClick={this.onClick.bind(this)}
                    className="float-left"
                  >
                    ...<i className="fa fa-pencil" />
                  </Link>
                  <i
                    id={event.id}
                    className="fa fa-trash trash float-right"
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
              {creationDate}
              <br />
              {activity.description}
            </p>
          </span>
        </div>
      );
    });
    return (
      <div id="dashboard">
        <Navbar />
        <div className="container">
          <div className="row pt-4">
            <div className="col-lg-9 col9-bg">
              <div className="row event">
                <h1>Dashboard</h1>
                <h3 className="main-color">List of events booked</h3>
                <hr />
              </div>
              <div className="row">
                {legend}
                <div className="row">
                  {content}
                  <DeleteModal path={pathname} />
                  <Modal message={this.props.userEvent.message} />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col3-bg">
              <div className="p-4 fw">
                <h2>Notifications</h2>
              </div>
              {recentActivity}
            </div>
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
  clearCenterStorage: PropTypes.func.isRequired,
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
  getCenterSelected,
  logout,
  getEvents,
  getEventSelected,
  getActivity,
  clearCenterStorage
})(Dashboard);
