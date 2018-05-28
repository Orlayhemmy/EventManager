import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import Content from './CenterDetails/CenterDetailsContent';
import Footer from './Footer';
import { logout } from '../actions/userActions';

/**
 * @description ViewCenterDetails component
 */
export class ViewCenterDetails extends React.Component {
  /**
   * @memberof ViewCenterDetails
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof ViewCenterDetails
   * @method render
   * @description it renders the component
   * @returns the HTML of ViewCenterDetails
   */
  render() {
     //Check if user is logged in and is also an Admin
     if (!this.props.auth.isAuth) {
      return (<Redirect to="/" />);
    } else if (!this.props.auth.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    }
    if (this.props.center.status === 401) {
      this.logout();
    }

    
    const { pathname } = this.props.location
    return (
      <div className="page-wrapper">
        <Navbar />
        <Content path={pathname}/>
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
ViewCenterDetails.propTypes = propTypes;

export default connect(mapStateToProps, {
  logout
})(ViewCenterDetails);
