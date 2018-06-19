import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Content from '../Template/Content/eventContent';
import Navbar from '../../Navbar/Index';
import Footer from '../../Footer/Container/Index';
import { logout } from '../../../actions/userActions';
import { getCenterSelected } from '../../../actions/centerActions';
import { addEventValidation } from '../../../shared/eventValidations';
import { createEvent, checkAvailableDate } from '../../../actions/eventActions';

/**
 * @description AddEventPage component
 */
export class AddEventPage extends React.Component {
  /**
  * @memberof EditEventForm
  * @description it creates an instance of EditEventForm
  */
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      bookedDate: '',
      description: '',
      errors: {},
      isLoading: false,
      centerId: '',
      centerName: '',
      dateArray: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.removeDate = this.removeDate.bind(this);
  }
  /**
  * @memberof AddEventForm
  * @method onChange
  * @description it sets user input to state
  * @param {object} event
  */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    if (e.target.id === 'centerId') {
      this.state.centerId = e.target.value;
      this.props.getCenterSelected(e.target.value, 'tag');
    }
  }

  removeDate(data) {
    const { dateArray } = this.state;
    const dataIndex = dateArray.indexOf(data);
    if (dataIndex !== -1) dateArray.splice(dataIndex, 1);
  }
  /**
  * @memberof AddEventForm
  * @method checkDate
  * @param {object} event
  */
  checkDate(e) {
    e.preventDefault();
    if (this.state.bookedDate && this.state.centerId) {
      this.props.checkAvailableDate(this.state);
    }
  }
  /**
   * @memberof AddEventForm
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} event
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    let data = {
      eventInfo: this.state,
      user: this.props.auth.user.fullname,
      centerName: this.props.center.centerName,
      reason: '',
      suggestion: '',
      text: '',
    }
    let id = document.getElementById('bookedDate');
    this.state.bookedDate = id.value;
    if (this.isValid()) {
      this.props.createEvent(data);
    }
  }
  /**
   * @memberof AddEventForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid() {
    const { errors, isValid } = addEventValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }  
    return isValid;
  }
  /**
   * @memberof AddEventPage
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof AddEventPage
   * @method render
   * @description it renders the component
   * @returns the HTML of AddEventPage
   */
  render() {
    //Check if user is logged in
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.props.center.status === 401 || this.props.userEvent.status === 498) {
      this.logout();
    }
    if(this.props.userEvent.status === 201) {
      swal(this.props.userEvent.message);
      return <Redirect to="/dashboard" />;
    }
    const { pathname } = this.props.location;

    return (
      <div>
        <Navbar />
        <Content
          path={pathname}
          eventState={this.state}
          onFormChange={this.onChange}
          onFormSubmit={this.onSubmit}
          checkDate={this.checkDate}
          removeDate={this.removeDate}
        />
        <Footer />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  checkAvailableDate: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  center: state.center,
  userEvent: state.event
});
AddEventPage.propTypes = propTypes;

export default connect(mapStateToProps, {
  logout,
  getCenterSelected,
  createEvent,
  checkAvailableDate
})(AddEventPage);
