import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Centers from '../../../Common/Centers';
import Search from '../../../Common/Search';
import { getCenters, getNextCenters } from '../../../../actions/centerActions';
import { searchValidation } from '../../../../shared/centerValidations';

/**
 * @description CenterPage component
 */
export class CenterPage extends React.Component {
  state = {
    counter: 0,
    location: '',
    facilities: '',
    capacity: '',
    capacityType: '',
    errors: {},
    btwValue: ''
  };

  searchNav = () => {
    document.getElementById('search-nav').style.width = '280px';
  };
  /**
   * @memberof CenterPage
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
      this.props.getCenters(this.state, this.state.counter);
    }
  };

  /**
   * @memberof CenterPage
   * @method onChange
   * @description it sets user input to state
   * @param {object} e
   */
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  /**
   * @memberof CenterPage
   * @method isValid
   * @description it calls validation action on user data
   * @returns true or false
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
   * @method nextCenters
   * @description it fetches the next centers
   * @returns {void}
   * @param {object} e
   * @param {string} page
   */
  nextCenters = (e, page) => {
    const { counter } = this.state;
    window.scroll(0, 0);
    if (page !== undefined) {
      return this.setState({
        counter: page - 1
      }, () => {
        this.props.getNextCenters(counter);
      });
    }
    if (e.target.id === 'next') {
      this.setState({
        counter: counter + 1
      });
      this.props.getNextCenters(counter + 1);
    } else {
      this.setState({
        counter: counter - 1
      });
      this.props.getNextCenters(counter - 1);
    }
  };

  render() {
    return (
      <div className="container">
        <Search
          criteria={this.state}
          searchNav={this.searchNav}
          search={this.search}
          onChange={this.onChange}
          getCenters={this.props.getCenters}
        />
        <Centers
          searchNav={this.searchNav}
          searchState={this.state}
          counter={this.state.counter}
          showCenter={this.showCenter}
          nextCenters={this.nextCenters}
        />
      </div>
    );
  }
}
const mapStateToProps = () => ({});

const propTypes = {
  getCenters: PropTypes.func.isRequired,
  getNextCenters: PropTypes.func.isRequired
};

CenterPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    getCenters,
    getNextCenters
  }
)(CenterPage);
