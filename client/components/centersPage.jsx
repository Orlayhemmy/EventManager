import React from 'react';
import { connect } from 'react-redux';
import Centers from './GetCenters';
import Search from './centerSearch';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

/**
 * @description CenterPage component
 */
export default class CenterPage extends React.Component {
  /**
   * @memberof CenterPage
   * @description it creates an instance of CenterPage
   */
  render() {
    return (
      <div id="center-page">
        <Navbar />
        <div className="container">
          <Search />
          <Centers />
        </div>
        <Footer />
      </div>
    );
  }
}
