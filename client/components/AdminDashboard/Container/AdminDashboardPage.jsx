import React from 'react';
import AdminContent from '../Template/Content/AdminContent';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/footer';
/**
 * @memberof AdminDashboarPage
 * @method render
 */
const AdminDashboardPage = (props) => {
  const { location: { pathname } } = props;
  return (
    <div id="center-page">
      <Navbar path={pathname} />
      <AdminContent path={pathname} />
      <Footer />
    </div>
  );
};
export default AdminDashboardPage;
