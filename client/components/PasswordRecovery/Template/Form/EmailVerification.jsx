import React from 'react';
import TextField from '../../../../common/textField3';

export default class EmailVerify extends React.Component {
  render() {
    const {
      heading,
      formState: { email, errors },
      onChange,
      onSubmit,
      message,
      swap
    } = this.props;
    return (
      <div>
        <div id="verifyEmail" hidden>
          <form id="verifyEmail" onSubmit={onSubmit}>
            {heading}
            <p>A code will be sent to the mail you have provided </p>
            <span className="help-block">{message}</span>
            <TextField
              id="emailVerify"
              value={email}
              placeholder="Email address"
              type="email"
              onChange={onChange}
              errors={errors.email}
            />
            <input
              type="submit"
              value="Send Code"
              className="btn btn-primary"
            />
            <br />
            <a href="#">
              <p onClick={swap}>back</p>
            </a>
          </form>
        </div>
        <div id="insertEmail">
          <form id="insertEmail" onSubmit={onSubmit}>
            {heading}
            <p className="subtitle pb-2">
              Provide us with the email address used upon registration
            </p>
            <span className="help-block">{message}</span>
            <TextField
              id="email"
              value={email}
              placeholder="Email address"
              type="email"
              onChange={onChange}
              errors={errors.email}
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary mt-3"
            />
          </form>
        </div>
      </div>
    );
  }
}
