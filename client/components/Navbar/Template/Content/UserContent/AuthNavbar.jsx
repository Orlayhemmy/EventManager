import React from 'react';
import { Link } from 'react-router-dom';

export default class AuthNavbar extends React.Component {
  /**
   * @memberof NavBar
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.navbarProps.logout();
  }
  /**
   * @memberof AuthNavbar
   * @method render
   * @description it renders the content of authNavbar
   * @returns the HTML of NavBar
   */
  render() {
    const { path } = this.props.navbarProps;
    const navbarSecondary = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={path === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/admin-centers"
            className={
              path === '/admin-centers' ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-link-text">centers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/add-center"
            className={path === '/add-center' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">add center</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/add-event"
            className={path === '/add-event' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">add event</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/profile"
            className={path === '/profile' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={this.logout.bind(this)} className="nav-link">
            <span className="nav-link-text">logout</span>
          </Link>
        </li>
      </ul>
    );

    const navbarMain = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            to="/"
            className={path === '/' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className={path === '/about' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">about us</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={path === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={this.logout.bind(this)} className="nav-link">
            <span className="nav-link-text">logout</span>
          </Link>
        </li>
      </ul>
    );
    return path === '/' || path === '/about' ? navbarMain : navbarSecondary;
  }
}
