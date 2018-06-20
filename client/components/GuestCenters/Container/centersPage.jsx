import React from 'react';
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
    return (
      <div id="center-page">
        <Navbar />
        <div className="container">
          <GuestCenter pathname={pathname}/>
        </div>
        <Footer />
      </div>
    );
  }
}
