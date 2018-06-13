import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
  /**
   * @memberof AdminDashMethod
   * @method render
   * @description it renders the component
   * @returns {void} the HTML of AdminDashMethod
   */
  constructor() {
    super();
    this.state = {
      counter: 0,
      location: '',
      facilities: '',
      capacity: '',
      capacityType: '',
      errors: {},
      btwValue: ''
    };
    this.showCenter = this.showCenter.bind(this);
    this.nextCenters = this.nextCenters.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
   * @memberof AdminDashMethod
   * @method nextCenters
   * @description it fetches the next centers
   * @returns {void}
   * @param {object} e
   */
  nextCenters(e) {
    if (e.target.id === 'next') {
      this.setState({
        counter: this.state.counter + 1
      });
      this.props.getCenters(this.state, ++this.state.counter);
    } else {
      this.setState({
        counter: this.state.counter - 1
      });
      this.props.getCenters(this.state, --this.state.counter);
    }
  }
  /**
   * @memberof AdminDashMethod
   * @method showCenter
   * @description it fetches the details of the center to be viewed
   * @param {object} e
   * @returns {void}
   */
  showCenter(e) {
    this.props.viewCenterSelected(e.target.id);
  }

  /**
   * @memberof AdminDashMethod
   * @method onDelete
   * @description it fetches the details of the center to be deleted
   * @param {object} e
   * @returns {void}
   */
  onDelete(e) {
    const center = {
      centerId: e.target.id,
      centerName: e.target.parentNode.id
    };
    this.props.centerSelected(center);
  }

  /**
   * @memberof AdminDashMethod
   * @method search
   * @description it calls a search action
   * @param {object} e
   * @returns {void}
   */
  search(e) {
    e.preventDefault();
    this.setState({
      counter: 0
    });
    if (this.isValid()) {
      this.props.getCenters(this.state, this.state.counter);
    }
  }

  /**
   * @memberof AdminDashMethod
   * @method onChange
   * @description it sets user input to state
   * @param {object} e
   * @returns {object} state
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    const div = document.getElementById('btwValue');
    if (e.target.value === 'between' || e.target.id === 'btwValue') {
      div.hidden = false;
    } else {
      div.hidden = true;
    }
  }
  /**
   * @memberof AdminDashMethod
   * @method isValid
   * @description it calls validation action on user data
   * @returns {void} true or false
   */
  isValid() {
    const { errors, isValid } = searchValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  render() {
    //Check if user is logged in and is also an Admin
    if (!this.props.user.isAuth) {
      return <Redirect to="/" />;
    } else if (!this.props.user.user.isAdmin) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container">
        <Search 
          search={this.search}
          criteria={this.state}
          onChange={this.onChange}
        />
        <Centers 
          // path={pathname}
          searchState={this.state}
          counter={this.state.counter}
          showCenter={this.showCenter}
          nextCenters={this.nextCenters}
          />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

const propTypes = {
  centerSelected: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  viewCenterSelected: PropTypes.func.isRequired
}

AdminPanelPage.propTypes = propTypes;

export default connect(mapStateToProps, {
  centerSelected,
  getCenters,
  viewCenterSelected
})(AdminPanelPage);
