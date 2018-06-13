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
    const navbarSecondary = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-dashboard" /> Dashboard
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-centers" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-home" /> centers
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-center" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-plus-square" /> add center
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-event" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-plus-square" /> add event
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-user" /> profile
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={this.logout.bind(this)} className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-power-off" /> logout
            </span>
          </Link>
        </li>
      </ul>
    );

    const navbarMain = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-home" /> Home
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-dashboard" /> about us
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <span className="nav-link-text">
              <i className="fa fa-dashboard" /> Dashboard
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            onClick={this.logout.bind(this)}
            className="nav-link"
          >
            <span className="nav-link-text">
              <i className="fa fa-power-off" /> logout{' '}
            </span>
          </Link>
        </li>
      </ul>
    );
    return (
      <div>
        {this.props.path === '/' || this.props.path === '/about' ?
          navbarMain : navbarSecondary }
      </div>
    );
  }
}
