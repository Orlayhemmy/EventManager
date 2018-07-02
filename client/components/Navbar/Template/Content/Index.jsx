import React from 'react';
import AuthNavbar from './UserContent/AuthNavbar';
import UserNavbar from './UserContent/UserNavbar';

export default class DefaultNavbar extends React.Component {
  render() {
    const {
      navbarProps: {
        auth: {
          user: { isAdmin }
        }
      },
      navbarProps
    } = this.props;
    return isAdmin ? (
      <AuthNavbar navbarProps={navbarProps} />
    ) : (
      <UserNavbar navbarProps={navbarProps} />
    );
  }
}
