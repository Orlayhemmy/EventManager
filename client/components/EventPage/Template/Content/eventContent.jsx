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
import { getEventSelected } from '../../../../actions/eventActions';
import AddEventForm from '../Form/addEventForm';
import EditEventForm from '../Form/editEventForm';
import Modal from '../../../Flash/Container/modal';
import { searchValidation } from '../../../../shared/centerValidations';


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
   * @memberof EditEventForm
   * @method componentDidUpdate
   * @description it calls a script
   * @returns {void}
   */
  componentDidUpdate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 1;
    let currentDate = `${year}-${month}-${day}`;
    <script>
      $(document).ready( function() {
        $('#bookedDate').datepicker({
          format:'yyyy-mm-dd',
          autoclose:true,
          startDate: currentDate,
        })
      });
    </script>
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
    let centerInfo;
    if (isEmpty(center)) {
      centerInfo = (
        <div className="form-inner">
          <div className="media largeIcon">
            <i className="fa fa-home">
              <h2>Select a center</h2>
            </i>
          </div>
        </div>
      );
    } else {
      centerInfo = (
        <div className="form-inner">
          <img className="img-fluid" src={center.imageUrl} />
          <div className="media-body">
            <h2 className="media-heading">
              <span>{center.centerName}</span>
            </h2>
            <h3>Location</h3>
            <p>{center.location}</p>
            <h3>Facilities</h3>
            <p>{center.facilities}</p>
            <h3>Description</h3>
            <p>{center.description}</p>
          </div>
        </div>
      );
    }
    if (this.props.path === '/modify-event') {
      content = <EditEventForm
        eventState={this.props.eventState}
        search={this.search}
        onChange={this.onChange}
        criteria={this.state}
        onFormChange={this.props.onFormChange}
        onFormSubmit={this.props.onFormSubmit}
      />;
    } else {
      content = <AddEventForm
        eventState={this.props.eventState}
        search={this.search}
        onChange={this.onChange}
        criteria={this.state}
        onFormChange={this.props.onFormChange}
        onFormSubmit={this.props.onFormSubmit}
      />;
    }
    return (
      <div id="event-form">
        <div className="container">
          <div className="row m-auto">
            <div className="col-lg-4 card mr-2 text-center bb">
              {centerInfo}
            </div>
            <div className="col-lg-7 card text-center bb pb-3">
              <div className="logo">
                lets make your <strong className="text-primary">event</strong> a
                memorable one
              </div>
              <hr />
              {content}
            </div>
            <span data-toggle="modal" data-target="#event">
              Modal
            </span>
            <Modal message={message} />
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
  userEvent: PropTypes.object.isRequired
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
  getEventSelected
})(Event);
