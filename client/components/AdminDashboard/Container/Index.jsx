import React from 'react';
import AdminContent from '../Template/Content/AdminContent';
import Navbar from '../../Navbar/Index';
import Footer from '../../Footer/Container/Index';
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

