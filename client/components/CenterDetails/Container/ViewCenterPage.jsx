import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Navbar from '../../Navbar/Container/Navbar';
import Content from '../Template/Content/centerDetailsContent';
import Footer from '../../Footer/Footer';
import { logout } from '../../../actions/userActions';

/**
 * @description ViewCenterDetails component
 */
export class ViewCenterDetails extends React.Component {
  /**
   * @memberof ViewCenterDetails
   * @method render
   * @description it renders the component
   * @returns the HTML of ViewCenterDetails
   */
  render() {
    const {
      center: { status },
      auth: {
        isAuth,
        user: {
          isAdmin
        }
      },
      location: {
        pathname
      }
    } = this.props;

    if (!isAuth) {
      return <Redirect to="/" />;
    } else if (!isAdmin) {
      return <Redirect to="/dashboard" />;
    }
    if (status === 401 || status === 498) {
      this.props.logout();
    } else if (status === 202) {
      swal('Center updated successfully');
    }
    return (
      <div className="page-wrapper" id="view-center-wrapper">
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
