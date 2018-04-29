import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CenterForm from './addCenterForm';
import TextField from '../common/textField';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import UploadImage from './imageUpload';

/**
 * @description AddCenterPage component
 */
export class AddCenterPage extends React.Component {
  /**
   * @memberof AddCenterPage
   * @method render
   * @description it renders the component
   * @returns the HTML of AddCenterPage
   */
  render() {
    //Check if user is logged in and is also an Admin
    if (!this.props.user.isAuth) {
      return <Redirect to="/" />;
    } else if (!this.props.user.user.isAdmin) {
      return <Redirect to="/dashboard" />;
    }
    let content;
    const { center, status, message } = this.props.center;
    const { pathname } = this.props.location;

    if (status === 201) {
      return <Redirect to="/admin-centers" />;
    }
    return (
      <div id="add-center">
        <Navbar />
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
  user: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user,
  center: state.center
});
AddCenterPage.propTypes = propTypes;

export default connect(mapStateToProps, {})(AddCenterPage);
