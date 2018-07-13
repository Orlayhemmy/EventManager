import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import CenterForm from '../Template/Form/AddCenterForm';
import Navbar from '../../Navbar/Container/Navbar';
import Footer from '../../Footer/Footer';

/**
 * @description AddCenterPage component
 */
export class AddCenterPage extends React.Component {
  render() {
    const {
      user: { isAdmin },
      isAuth
    } = this.props.userState;

    if (!isAuth) {
      return <Redirect to="/" />;
      // this.props.history.push('/');
    }
    if (isAuth && !isAdmin) {
      return <Redirect to="/dashboard" />;
      // this.props.history.push('/dashboard');
    }
    const { status } = this.props.center;
    const { pathname } = this.props.location;

    if (status === 201) {
      toastr.success('success');
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
