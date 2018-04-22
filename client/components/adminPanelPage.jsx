import React from 'react';
import { connect } from 'react-redux';
import Centers from './getCenters';
import Search from './centerSearch';
import Navbar from './navbar';
import Footer from './footer';

export class AdminPanelPage extends React.Component {
  
  render() {
     //Check if user is logged in and is also an Admin
     if (!this.props.user.isAuth) {
      return (<Redirect to="/" />);
    } else if (!this.props.user.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    }
    const { pathname } = this.props.location;
    
    return (
        <div id="center-page">
          <Navbar />
          <div className="container">
            <Search />
            <Centers path={pathname}/>
          </div>
          <Footer />
        </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth,
});
export default connect(mapStateToProps, {})(AdminPanelPage);
