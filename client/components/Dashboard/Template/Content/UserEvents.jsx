import React from 'react';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Link } from 'react-router-dom';

export default class Content extends React.Component {
  render() {
    const { status, events } = this.props.userEvent;
    let eventId, editEventId, eventBody, form, content, legend;
    if (isEmpty(events)) {
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
            Edit Booking: ...<i className="fa fa-pencil-alt main-color" />
          </span>
          <span className="legend">
            Delete Booking: <i className="fa fa-trash trash" />
          </span>
        </div>
      );
      const eventsArray = this.props.userEvent.events;
      console.log(eventsArray);
      content = _.map(eventsArray, (bookedEvent, index) => {
        const { imageUrl } = bookedEvent.Center;
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
                    <span className="media-heading" id={bookedEvent.centerId}>
                      <Link
                        to="/modify-event"
                        id={bookedEvent.id}
                        onClick={this.props.onClick}
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
                    onClick={this.props.onClick}
                    className="float-left"
                  >
                    ...<i className="fa fa-pencil-alt" />
                  </Link>
                  <i
                    id={event.id}
                    className="fa fa-trash trash float-right"
                    onClick={this.props.onDelete}
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
    return (
      <div className="wc">
        {legend}
        {this.props.counter > 0 ? (
          <div className="page-icon bounce">
            <i
              className="fa fa-chevron-up icon"
              id="previous"
              onClick={this.props.nextEvents}
            />
          </div>
        ) : (
          ''
        )}
        <div className="row">{content}</div>
        {events.length > 8 ? (
          <div className="page-icon bounce">
            <i
              className="fa fa-chevron-down icon"
              id="next"
              onClick={this.props.nextEvents}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
