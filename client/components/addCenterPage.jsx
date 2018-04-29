import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import { logout } from '../actions/signInActions';
// import { addCenter } from '../actions/centerActions';
// import addCenterValidation from '../shared/centerValidations';
import CenterForm from './addCenterForm';
import TextField from '../common/textField';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import UploadImage from './imageUpload';

@connect((store) => {
  return {
    user: store.auth,
    center: store.center,
  }
})

export default class AddCenterPage extends React.Component {
  
  render() {
     //Check if user is logged in and is also an Admin
     if (!this.props.user.isAuth) {
      return (<Redirect to="/" />);
    } else if (!this.props.user.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    }
    let content;
    const {
      center,
      status,
      message
    } = this.props.center;
    const { pathname } = this.props.location

    if (status === 201) {
      return (<Redirect to="/admin-centers" />);
    }
    return (
      
      <div id="add-center">
        <Navbar />
        <div class="container">
          <div class="row">
            <div className="col-lg-6">
              <div class="form-outer text-center">
                <div class="form-inner">
                  <span class="logo"><strong class="text-primary">add a new center</strong></span>
                  <hr/>
                  <CenterForm path={pathname}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


