/* eslint disable */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getEvents, setCurrentEvent } from '../../../actions/eventActions';
import EventForm from '../../EventPage/Template/Form/editEventForm';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
import DeleteModal from '../../Modal/Container/deleteModal';
import { clearCenterStorage } from '../../../actions/centerActions';
import Modal from '../../Flash/modal';
import { logout } from '../../../actions/userActions';
import { getActivity } from '../../../actions/activityActions';
import DashboardContent from '../Template/Content/UserEvents';
import DashboardNotifications from '../Template/Content/UserNotifications';

/**
 * @description Dashboard component
 */
export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.nextEvents = this.nextEvents.bind(this);
  }
  /**
   * @memberof Dashboard
   * @method componentWillMount
   * @description it calls an action
   * @param {void}
   * @returns {void}
   */
  componentWillMount() {
    this.props.clearCenterStorage();
    this.props.getEvents(0);
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
    this.props.setCurrentEvent(e.target.id, e.target.parentNode.id);
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
   * @method nextEvents
   * @description it fetches the next centers
   * @returns {void}
   */
  nextEvents(e) {
    if (e.target.id === 'next') {
      this.setState({
        counter: this.state.counter + 1
      });
      this.props.getEvents(++this.state.counter);
    } else {
      this.setState({
        counter: this.state.counter - 1
      });
      this.props.getEvents(--this.state.counter);
    }
  }
  /**
   * @memberof Dashboard
   * @method render
   * @description it renders the component
   * @returns the HTML of Dashboard
   */
  render() {
    const { status } = this.props.userEvent;
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (status === 498 || status === 403) {
      this.logout();
    }
    const { pathname } = this.props.location;
    const { activities } = this.props.activity;
    const { message } = this.props.userEvent;
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
                <DashboardContent
                  userEvent={this.props.userEvent}
                  counter={this.state.counter}
                  onClick={this.onClick}
                  onDelete={this.onDelete}
                  nextEvents={this.nextEvents}
                />
                <DeleteModal path={pathname} />
                <Modal message={this.props.userEvent.message} />
              </div>
            </div>
            <div className="col-lg-3 col3-bg">
              <div className="p-4 fw">
                <h2>Notifications</h2>
              </div>
              <DashboardNotifications
                activities={activities}
                onClick={this.onClick}
              />
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
  clearCenterStorage: PropTypes.func.isRequired,
  setCurrentEvent: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  userEvent: state.event,
  activity: state.adminActivity
});
Dashboard.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    setCurrentEvent,
    logout,
    getEvents,
    getActivity,
    clearCenterStorage
  }
)(Dashboard);
