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
