import React from 'react';

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
