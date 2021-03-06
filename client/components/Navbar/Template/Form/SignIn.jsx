import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description SignIn component
 */
export default class SignIn extends React.Component {
  render() {
    const {
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
        <span className="help-block">{errorEmail || auth.signinError}</span>
        <div className="form-group">
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
        <button id="signin-submit" type="submit" class="btn btn-primary mb-3">
          Sign in
        </button>
        <br />
        <span>
          <Link to="/recover-password">Forgot Password? Click Here</Link>
        </span>
      </form>
    );
  }
}
