import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import $ from 'jquery';
import {
  getEvents,
  setCurrentEvent,
  clearEventState,
  deleteEvent,
  eventBooked
} from '../../../actions/eventActions';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
import DeleteModal from '../../Modal/Container/deleteModal';
import DeleteContent from '../../Common/Delete';
import { clearCenterStorage } from '../../../actions/centerActions';
import { logout } from '../../../actions/userActions';
import { getActivity } from '../../../actions/activityActions';
import DashboardContent from '../Template/Content/UserEvents';
import DashboardNotifications from '../Template/Content/UserNotifications';

/**
 * @description Dashboard component
 */
export class Dashboard extends React.Component {
  state = {
    counter: 0
  };

  /**
   * @memberof Dashboard
   * @method componentDidMount
   * @description it calls an action
   * @param {object} e
   * @returns {void}
   */
  onSelect = e => {
    this.setState({
      eventId: e.target.id,
      eventName: e.target.parentNode.id
    });
  };

  /**
   * @memberof Dashboard
   * @method componentDidMount
   * @description it calls an action
   * @returns {void}
   */
  componentDidMount() {
    const { auth: { user: { id } } } = this.props;
    this.props.clearCenterStorage();
    this.props.clearEventState();
    this.props.getEvents(0);
    this.props.getActivity(id);
    this.props.eventBooked(id);
  }
  /**
   * @memberof Dashboard
   * @method onClick
   * @description it calls an action
   * @param {object} e
   * @returns {void}
   */
  onClick = e => {
    this.props.setCurrentEvent(e.target.id, e.target.parentNode.id);
  };
  /**
   * @memberof Dashboard
   * @method componentDidUpdate
   * @description it checks some conditions when component updates
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.userEvent.status === 200) {
      $('#deleteModal').modal('hide');
      swal(this.props.userEvent.message);
    }
  }
  /**
   * @memberof Dashboard
   * @method onDelete
   * @description it calls an action
   * @returns {void}
   */
  onDelete = () => {
    this.props.deleteEvent(this.state.eventId);
  };

  onCancel = () => {
    $('#deleteModal').modal('hide');
  };
  /**
   * @memberof Dashboard
   * @method showDiv
   * @description it toggles div display
   * @param {object} e
   */
  showHiddenDiv = e => {
    const targetDiv = e.target.id;
    const div = document.getElementById(targetDiv);
    div.hidden = !div.hidden;
  };

  /**
   * @memberof Dashboard
   * @method nextEvents
   * @description it fetches the next centers
   * @param {object} e
   * @returns {void}
   */
  nextEvents = e => {
    const { counter } = this.state;
    if (e.target.id === 'next') {
      this.setState({
        counter: counter + 1
      }, () => {
        this.props.getEvents(counter);
      });
    } else {
      this.setState({
        counter: counter - 1
      }, () => {
        this.props.getEvents(counter);
      });
    }
  };
  /**
   * @memberof Dashboard
   * @method render
   * @description it renders the component
   * @returns the HTML of Dashboard
   */
  render() {
    const { userEvent: { status } } = this.props;
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (status === 498 || status === 403) {
      this.props.logout();
    }
    const { pathname } = this.props.location;
    const { activities } = this.props.activity;
    return (
      <div id="dashboard">
        <Navbar path={pathname} />
        <div className="container">
          <div className="row pt-4">
            <div className="col-lg-9">
              <div className="row event">
                <h3 className="main-color">List of events booked</h3>
                <hr />
              </div>
              <div className="row">
                <DashboardContent
                  userEvent={this.props.userEvent}
                  counter={this.state.counter}
                  onClick={this.onClick}
                  onSelect={this.onSelect}
                  nextEvents={this.nextEvents}
                />
                <DeleteModal
                  content={
                    <DeleteContent
                      onDelete={this.onDelete}
                      title={this.state.eventName}
                      onCancel={this.onCancel}
                    />
                  }
                />
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
  getActivity: PropTypes.func.isRequired,
  clearEventState: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  eventBooked: PropTypes.func.isRequired
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
    clearCenterStorage,
    clearEventState,
    deleteEvent,
    eventBooked
  }
)(Dashboard);
