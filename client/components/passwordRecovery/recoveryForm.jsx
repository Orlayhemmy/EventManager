import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  confirmEmail,
  generateCode,
  updateUserDetails,
  wrongCode,
  sendMail
} from '../../actions/userActions';
import { recoverPassword, updateUser } from '../../shared/userValidation';
import TextField from '../../common/textField3';

/**
 * @description PasswordRecoveryForm component
 */
export class PasswordRecoveryForm extends React.Component {
  /**
   * @memberof PasswordRecoveryForm
   * @description it creates an instance of AddEventForm
   */
  constructor() {
    super();
    this.state = {
      email: '',
      error: '',
      code: '',
      password: '',
      retypePass: '',
      wrongCode: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.swap = this.swap.bind(this);
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid(id) {
    if (id === 'insertEmail') {
      const { error, isValid } = recoverPassword(this.state);
      if (!isValid) {
        this.setState({ error });
      }
      return isValid;
    } else if (id === 'newPassword') {
      const { error, isValid } = updateUser(this.state);
      if (!isValid) {
        this.setState({ error });
      }
      return isValid;
    }
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method onSubmit
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    if (e.target.id === 'insertEmail') {
      if (this.isValid(e.target.id)) {
        this.props.confirmEmail(this.state);
      }
    }
    if (e.target.id === 'verifyEmail') {
      let title = 'Password Reset Code';
      let message = `Note: code expires in 5 minutes <br/> code: <b> ${
        this.props.auth.code
      } </b>`;
      this.props.sendMail(title, message, this.state.email);
    } else if (e.target.id === 'verifyCode') {
      if (this.state.code !== this.props.auth.code) {
        return this.props.wrongCode();
      }
      this.showDiv('verifyCode', 'newPassword');
    } else if (e.target.id === 'resendCode') {
      this.props.generateCode();
    } else if (e.target.id === 'newPassword') {
      if (this.isValid(e.target.id)) {
        this.props.updateUserDetails(this.state);
      }
    }
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method showDiv
   * @description it toggle divs display
   * @param {*} id1
   * @param {*} id2
   * @returns {void}
   */
  showDiv(id1, id2) {
    document.getElementById(id1).hidden = true;
    document.getElementById(id2).hidden = false;
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method componentDidUpdate
   * @description it calls a script
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.auth.status === 200) {
      this.showDiv('insertEmail', 'verifyEmail');
      this.props.generateCode();
      document.getElementById('emailVerify').disabled = true;
    }
    if (this.props.auth.status === 201) {
      this.showDiv('verifyEmail', 'verifyCode');
    }
    if (this.props.auth.status === 500) {
      this.showDiv('verifyEmail', 'resendCode');
    }
    if (this.props.auth.codeStatus === '') {
      this.showDiv('resendCode', 'verifyCode');
      this.countDown();
    }
    if (this.props.auth.message === 'Changes Applied Successfully') {
      this.showDiv('newPassword', 'passChanged');
    }
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method countDown
   * @description it counts down available time to short code
   * @returns {void}
   */
  countDown() {
    setTimeout(() => {
      let div = document.getElementById('verifyCode');
      if (!div.hidden) {
        this.showDiv('verifyCode', 'resendCode');
        document.getElementById('code').disabled = true;
      }
    }, 20000);
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method countDown
   * @description it swaps div
   * @returns {void}
   */
  swap() {
    this.showDiv('verifyEmail', 'insertEmail');
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method render
   * @description it renders the component
   * @returns the HTML of PasswordRecoveryForm
   */
  render() {
    let form;

    const { email, error, code, password, retypePass, wrongCode } = this.state;

    const heading = (
      <span>
        <strong class="text-primary">
          lets help you get back into your account
        </strong>
      </span>
    );
    return (
      <div>
        <div id="passChanged" hidden>
          <h1>Password Changed</h1>
          <i className="fa fa-check-circle largeIcon" />
        </div>
        <div id="newPassword" hidden>
          <form id="newPassword" onSubmit={this.onSubmit}>
            <span>
              <strong class="text-primary">New Password</strong>
            </span>
            <br />
            <span className="help-block">{this.props.auth.message}</span>
            <TextField
              id="password"
              value={this.state.password}
              placeholder="Password"
              type="text"
              onChange={this.onChange}
              error={error.password}
            />
            <TextField
              id="retypePass"
              value={this.state.retypePass}
              placeholder="Type password again"
              type="text"
              onChange={this.onChange}
              error={error.retypePass}
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary basic"
            />
          </form>
        </div>
        <div id="resendCode" hidden>
          <form id="resendCode" onSubmit={this.onSubmit}>
            {heading}
            <span className="help-block">{this.props.auth.codeStatus}</span>
            <p>Code has expired. Click the button below to get another </p>
            <TextField
              id="code"
              value="------"
              placeholder="------"
              type="text"
              onChange={this.onChange}
              error={error.code}
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
          <form id="verifyCode" onSubmit={this.onSubmit}>
            {heading}
            <span className="help-block">
              {(this.props.auth.codeStatus, this.props.auth.codeMessage)}
            </span>

            <p>Please type the code you received below </p>
            <TextField
              id="code"
              value={this.state.code}
              placeholder="---------"
              type="text"
              onChange={this.onChange}
              error={error.code}
            />
            <input
              type="submit"
              id="verifyCode"
              value="Submit"
              className="btn btn-primary"
            />
          </form>
        </div>
        <div id="verifyEmail" hidden>
          <form id="verifyEmail" onSubmit={this.onSubmit}>
            {heading}
            <p>A code will be sent to the mail you have provided </p>
            <span className="help-block">{this.props.auth.message}</span>
            <TextField
              id="emailVerify"
              value={this.state.email}
              placeholder="Email address"
              type="email"
              onChange={this.onChange}
              error={error.email}
            />
            <input type="submit" value="Submit" className="btn btn-primary" />
            <br />
            <a href="#">
              <p onClick={this.swap}>back</p>
            </a>
          </form>
        </div>
        <div id="insertEmail">
          <form id="insertEmail" onSubmit={this.onSubmit}>
            {heading}
            <p>Provide us with the email address used upon registration</p>
            <span className="help-block">{this.props.auth.message}</span>
            <TextField
              id="email"
              value={this.state.email}
              placeholder="Email address"
              type="email"
              onChange={this.onChange}
              error={error.email}
            />
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}
const propTypes = {
  confirmEmail: PropTypes.func.isRequired,
  generateCode: PropTypes.func.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  wrongCode: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
PasswordRecoveryForm.propTypes = propTypes;

export default connect(mapStateToProps, {
  generateCode,
  confirmEmail,
  updateUserDetails,
  sendMail,
  wrongCode
})(PasswordRecoveryForm);
