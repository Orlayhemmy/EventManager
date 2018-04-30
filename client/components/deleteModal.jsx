import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteCenterEvent,
  deleteEvent,
  clearEventState
} from '../actions/eventActions';
import { deleteCenter } from '../actions/centerActions';
import { getUserEmail } from '../actions/signInActions';

/**
 * @description DeleteModal component
 */
export class DeleteModal extends React.Component {
  /**
   * @memberof DeleteModal
   * @description it creates an instance of DeleteModal
   */
  constructor() {
    super();
    this.state = {
      reason: '',
      suggestion: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @memberof DeleteModal
   * @method onAttend
   * @description it calls the needed actions
   * @param {object} event
   */
  onAttend(e) {
    if (this.props.path === '/dashboard') {
      this.props.deleteEvent(this.props.event.eventId);
    } else if (this.props.path === '/admin-centers') {
      this.props.deleteCenter(this.props.center.centerId);
    } else {
      const { event } = this.props.event;
      const data = {
        eventTitle: event.eventTitle,
        centerId: event.centerId,
        id: event.id,
        text: 'deleted',
        userId: event.userId,
        reason: this.state.reason,
        suggestion: this.state.suggestion
      };
      this.props.getUserEmail(event.userId);
      this.props.deleteCenterEvent(data);
    }
  }
  /**
   * @memberof DeleteModal
   * @method onCancel
   * @description it hides modal
   * @param {void}
   */
  onCancel() {
    $(document).ready(function() {
      $('#deleteModal').modal('hide');
    });
  }
  /**
   * @memberof DeleteModal
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  /**
   * @memberof DeleteModal
   * @method render
   * @description it renders the component
   * @returns the HTML of DeleteModal
   */
  render() {
    let content;
    let title;
    if (this.props.path === '/dashboard') {
      title = this.props.event.eventName;
    } else {
      title = this.props.center.centerName;
    }
    if (this.props.path === '/view-center-event') {
      content = (
        <div className="form-inner">
          <span className="help-block">
            Are sure you want to delete event{' '}
            {this.props.event.event.eventTitle}?
          </span>
          <br />
          <br />
          <div class="form-group">
            <textarea
              class="form-control"
              id="reason"
              onChange={this.onChange}
              placeholder="Give reasons for disapproving this event"
              value={this.state.reason}
            />
          </div>
          <div class="form-group">
            <textarea
              class="form-control"
              id="suggestion"
              onChange={this.onChange}
              placeholder="Suggestions"
              value={this.state.suggestion}
            />
          </div>
          <i
            className="fa fa-trash red"
            id="disapprove"
            onClick={this.onAttend.bind(this)}
          />
          <i className="fa fa-save green" onClick={this.onCancel.bind(this)} />
          <br />
          <span>
            <br />Yes
          </span>
          <span>
            <br />No
          </span>
        </div>
      );
    } else {
      content = (
        <div className="form-inner">
          <span className="help-block">
            Are sure you want to delete {title}?
          </span>
          <br />
          <i
            className="fa fa-trash red"
            id="disapprove"
            onClick={this.onAttend.bind(this)}
          />
          <i className="fa fa-save green" onClick={this.onCancel.bind(this)} />
          <br />
          <span>
            <br />Yes
          </span>
          <span>
            <br />No
          </span>
        </div>
      );
    }
    return (
      <div className="modal hide" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="form-inner text-center">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}
const propTypes = {
  deleteCenterEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  clearEventState: PropTypes.func.isRequired,
  deleteCenter: PropTypes.func.isRequired,
  getUserEmail: PropTypes.func.isRequired,
  center: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  center: state.center,
  event: state.event,
  auth: state.auth
});
DeleteModal.propTypes = propTypes;

export default connect(mapStateToProps, {
  deleteCenterEvent,
  deleteEvent,
  clearEventState,
  getUserEmail,
  deleteCenter
})(DeleteModal);
