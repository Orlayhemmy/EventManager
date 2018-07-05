import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Navbar from '../../Navbar/Container/navbar';
import Content from '../Template/Content/centerDetailsContent';
import Footer from '../../Footer/footer';
import { logout } from '../../../actions/userActions';

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
    const {
      center: { status }
    } = this.props;
    //Check if user is logged in and is also an Admin
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    } else if (!this.props.auth.user.isAdmin) {
      return <Redirect to="/dashboard" />;
    }
    if (status === (401 || 498)) {
      this.logout();
    } else if (status === 202) {
      swal('Center updated successfully');
    }
    const { pathname } = this.props.location;
    return (
      <div className="page-wrapper">
        <Navbar path={pathname} />
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
ViewCenterDetails.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    logout
  }
)(ViewCenterDetails);
