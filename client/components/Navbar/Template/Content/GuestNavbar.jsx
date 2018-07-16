import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../Form/SignIn';

/**
 * @description NavBar component
 */
export default class Navbar extends React.Component {
  /**
   * @memberof NavBar
   * @method render
   * @description it renders the content of guestlinks
   * @returns the HTML of NavBar
   */
  render() {
    const { navbarProps } = this.props;
    const { path } = navbarProps;
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            to="/"
            id="home"
            className={path === '/' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-link-text">Home</span>
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
          <div className="dropdown">
            <button
              className="btn btn-success dropdown-toggle main-color-bg"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
              id="signIn"
            >
              Sign In
            </button>
            <div
              class="dropdown-menu dropdown-menu-right mt-3"
              aria-labelledby="signIn"
            >
              <SignIn navbarProps={navbarProps} />
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
