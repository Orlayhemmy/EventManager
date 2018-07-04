import React from 'react';
import AdminContent from '../Template/Content/AdminContent';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
/**
 * @memberof AdminDashMethod
 * @method render
 */
const AdminDashMethod = (location) => {
  const { pathname } = location;
  return (
    <div id="center-page">
      <Navbar path={pathname} />
      <AdminContent path={pathname} />
      <Footer />
    </div>
  );
};
export default AdminDashMethod;
