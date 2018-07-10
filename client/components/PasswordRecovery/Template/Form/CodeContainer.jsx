import React from 'react';
import TextField from '../../../../common/textField3';

export default class CodeContent extends React.Component {
  render() {
    const {
      heading,
      formState: { code },
      onChange,
      onSubmit,
      message
    } = this.props;
    return (
      <div>
        <div id="resendCode" hidden>
          <form id="resendCode" onSubmit={onSubmit}>
            {heading}
            <span className="help-block" />
            <p>Code has expired. Click the button below to get another </p>
            <TextField
              id="code"
              value="------"
              placeholder="------"
              type="text"
              onChange={onChange}
            />
            <input
              type="submit"
              id="resendCode"
              value="Resend Code"
              className="btn btn-primary"
            />
          </form>
        </div>
        <div id="verifyCode" hidden>
          <form id="verifyCode">
            {heading}
            <p>Please type the code you received below </p>
            <TextField
              id="code"
              value={code}
              placeholder="---------"
              type="text"
              onChange={onChange}
              error={message}
            />
            <input
              type="submit"
              id="verifyShortCode"
              value="Submit"
              className="btn btn-primary"
              onClick={onSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}
