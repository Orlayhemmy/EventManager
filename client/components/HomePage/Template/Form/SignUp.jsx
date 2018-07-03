import React from 'react';

export default class Signup extends React.Component {
  render() {
    const {
      fullname,
      errorName,
      email,
      errorEmail,
      password,
      errorRetypePass,
      errorPassword,
      retypePass,
      signupSubmit,
      onChange,
      message
    } = this.props.homeProps;
    return (
      <form id="signup-form" onSubmit={signupSubmit}>
        <span className="help-block">{errorName}</span>
        <div className="form-group">
          <label for="fullname">Fullname</label>
          <input
            id="fullname"
            value={fullname}
            placeholder="Fullname"
            type="text"
            className="form-control"
            onChange={onChange}
            required
          />
        </div>

        <span className="help-block">{errorEmail}</span>
        <div className="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            value={email}
            placeholder="Email Address"
            type="email"
            className="form-control"
            onChange={onChange}
            required
          />
        </div>
        <span className="help-block">{errorPassword || errorRetypePass}</span>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="password">Password</label>
            <input
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              className="form-control"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label for="retypePass">Retype-Password</label>
            <input
              id="retypePass"
              value={retypePass}
              placeholder="Re-type Password"
              type="password"
              className="form-control"
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="center">
          <input
            id="signup"
            type="submit"
            value="Join Us"
            className="btn btn-primary mb-2"
          />
        </div>
      </form>
    );
  }
}
