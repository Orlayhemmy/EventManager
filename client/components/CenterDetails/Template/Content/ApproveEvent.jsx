import React from 'react'; //eslint-disable-line
import PropTypes from 'prop-types';

const ApproveEvent = (props) => {
  const {
    onApprove,
    onChange,
    showHiddenDiv,
    state: { comment }
  } = props;
  return (
    <div id="approve-event">
      <span>
        Are you sure you want to approve this event?
      </span>
      <div>
        <i id="approve" className="fa fa-thumbs-up green" onClick={onApprove} />
        <i
          data-toggle-id="disapprove"
          className="fa fa-thumbs-down trash"
          onClick={showHiddenDiv}
        />
        <br />
        <span>
          <br />
          Approve
        </span>
        <span>
          <br />
          Disapprove
        </span>
      </div>
      <div id="disapprove" hidden>
        <p>
          {' '}
          Disapproved event will be deleted. Are you sure you want to disapprove
          event?
        </p>
        <div className="form-group">
          <textarea
            className="form-control"
            id="comment"
            onChange={onChange}
            placeholder="Give reasons for disapproving this event"
            value={comment}
          />
        </div>
        <i id="disapprove" className="fa fa-trash trash" onClick={onApprove} />
        <i
          data-toggle-id="disapprove"
          className="fa fa-close"
          onClick={showHiddenDiv}
        />
        <br />
        <span>
          <br />
          delete
        </span>
        <span>
          <br />
          cancel
        </span>
      </div>
    </div>
  );
};
ApproveEvent.propTypes = {
  onApprove: PropTypes.func.isRequired,
  showHiddenDiv: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};
export default ApproveEvent;
