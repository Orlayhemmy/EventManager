import React from 'react';
import AuthNavbar from './UserContent/AuthNavbar';
import UserNavbar from './UserContent/UserNavbar';

/**
 * @description NavBar component
 */
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
      <AuthNavbar id="authnavbar" navbarProps={navbarProps} />
    ) : (
      <UserNavbar id="usernavbar" navbarProps={navbarProps} />
    );
  }
}
