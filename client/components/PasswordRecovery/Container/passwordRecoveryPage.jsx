import React from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  confirmEmail,
  updatePassword,
  sendMail,
  confirmCode,
  clearUserState
} from '../../../actions/userActions';
import {
  recoverPassword,
  updateUserValidation
} from '../../../shared/userValidation';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
import Form from '../Template/Form/recoveryForm';

/**
 * @description PasswordRecovery component
 */
export class PasswordRecovery extends React.Component {
  state = {
    email: '',
    errors: '',
    code: '',
    newPassword: '',
    retypePass: '',
    wrongCode: ''
  };

  /**
   * @memberof PasswordRecoveryForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  /**
   * @memberof PasswordRecoveryForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid = id => {
    if (id === 'insertEmail') {
      const { errors, isValid } = recoverPassword(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    } else if (id === 'newPassword') {
      const { errors, isValid } = updateUserValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    }
  };
  /**
   * @memberof PasswordRecoveryForm
   * @method onSubmit
   * @description it calls an action
   * @param {object} event
   * @returns {void}
   */
  onSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === 'insertEmail') {
      if (this.isValid(e.target.id)) {
        this.props.confirmEmail(this.state);
      }
    }
    if (e.target.id === 'verifyEmail') {
      this.props.sendMail(this.state.email);
    } else if (e.target.id === 'verifyShortCode') {
      if (this.state.code !== this.props.auth.shortCode) {
        return this.props.confirmCode('wrong code');
      }
      this.props.confirmCode();
      this.showDiv('verifyCode', 'newPassword');
    } else if (e.target.id === 'newPassword') {
      if (this.isValid(e.target.id)) {
        this.props.updatePassword(this.state);
      }
    }
  };
  /**
   * @memberof PasswordRecoveryForm
   * @method showDiv
   * @description it toggle divs display
   * @param {*} id1
   * @param {*} id2
   * @returns {void}
   */
  showDiv = (id1, id2) => {
    document.getElementById(id1).hidden = true;
    document.getElementById(id2).hidden = false;
  };
  /**
   * @memberof PasswordRecoveryForm
   * @method componentDidUpdate
   * @description it calls a script
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.auth.status === 200) {
      this.showDiv('insertEmail', 'verifyEmail');
      document.getElementById('emailVerify').disabled = true;
    }
    if (this.props.auth.status === 201) {
      this.showDiv('verifyEmail', 'verifyCode');
      this.countDown();
    }
  }
  /**
   * @memberof PasswordRecoveryForm
   * @method countDown
   * @description it counts down available time to short code
   * @returns {void}
   */
  countDown = () => {
    this.state.timeout = setTimeout(() => {
      let div = document.getElementById('verifyCode');
      if (!div.hidden) {
        this.showDiv('verifyCode', 'verifyEmail');
        document.getElementById('code').disabled = true;
      }
    }, 20000);
  };
  /**
   * @memberof PasswordRecoveryForm
   * @method countDown
   * @description it swaps div
   * @returns {void}
   */
  swap = () => {
    this.showDiv('verifyEmail', 'insertEmail');
  };
  componentWillUnmount() {
    this.props.clearUserState();
  }
  /**
   * @memberof PasswordRecovery
   * @method render
   * @description it renders the component
   * @returns the HTML of PasswordRecovery
   */
  render() {
    if (this.props.auth.message === 'Changes Applied Successfully') {
      swal({
        title: '<h1>Password Changed</h1>',
        html: '<i class="fa fa-check-circle largeIcon" />'
      });
      return <Redirect to="/" />;
    }
    return (
      <div id="recover-password">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-outer text-center">
                <div className="form-inner">
                  <Form
                    state={this.state}
                    swap={this.swap}
                    countDown={this.countDown}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    showDiv={this.showDiv}
                    isValid={this.isValid}
                    message={this.props.auth.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  clearUserState: PropTypes.func.isRequired,
  confirmCode: PropTypes.func.isRequired,
  updateUserValidation: PropTypes.func.isRequired,
  confirmEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
PasswordRecovery.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    clearUserState,
    confirmCode,
    confirmEmail,
    updatePassword,
    sendMail,
    updateUserValidation
  }
)(PasswordRecovery);
