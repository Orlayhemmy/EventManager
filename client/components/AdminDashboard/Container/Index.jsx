import React from 'react';
import AdminContent from '../Template/Content/AdminContent';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/Container/index';
/**
 * @memberof AdminDashMethod
 * @method render
 */
export default class AdminDashMethod extends React.Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div id="center-page">
        <Navbar />
        <AdminContent pathname={pathname}/>
        <Footer />
      </div>
    )
  }
}

