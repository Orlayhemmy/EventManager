import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/userActions';
import GuestNavbar from '../Template/Content/GuestNavbar';
import UserNavbar from '../Template/Content/Index';

/**
 * @description NavBar component
 */
export class NavBar extends React.Component {
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
            <span className="text-lowercase fw">e</span>Center
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
          {isAuth ? 
            <UserNavbar navbarProps={this.props} /> :
            <GuestNavbar navbarProps={this.props} />}
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
