import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Content from './EventPage';
import Navbar from './navbar.jsx';
import Footer from './Footer.jsx';
import { logout } from '../actions/userActions';

/**
 * @description ModifyEventPage component
 */
export class ModifyEventPage extends React.Component {
  /**
   * @memberof ModifyEventPage
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof ModifyEventPage
   * @method render
   * @description it renders the component
   * @returns the HTML of ModifyEventPage
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
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  center: state.center
});
ModifyEventPage.propTypes = propTypes;

export default connect(mapStateToProps, {
  logout
})(ModifyEventPage);
