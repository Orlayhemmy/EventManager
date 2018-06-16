import React from 'react';

export default class ModalContent extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="modal hide" id="event">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="form-inner text-center">
              <div className="form-inner">
                <span className="media-heading main-color">{message}</span>   
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
