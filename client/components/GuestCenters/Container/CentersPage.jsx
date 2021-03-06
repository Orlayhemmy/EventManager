import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from '../../Navbar/Container/Navbar';
import Footer from '../../Footer/Footer';
import GuestCenter from '../Template/Content/Centers';

/**
 * @description CenterPage component
 */
export class CenterPage extends React.Component {
  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    const { pathname } = this.props.location;
    return (
      <div id="center-page">
        <Navbar path={pathname} />
        <GuestCenter path={pathname} />
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

CenterPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {}
)(CenterPage);
