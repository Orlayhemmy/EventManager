import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
import GuestCenter from '../Template/Content/Centers';

/**
 * @description CenterPage component
 */
export class CenterPage extends React.Component {
  /**
   * @memberof CenterPage
   * @description it creates an instance of CenterPage
   */
  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div id="center-page">
        <Navbar />
        <GuestCenter path={this.props.location.pathname}/>
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(CenterPage);