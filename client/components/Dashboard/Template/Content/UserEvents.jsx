import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
/**
 * @description AdminPanelPage  component
 */
export default class Content extends React.Component {
  render() {
    const { events } = this.props.userEvent;
    let eventId, content, legend;
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
            Delete Booking: <i className="fa fa-trash trash" />
          </span>
          <span className="legend">
            Awaiting Response: <i className="fa fa-spinner main-color" />
          </span>
        </div>
      );
      const eventsArray = this.props.userEvent.events;
      content = _.map(eventsArray, (bookedEvent, index) => {
        const { bookedDate, isApproved } = bookedEvent;
        const { imageUrl } = bookedEvent.Center;
        let eStatus;
        if (isApproved) {
          eStatus = <i className="fa fa-thumbs-up green float-left" />;
        } else {
          eStatus = <i className="fa fa-spinner main-color float-left" />;
        }
        eventId = `eventDetails${index}`;
        const eventDate = `Date: ${bookedDate}`;
        return (
          <div key={index}>
            <div className="tooltips center" key={index} id="booked-events">
              <div key={eventId} className="text-center">
                <div className="card p-1 mb-3 mw">
                  <div id={index} className="grid-view">
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
                  <span id={bookedEvent.eventTitle}>
                    {eStatus}
                    <i
                      id={bookedEvent.id}
                      className="fa fa-trash trash float-right"
                      onClick={this.props.onSelect}
                      data-toggle="modal"
                      data-target="#deleteModal"
                    />
                  </span>
                </div>
              </div>
              <p class="tooltiptext">{eventDate}</p>
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
        {events !== undefined && events.length > 8 ? (
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
const propTypes = {
  counter: PropTypes.number.isRequired,
  nextEvents: PropTypes.func.isRequired,
};
Content.propTypes = propTypes;
