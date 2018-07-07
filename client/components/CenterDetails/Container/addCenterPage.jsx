import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import CenterForm from '../Template/Form/addCenterForm';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';

/**
 * @description AddCenterPage component
 */
export class AddCenterPage extends React.Component {
  render() {
    const { user: { isAdmin }, isAuth } = this.props.userState;
    // Check if user is logged in and is also an Admin
    if (!isAuth) {
      return <Redirect to="/" />;
    } else if (!isAdmin) {
      return <Redirect to="/dashboard" />;
    }
    const { status, message } = this.props.center;
    const { pathname } = this.props.location;

    if (status === 201) {
      swal(message);
      return <Redirect to="/admin-centers" />;
    }
    return (
      <div id="add-center">
        <Navbar path={pathname} />
        <div class="container">
          <div class="row">
            <div className="col-lg-6">
              <div class="form-outer text-center">
                <div class="form-inner">
                  <span class="logo">
                    <strong class="text-primary">add a new center</strong>
                  </span>
                  <hr />
                  <CenterForm path={pathname} />
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
  userState: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  userState: state.auth,
  center: state.center
});
AddCenterPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {}
)(AddCenterPage);
