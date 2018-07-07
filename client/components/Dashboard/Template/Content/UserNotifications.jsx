import React from 'react';

/**
 * @description Notifications  component
 */
export default class Notifications extends React.Component {
  render() {
    const recentActivity = this.props.activities.map((activity, index) => {
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
              onClick={this.props.onClick}
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
    return <div>{recentActivity}</div>;
  }
}
