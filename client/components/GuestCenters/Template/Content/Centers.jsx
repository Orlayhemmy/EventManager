import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Centers from '../../../Common/Centers';
import Search from '../../../Common/Search';
import { getCenters } from '../../../../actions/centerActions';
/**
 * @description CenterPage component
 */
export class CenterPage extends React.Component {
   /**
   * @memberof CenterPage 
   * @method render
   * @description it renders the component
   * @returns the HTML of CenterPage 
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
    }
    this.nextCenters = this.nextCenters.bind(this);
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

   /**
   * @memberof CenterPage
   * @method search
   * @description it calls a search action
   * @param {object} event
   * @returns {void}
   */
  search(e) {
    e.preventDefault();
    this.setState({
      counter: 0,
    });
    if (this.isValid()) {
      this.props.getCenters(this.state, this.state.counter);
    }
  }

   /**
   * @memberof CenterPage
   * @method onChange
   * @description it sets user input to state
   * @param {object} event
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    let div = document.getElementById('btwValue');
    if (e.target.value === 'between' || e.target.id === 'btwValue') {
      div.hidden = false;
    } else {
      div.hidden = true;
    }
  }
  /**
   * @memberof CenterPage
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid() {
    const { errors, isValid } = searchValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @memberof DisplayCenters
   * @method nextCenters
   * @description it fetches the next centers
   * @returns {void}
   */
  nextCenters(e) {
    console.log(this.state)
    if (e.target.id === 'next') {
      this.setState({
        counter: this.state.counter + 1,
      });
      this.props.getCenters(this.state, ++this.state.counter)
    } else {
      this.setState({
        counter: this.state.counter - 1,
      });
      this.props.getCenters(this.state, --this.state.counter)
    }
  }
  /**
   * @memberof CenterPage
   * @description it creates an instance of CenterPage
   */
  render() {
    return (
      <div className="container">
        <Search criteria={this.state}/>
        <Centers
        searchState={this.state}
        counter={this.state.counter}
        showCenter={this.showCenter}
        nextCenters={this.nextCenters} />
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const propTypes = {
  getCenters: PropTypes.func.isRequired
}

CenterPage.propTypes = propTypes;

export default connect(mapStateToProps, {
  getCenters
})(CenterPage);