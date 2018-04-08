import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Link } from 'react-router-dom';

import { getEvents, eventSelected } from '../actions/eventActions';
import EventForm from '../components/eventPage/editEventForm';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import FlashMessageList from './flash/flashMessagesList';
import DeleteModal from './deleteModal';
import { centerSelected } from '../actions/centerActions';
import Modal from './flash/modal';
import { logout } from '../actions/signInActions';
import { getActivity } from '../actions/activityActions';

@connect((store) => {
  return {
    auth: store.auth,
    events: store.event,
    event: store.event,
    activity: store.adminActivity,
  };
})

export default class Dashboard extends React.Component {

  componentWillMount() {
    this.props.dispatch(getEvents());
    this.props.dispatch(getActivity(this.props.auth.user.id));
    
  }
  
  onClick(e) {
    let child = document.getElementById(e.target.id);
    let parent = child.parentNode;
    this.props.dispatch(eventSelected(e.target.id));
    this.getCenter(parent.id);
  }

  getId(e) {
    this.props.dispatch(eventSelected(e.target.id));
  }

  getCenter(id) {
    this.props.dispatch(centerSelected(id));
  }

  componentDidUpdate() {
    if (this.props.event.status === 200) {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
      });
      alert(this.props.event.message);
    }
  }

  onDelete(e) {
    const eventData = {
      eventId: e.target.id,
      eventName: e.target.parentNode.id,
    }
    this.props.dispatch(eventSelected(eventData));
  }
  
  showHiddenDiv(e) {
    let id = e.target.dataset.toggleId;
    let id2 = e.target.id;
    if(!id) return;
    const div = document.getElementById(id);
    div.hidden = !div.hidden;

    if (id) {
      const div2 = document.getElementById(id2);
      if (!div.hidden) {
        return div2.style.display="none";
      }
      return div2.style.display="";
    } 
  }

  logout(e) {
    this.props.dispatch(logout());
  }
   
  render() {
    let content;
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.props.event.status === 401) {
      this.logout();
    }
    const { activities } = this.props.activity;

    const { message } = this.props.event;
    let eventId, editEventId, eventBody, form;
    const { pathname } = this.props.location;
    if (isEmpty(this.props.event.events)) {
      content = (
        <div className="emptyEvent img-fluid text-center ml-2 mt-3 pt-2">
            <span><p className="display-3">No Event Booked Yet</p></span>
        </div>
      );
    } else {
      content = _.map(this.props.event.events, (event, index) => {
        eventBody = `event-body${event.id}`;
        eventId = `eventDetails${event.id}`;
        editEventId = `editEventDetails${event.id}`;
        form = `form${event.id}`;
        let dateBooked = `date${event.id}`;
        return (
          <div className="center" key={index}>
            <div id={eventId} key={eventId} className="text-center">
              <div className="card p-1 bb mb-3">
                <div id={event.centerId}>
                  <img className="img" src={event.Center.image_url}/>
                  <h2>
                    <span className="media-heading" data-toggle-id={eventBody} onClick={this.showHiddenDiv}>
                      <Link to="/modify-event" id={event.centerId}>{event.eventTitle}</Link> 
                    </span>
                  </h2>
                </div>
                <div id={eventBody} hidden>
                  <div className="media-body">
                      <h3><span>Date: </span> {event.bookedDate}</h3>
                      <h3><span>Center: </span> {event.Center.centerName}</h3>
                      <h3><span>Capacity: </span> {event.Center.capacity}</h3>
                      <h3><span>Location: </span> {event.Center.location}</h3>
                      <h3><span>facilities: </span> {event.Center.facilities}</h3>
                      <h3><span>Event description: </span> {event.description}</h3>
                  </div>
                </div>
                <span id={event.eventTitle}>
                  <i id={eventId} data-toggle-id={editEventId} className="fa fa-pencil main-color edit" onClick={this.showHiddenDiv}></i>
                  <i id={event.id} className="fa fa-trash trash" onClick={this.onDelete.bind(this)} data-toggle="modal" data-target="#deleteModal"></i>
                </span>
              </div>
            </div>
          </div>
        )
      });
    }
    const recentActivity = _.map(activities,  (activity, index) => {
      const creationDate = activity.createdAt.replace(/-/g,'/').replace('Z','').replace('T',' ').slice(0, 16);
      return (
        <div className="row card p-1 mb-1" key={index}>
          <span><p className="activity-font mb-0 p-1" onClick={this.onClick.bind(this)} id={activity.eventId}>{activity.description}
          <br/>
          {creationDate}</p></span>
        </div>
      )
    });
    return (
        <div id="event-page">
          <Navbar />
          <div className="container">
            <div className="row pt-4">
              <div className="col-lg-9">
                <div className="row">
                  {content}
                  <DeleteModal path={pathname}/>
                  <Modal message={this.props.event.message}/>
                </div>
              </div>
              <div className="col-lg-3">
                {recentActivity}
              </div>
            </div>
          </div>
          <Footer />
        </div>
    );
  }
}

