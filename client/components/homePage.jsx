import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Content from './HomePage/HomeContent';
import Footer from './Footer';

@connect((store) => {
  return {
    auth: store.auth,
  };
})

export default class Homepage extends React.Component {
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