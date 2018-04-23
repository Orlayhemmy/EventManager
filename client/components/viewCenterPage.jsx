import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './navbar.jsx';
import Content from './CenterDetails/CenterDetailsContent';
import Footer from './footer';
import { logout } from '../actions/signInActions';

@connect((store) => {
  return {
    user: store.auth,
    center: store.center,
  };
})

export default class ViewCenterDetails extends React.Component {
  logout(e) {
    this.props.dispatch(logout());
  }
  render() {
     //Check if user is logged in and is also an Admin
     if (!this.props.user.isAuth) {
      return (<Redirect to="/" />);
    } else if (!this.props.user.user.isAdmin) {
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