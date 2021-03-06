import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import Navbar from '../../Navbar/Container/Navbar';
import Footer from '../../Footer/Footer';
import {
  checkPassword,
  getUser,
  updateUserDetails,
  logout
} from '../../../actions/userActions';
import { eventBooked } from '../../../actions/eventActions';
import Content from '../Template/Content/Profile';

/**
 * @description Profile component
 */
export class Profile extends React.Component {
  /**
   * @memberof Profile
   * @method componentDidMount
   * @description it calls an action
   * @returns {void}
   */
  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.eventBooked(id);
    this.props.getUser();
  }

  /**
   * @memberof Profile
   * @method componentDidUpdate
   * @description it checks some conditions when component updates
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.auth.message === 'Password Match') {
      const div = document.getElementById('newPasswordDiv');
      const div2 = document.getElementById('passwordUpdate');
      const div3 = document.getElementById('submitButton');
      div.hidden = false;
      div2.hidden = true;
      div3.hidden = false;
    }
    if (this.props.auth.status === 202) {
      toastr.success('Update Successful');
      document.getElementById('newPasswordDiv').hidden = true;
      document.getElementById('editDetails').hidden = true;
      document.getElementById('showDetails').hidden = false;
    }
  }

  /**
   * @memberof Profile
   * @method showDiv
   * @description it toggles div display
   * @param {object} e
   */
  showDiv = (e) => {
    e.preventDefault();
    let div = document.getElementById('editDetails');
    let div2 = document.getElementById('showDetails');
    if (e.target.id === 'show-form') {
      div.hidden = false;
      div2.hidden = true;
    } else if (e.target.id === 'hide-form') {
      div.hidden = true;
      div2.hidden = false;
    } else {
      div = document.getElementById('passwordUpdate');
      div2 = document.getElementById('submitButton');
      const span = document.getElementById('changePassword');
      div.hidden = !div.hidden;
      div2.hidden = !div2.hidden;
      span.hidden = !span.hidden;
    }
  };

  /**
   * @memberof Profile
   * @method logout
   * @description it calls a logout action
   * @returns {void}
   */
  logout = () => {
    this.props.logout();
  };
  /**
   * @memberof Profile
   * @method render
   * @description it renders the component
   * @returns the HTML of Profile
   */
  render() {
    const {
      userEvent: { status },
      location: { pathname }
    } = this.props;
    if (status === 403 || status === 498) {
      return <Redirect to="/" />;
    }

    return (
      <div id="profile-page">
        <Navbar path={pathname} />
        <Content
          checkPassword={this.checkPassword}
          onSubmit={this.onSubmit}
          showDiv={this.showDiv}
          passwordError={this.props.auth.message}
          updateUserDetails={this.props.updateUserDetails}
          updateUserValidation={this.props.updateUserValidation}
        />
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  updateUserDetails: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  eventBooked: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  userEvent: state.event
});
Profile.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    updateUserDetails,
    checkPassword,
    getUser,
    eventBooked,
    logout
  }
)(Profile);
