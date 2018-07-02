import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {
  getCenters,
  getCenterSelected,
  clearCenterStorage
} from '../../../../actions/centerActions';
import { getEventSelected, checkAvailableDate } from '../../../../actions/eventActions';
import AddEventForm from '../Form/addEventForm';
import EditEventForm from '../Form/editEventForm';
import Modal from '../../../Flash/modal';
import { searchValidation } from '../../../../shared/centerValidations';
import CenterSearch from '../../../Common/Search';



/**
 * @description Event component
 */
export class Event extends React.Component {
  /**
  * @memberof EditEventForm
  * @description it creates an instance of EditEventForm
  */
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      location: '',
      facilities: '',
      capacity: '',
      capacityType: '',
      errors: {},
      btwValue: ''
    };
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    // this.checkDate = this.checkDate.bind(this);
  }
  searchNav = (e) => {
    if (e.target.parentNode.id === "submit") {
      const div = document.getElementById('search-nav');
      div.style.width = "0px";
      return div
    }
    document.getElementById('search-nav').style.width = '280px';
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
  /**
   * @memberof AdminDashMethod
   * @method search
   * @description it calls a search action
   * @param {object} e
   * @returns {void}
   */
  search(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.getCenters(this.state, 0);
      this.searchNav(e);
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
  // * @memberof AddEventForm
  // * @method checkDate
  // * @param {object} event
  // */
  checkDate(e) {
    e.preventDefault();
    this.props.checkAvailableDate(this.state);
  }
  /**
   * @memberof EditEventForm
   * @method componentDidUpdate
   * @description it calls a script
   * @returns {void}
   */
  componentDidUpdate() {
    let dateCounter;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 1;
    let currentDate = `${year}-${month}-${day}`;
      $(document).ready( function() {
        $('#bookedDate').datepicker({
          format:'yyyy-mm-dd',
          autoclose:true,
          startDate: currentDate,
        })
      });
    if (this.props.userEvent.status === 201) {
      alert(this.props.userEvent.message);
    }
  }
   /**
   * @memberof Event
   * @method componentWillMount
   * @description it calls an action
   * @param {void} event
   * @returns {void}
   */
  componentWillMount() {
    this.props.getCenters();
  }
  /**
   * @memberof Event
   * @method render
   * @description it renders the component
   * @returns the HTML of Event
   */
  render() {
    if (this.props.userEvent.status === 201) {
      return <Redirect to="/dashboard" />;
    }
    let content;
    const message = this.props.userEvent.message;
    const { path } = this.props;
    const center = this.props.eventCenter.center;
    const  centerInfo = ( center.centerName ?
        (
          <div className="form-inner">
            <img className="img-fluid" src={center.imageUrl} />
            <div className="media-body">
              <h1 className="media-heading">
                <span>{center.centerName}</span>
              </h1>
              <h3>Location</h3>
              <p>{center.location}</p>
              <h3>Facilities</h3>
              <p>{center.facilities}</p>
              <h3>Description</h3>
              <p>{center.description}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="empty-center">
              <i className="fa fa-university">
                <h2>Select a center</h2>
              </i>
            </div>
          </div>
        )
      );
    if (this.props.path === '/modify-event') {
      content = <EditEventForm
        eventState={this.props.eventState}
        search={this.search}
        onChange={this.onChange}
        criteria={this.state}
        onFormChange={this.props.onFormChange}
        onFormSubmit={this.props.onFormSubmit}
        checkDate={this.props.checkDate}
        removeDate={this.props.removeDate}
      />;
    } else {
      content = <AddEventForm
        eventState={this.props.eventState}
        search={this.search}
        onChange={this.onChange}
        criteria={this.state}
        onFormChange={this.props.onFormChange}
        onFormSubmit={this.props.onFormSubmit}
        checkDate={this.props.checkDate}
        removeDate={this.props.removeDate}
      />;
    }
    return (
      <div id="event-form">
        <div className="container">
          <div className="search-icon" onClick={this.searchNav}>
            <i className="fa fa-search" />
          </div>
          <CenterSearch 
            criteria={this.state}
            search={this.search}
            onChange={this.onChange}
          />
          <div className="row">
            <div className="col-lg-4 card mr-2 text-center bb mxh">
              {centerInfo}
            </div>
            <div className="col-lg-7 card m-auto text-center bb pl-5 pr-5 pt-4 pb-4">
              <div className="logo">
                lets make your <strong className="text-primary">event</strong> a
                memorable one
              </div>
              <hr className="mb-0"/>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const propTypes = {
  getEventSelected: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  clearCenterStorage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  checkAvailableDate: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  eventCenter: state.center,
  userEvent: state.event
});
Event.propTypes = propTypes;

export default connect(mapStateToProps, {
  getCenters,
  getCenterSelected,
  clearCenterStorage,
  getEventSelected,
  checkAvailableDate
})(Event);
