import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../Form/SignIn';

export default class Navbar extends React.Component {
     /**
   * @memberof NavBar
   * @method render
   * @description it renders the content of guestlinks
   * @returns the HTML of NavBar
   */
  render() {
    const { navbarProps } = this.props;
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
        <li className="nav-item">
          <div className="dropdown">
            <button
              class="btn btn-success dropdown-toggle main-color-bg"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
              id="signIn"
            >
              Sign In
            </button>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="signIn"
            >
              <SignIn navbarProps={navbarProps}/>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}