import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteCenterEvent,
  deleteEvent,
  clearEventState
} from '../../../actions/eventActions';
import { deleteCenter } from '../../../actions/centerActions';
import { getUserEmail } from '../../../actions/userActions';

/**
 * @description DeleteModal component
 */
export default class DeleteModal extends React.Component {
  /**
   * @memberof DeleteModal
   * @method render
   * @description it renders the component
   * @returns the HTML of DeleteModal
   */
  render() {
    // let content;
    // let title;
    // if (this.props.path === '/dashboard') {
    //   title = this.props.event.eventName;
    // } else if (this.props.path === '/admin-centers') {
    //   title = this.props.centerProps.centerName;
    // } else {
    //   title = this.props.centerState.centerName;
    // }
    // if (this.props.path === '/view-center-event') {
    //   content = (
    //     <div className="form-inner">
    //       <span className="help-block">
    //         Are sure you want to delete event{' '}
    //         {this.props.event.event.eventTitle}?
    //       </span>
    //       <br />
    //       <br />
    //       <div class="form-group">
    //         <textarea
    //           class="form-control"
    //           id="reason"
    //           onChange={this.onChange}
    //           placeholder="Give reasons for disapproving this event"
    //           value={this.state.reason}
    //         />
    //       </div>
    //       <div class="form-group">
    //         <textarea
    //           class="form-control"
    //           id="suggestion"
    //           onChange={this.onChange}
    //           placeholder="Suggestions"
    //           value={this.state.suggestion}
    //         />
    //       </div>
    //       <i
    //         className="fa fa-trash red"
    //         id="disapprove"
    //         onClick={this.onApprove.bind(this)}
    //       />
    //       <i className="fa fa-save green" onClick={this.onCancel.bind(this)} />
    //       <br />
    //       <span>
    //         <br />Yes
    //       </span>
    //       <span>
    //         <br />No
    //       </span>
    //     </div>
    //   );
    // } else {
    //   content = (
    //     <div className="form-inner">
    //       <span className="help-block">
    //         Are sure you want to delete {title}?
    //       </span>
    //       <br />
    //       <i
    //         className="fa fa-trash red"
    //         id="disapprove"
    //         onClick={this.onApprove.bind(this)}
    //       />
    //       <i className="fa fa-save green" onClick={this.onCancel.bind(this)} />
    //       <br />
    //       <span>
    //         <br />Yes
    //       </span>
    //       <span>
    //         <br />No
    //       </span>
    //     </div>
    //   );
    // }
    return (
      <div className="modal hide" id="deleteModal">
        <div className="modal-dialog mt-y4">
          <div className="modal-content">
            <div className="form-inner text-center">{this.props.content}</div>
          </div>
        </div>
      </div>
    );
  }
}

