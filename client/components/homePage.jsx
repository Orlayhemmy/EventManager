import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Content from './HomePage/HomeContent';
import Footer from './Footer';

/**
 * @description Homepage component
 */
export class Homepage extends React.Component {
  /**
   * @memberof Homepage
   * @description it creates an instance of Homepage
   */
  render() {

    if (this.props.auth.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    const { pathname } = this.props.location;
    return (
      <div id="homepage">
        <Navbar path={pathname}/>
        <Content />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Homepage);
