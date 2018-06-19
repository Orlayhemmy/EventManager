import React from 'react';
import AuthNavbar from './UserContent/AuthNavbar';
import UserNavbar from './UserContent/UserNavbar';

export default class DefaultNavbar extends React.Component {

  render() {
    const { isAdmin } = this.props.navbarProps.auth.user;
    return (
      <div>
        {isAdmin ? 
          <AuthNavbar
            navbarProps={this.props.navbarProps}
          /> :
          <UserNavbar
            navbarProps={this.props.navbarProps}
          /> }
      </div>
    )
  }
}