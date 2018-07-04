import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Centers from '../../../Common/Centers';
import Search from '../../../Common/Search';
import {
  getCenters,
  centerSelected,
  viewCenterSelected
} from '../../../../actions/centerActions';
import { searchValidation } from '../../../../shared/centerValidations';

/**
 * @description AdminPanelPage  component
 */
export class AdminPanelPage extends React.Component {
  state = {
    counter: 0,
    location: '',
    facilities: '',
    capacity: '',
    capacityType: '',
    errors: {},
    btwValue: ''
  };

  /**
   * @memberof AdminDashMethod
   * @method onChange
   * @description it sets user input to state
   * @param {object} e
   * @returns {object} state
   */
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  /**
   * @memberof AdminDashMethod
   * @method nextCenters
   * @description it fetches the next centers
   * @returns {void}
   * @param {object} e
   */
  nextCenters = (e) => {
    const { getCenters } = this.props; // eslint-disable-line
    const { counter } = this.state;
    window.scroll(0, 0);
    document.body.scrollTop = 0;
    if (e.target.id === 'next') {
      this.setState({
        counter: counter + 1
      });
      getCenters(this.state, counter + 1);
    } else {
      this.setState({
        counter: counter - 1
      });
      getCenters(this.state, counter - 1);
    }
  }

  /**
   * @memberof AdminDashMethod
   * @method showCenter
   * @description it fetches the details of the center to be viewed
   * @param {object} e
   * @returns {void}
   */
  showCenter = (e) => {
    this.props.viewCenterSelected(e.target.id); // eslint-disable-line
  };

  /**
   * @memberof AdminDashMethod
   * @method search
   * @description it calls a search action
   * @param {object} e
   * @returns {void}
   */
  search = (e) => {
    e.preventDefault();
    this.setState({
      counter: 0
    });
    if (this.isValid()) {
      this.props.getCenters(this.state, this.state.counter); // eslint-disable-line
    }
  };

  searchNav = () => {
    document.getElementById('search-nav').style.width = '280px';
  };

  /**
   * @memberof AdminDashMethod
   * @method isValid
   * @description it calls validation action on user data
   * @returns {void} true or false
   */
  isValid = () => {
    const { errors, isValid } = searchValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  /**
   * @memberof AdminDashMethod
   * @method render
   * @description it renders the component
   * @returns the HTML of AddCenterPage
   */
  render() {
    // Check if user is logged in and is also an Admin
    const {
      userState: {
        user: { isAdmin }, isAuth
      },
      path
    } = this.props;
    const { counter } = this.state;
    if (!isAuth) {
      return <Redirect to="/" />;
    } if (!isAdmin) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container">
        <Search
          searchNav={this.searchNav}
          search={this.search}
          criteria={this.state}
          onChange={this.onChange}
        />
        <Centers
          path={path}
          searchNav={this.searchNav}
          searchState={this.state}
          counter={counter}
          showCenter={this.showCenter}
          nextCenters={this.nextCenters}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.auth
});

const propTypes = {
  getCenters: PropTypes.func.isRequired,
  viewCenterSelected: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

AdminPanelPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    centerSelected,
    getCenters,
    viewCenterSelected
  }
)(AdminPanelPage);
