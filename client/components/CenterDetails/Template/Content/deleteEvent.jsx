import React from 'react';

/**
 * @description Delete component
 */
export default class DeleteContent extends React.Component {
  render() {
    const {
      onApprove,
      onChange,
      state: { reason, suggestion }
    } = this.props;
    return (
      <div className="form-inner">
        <span className="help-block">Are sure you want to delete event?</span>
        <br />
        <br />
        <div class="form-group">
          <textarea
            class="form-control"
            id="reason"
            onChange={onChange}
            placeholder="Give reasons for disapproving this event"
            value={reason}
          />
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            id="suggestion"
            onChange={onChange}
            placeholder="Suggestions"
            value={suggestion}
          />
        </div>
        <i className="fa fa-trash red" id="disapprove" onClick={onApprove} />
        <i className="fa fa-save green" />
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
}
