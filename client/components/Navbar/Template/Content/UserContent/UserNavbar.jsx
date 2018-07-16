import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description NavBar component
 */
export default class UserNavbar extends React.Component {
  render() {
    const {
      navbarProps: { path, logout }
    } = this.props;
    const navbarSecondary = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            id="dashboard"
            to="/dashboard"
            className={path === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="add-event"
            to="/add-event"
            className={path === '/add-event' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">add event</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="profile"
            to="/profile"
            className={path === '/profile' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" id="logout" onClick={logout} className="nav-link">
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
            <span id="home" className="nav-link-text">
              Home
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="view-centers"
            to="/view-centers"
            className={
              path === '/view-centers' ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-link-text">centers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="about"
            to="/about"
            className={path === '/about' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">about us</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="dashboard"
            to="/dashboard"
            className={path === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" id="logout" onClick={logout} className="nav-link">
            <span className="nav-link-text">logout</span>
          </Link>
        </li>
      </ul>
    );
    return path === '/' || path === '/about' ? navbarMain : navbarSecondary;
  }
}
