import React from 'react';

export default class ApproveEvent extends React.Component {
  render() {
    const {
      onApprove,
      onChange,
      showHiddenDiv,
      onClick,
      state: { comment }
    } = this.props;
    return (
      <div>
        <span>Are you sure you want to approve this event?</span>
        <div>
          <i
            id="approve"
            className="fa fa-thumbs-up green"
            onClick={onApprove}
          />
          <i
            data-toggle-id="disapprove"
            className="fa fa-thumbs-down trash"
            onClick={showHiddenDiv}
          />
          <br />
          <span>
            <br />Approve
          </span>
          <span>
            <br />Disapprove
          </span>
        </div>
        <div id="disapprove" hidden>
          <p>
            {' '}
            Disapproved event will be deleted. Are you sure you want to
            disapprove event?
          </p>
          <div class="form-group">
            <textarea
              class="form-control"
              id="comment"
              onChange={onChange}
              placeholder="Give reasons for disapproving this event"
              value={comment}
            />
          </div>
          <i
            id="disapprove"
            className="fa fa-trash trash"
            onClick={onApprove}
          />
          <i
            data-toggle-id="disapprove"
            className="fa fa-close"
            onClick={showHiddenDiv}
          />
          <br />
          <span>
            <br />delete
          </span>
          <span>
            <br />cancel
          </span>
        </div>
      </div>
    );
  }
}
