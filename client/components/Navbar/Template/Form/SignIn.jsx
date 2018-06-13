import React from 'react';

export default class SignIn extends React.Component {
  render() {
    const {
      signinError,
      signinSubmit,
      loginEmail,
      loginPassword,
      errorEmail,
      errorPass,
      onChange,
      auth,
      password
    } = this.props.navbarProps;
    return (
      <form class="px-4 py-3" onSubmit={signinSubmit}>
        <div className="form-group">
          <span className="help-block">
            {errorEmail || auth.signinError}
          </span>
          <label for="email">Email Address</label>
          <input
            id="loginEmail"
            value={loginEmail}
            placeholder="Email Address"
            type="email"
            className="form-control"
            error={errorEmail}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <span className="help-block">{password}</span>
          <label for="email">Password</label>
          <input
            id="loginPassword"
            value={loginPassword}
            placeholder="123456789"
            type="password"
            className="form-control"
            error={errorPass}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    )
  }
} 