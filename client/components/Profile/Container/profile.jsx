import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
import { checkPassword, getUser, updateUserDetails } from '../../../actions/userActions';
import { eventBooked } from '../../../actions/eventActions';
import { logout } from '../../../actions/userActions';
import Content from '../Template/Content/profile';


/**
 * @description Profile component
 */
export class Profile extends React.Component {
  /**
   * @memberof Profile
   * @description it creates an instance of Profile
   */
  constructor() {
    super();
    this.showDiv = this.showDiv.bind(this);
  }

  /**
   * @memberof Profile
   * @method componentWillMount
   * @description it calls an action
   * @param {void}
   * @returns {void}
   */
  componentWillMount() {
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
      swal(
        'Update Successful'
      );
      document.getElementById('newPasswordDiv').hidden = true;
      document.getElementById('editDetails').hidden = true;
      document.getElementById('showDetails').hidden = false;
    }
  }

  /**
   * @memberof Profile
   * @method showDiv
   * @description it toggles div display
   * @param {object} event
   */
  showDiv(e) {
    e.preventDefault();
    const div = document.getElementById('editDetails');
    const div2 = document.getElementById('showDetails');
    if (e.target.id === 'show-form') {
      div.hidden = false;
      div2.hidden = true;
    } else if (e.target.id === 'hide-form') {
      div.hidden = true;
      div2.hidden = false;
    } else {
      const div = document.getElementById('passwordUpdate');
      const div2 = document.getElementById('submitButton');
      const span = document.getElementById('changePassword');
      div.hidden = !div.hidden;
      div2.hidden = !div2.hidden;
      span.hidden = !span.hidden;
    }
  }

  /**
   * @memberof Profile
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof Profile
   * @method render
   * @description it renders the component
   * @returns the HTML of Profile
   */
  render() {
    if (this.props.userEvent.status === 403 || this.props.userEvent.status === 498) {
        return <Redirect to="/" />;
    }
    return (
      <div id="profile-page">
        <Navbar />
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
