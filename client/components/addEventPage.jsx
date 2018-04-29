import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Content from './EventPage';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { logout } from '../actions/signInActions';

@connect((store) => {
  return {
    auth: store.auth,
    center: store.center,
  }
})

export default class AddEventPage extends React.Component {

  logout(e) {
    this.props.dispatch(logout());
  }
  render() {
     //Check if user is logged in
     if (!this.props.auth.isAuth) {
      return (<Redirect to="/" />);
    }
    if (this.props.center.status === 401) {
      this.logout();
    }
    const { pathname } = this.props.location;
    
    return (
      <div>
        <Navbar />
        <Content path={pathname} />
        <Footer />
      </div>
    )
  }
}

