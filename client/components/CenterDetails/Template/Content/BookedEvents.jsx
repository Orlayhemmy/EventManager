import React from 'react';

/**
 * @description ViewCenterDetails component
 */
export default class EventsList extends React.Component {
  render() {
    const { onClick } = this.props;
    const bookedEvents = this.props.eventState.map(event => {
      const {
        isApproved, bookedDate, id, eventTitle
      } = event;
      let eStatus;
      if (isApproved) {
        eStatus = <i id={id} className="fa fa-thumbs-up green" />;
      } else {
        eStatus = (
          <span
            onClick={onClick}
            data-toggle="modal"
            data-target="#deleteModal"
            id="approve"
          >
            <i id={id} className="fa fa-spinner main-color" />
          </span>
        );
      }
      return (
        <tr id={id} key={id}>
          <td>
            <span
              id={event.id}
              onClick={onClick}
              data-toggle="modal"
              data-target="#deleteModal"
            >
              {eventTitle}
            </span>
          </td>
          <td>{bookedDate.join(', ')}</td>
          <td>{eStatus}</td>
          <td>
            <span
              onClick={onClick}
              data-toggle="modal"
              data-target="#deleteModal"
              id="trash"
            >
              <i id={event.id} className="fa fa-trash trash" />
            </span>
          </td>
        </tr>
      );
    });
    return (
      <div id="event-list" className="col-lg-5">
        <div className="form-outer text-center d-flex align-items-center">
          <div className="form-inner">
            <strong className="logo text-primary">events scheduled</strong>
            <div>
              <table
                cellPadding="0"
                className="table table-responsive table-hover text-center"
              >
                <thead>
                  <tr>
                    <th>title</th>
                    <th>date</th>
                    <th>status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {bookedEvents}
                  <tr>
                    <td>
                      <i className="fa fa-spinner main-color" />
                      <br />
                      <span>Pending</span>
                    </td>
                    <td />
                    <td />
                    <td>
                      <i className="fa fa-thumbs-up green" />
                      <br />
                      <span>Approved</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
