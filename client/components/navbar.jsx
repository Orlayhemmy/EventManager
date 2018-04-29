import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/signInActions';

/**
 * @description NavBar component
 */
export class NavBar extends React.Component {
  /**
   * @memberof NavBar
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof NavBar
   * @method guestLinks
   * @description it renders the content of guestlinks
   * @returns the HTML of NavBar
   */
  guestLinks() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <span className="nav-link-text">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/view-centers" className="nav-link">
            <span className="nav-link-text">centers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            <span className="nav-link-text">about us</span>
          </Link>
        </li>
      </ul>
    );
  }
  /**
   * @memberof NavBar
   * @method userLinks
   * @description it renders the content of userlinks
   * @returns the HTML of NavBar
   */
  userLinks() {
    if (this.props.auth.user.isAdmin) {
      if (this.props.path === '/' || this.props.path === '/about') {
        return (
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
      }
      return (
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
    } else {
      if (this.props.path === '/' || this.props.path === '/about') {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="nav-link-text">
                  <i className="fa fa-home" /> Home
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view-centers" className="nav-link">
                <span className="nav-link-text">
                  <i className="fa fa-home" /> centers
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
      }
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <span className="nav-link-text">
                <i className="fa fa-dashboard" /> Dashboard
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
    }
  }
  /**
   * @memberof NavBar
   * @method render
   * @description it renders the component
   * @returns the HTML of NavBar
   */
  render() {
    const { isAuth } = this.props.auth;
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <Link to="/" className="navbar-brand">
          <h1>
            event <strong className="text-primary">center </strong>
          </h1>
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {isAuth ? this.userLinks() : this.guestLinks()}
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavBar);
