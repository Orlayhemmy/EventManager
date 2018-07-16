import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Content from './eventPage';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import { logout } from '../../actions/userActions';

/**
 * @description AddEventPage component
 */
export class AddEventPage extends React.Component {
  /**
   * @memberof AddEventPage
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof AddEventPage
   * @method render
   * @description it renders the component
   * @returns the HTML of AddEventPage
   */
  render() {
    //Check if user is logged in
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.props.center.status === 401) {
      this.logout();
    }
    const { pathname } = this.props.location;

    return (
      <div>
        <Navbar />
        <Content path={pathname} />
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  center: state.center
});
AddEventPage.propTypes = propTypes;

export default connect(mapStateToProps, { logout })(AddEventPage);
