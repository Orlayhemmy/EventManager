import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import Content from '../Template/Content/EventContent';
import Navbar from '../../Navbar/Container/Navbar';
import Footer from '../../Footer/Footer';
import { logout } from '../../../actions/userActions';
import { getCenterSelected } from '../../../actions/centerActions';
import { addEventValidation } from '../../../shared/eventValidations';
import { createEvent, checkAvailableDate } from '../../../actions/eventActions';
import { addEventIntro } from '../../Common/intro';
/**
 * @description AddEventPage component
 */
export class AddEventPage extends React.Component {
  state = {
    eventTitle: '',
    bookedDate: '',
    description: '',
    errors: {},
    isLoading: false,
    centerId: '',
    centerName: '',
    dateArray: []
  };

  searchNav = () => {
    document.getElementById('search-nav').style.width = '280px';
  };
  /**
   * @memberof AddEventForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} e
   */
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    if (e.target.id === 'centerId') {
      this.state.centerId = e.target.value;
      this.props.getCenterSelected(e.target.value, 'tag');
    }
  };

  /**
   * @memberof AddEventForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} data
   */
  removeDate = data => {
    const { dateArray } = this.state;
    const dataIndex = dateArray.indexOf(data);
    if (dataIndex !== -1) dateArray.splice(dataIndex, 1);
  };
  /**
   * @memberof AddEventForm
   * @method checkDate
   * @param {object} e
   */
  checkDate = (e) => {
    e.preventDefault();
    if (this.state.bookedDate && this.state.centerId) {
      this.props.checkAvailableDate(this.state);
    }
  };
  /**
   * @memberof AddEventForm
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} e
   * @returns {void}
   */
  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      eventInfo: this.state,
      user: this.props.auth.user.fullname,
      centerName: this.props.center.centerName,
      reason: '',
      suggestion: '',
      text: ''
    };
    const id = document.getElementById('bookedDate');
    this.state.bookedDate = id.value;
    if (this.isValid()) {
      this.props.createEvent(data);
    }
  };
  /**
   * @memberof AddEventForm
   * @method isValid
   * @description it calls validation action on user data
   * @returns true or false
   */
  isValid = () => {
    const { errors, isValid } = addEventValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };
  componentDidMount() {
    if (this.props.userEvent.eventBookedCount === 0) {
      addEventIntro();
    }
  }


  /**
   * @memberof AddEventPage
   * @method render
   * @description it renders the component
   * @returns the HTML of AddEventPage
   */
  render() {
    const {
      userEvent: {
        status,
        message
      },
      center,
      auth,
      location: { pathname }
    } = this.props;
    if (!auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (
      center.status === 498 ||
      center.status === 401 ||
      status === 498
    ) {
      this.props.logout();
    }
    if (this.props.userEvent.status === 201) {
      swal(message);
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <Navbar path={pathname} />
        <Content
          path={pathname}
          eventState={this.state}
          onFormChange={this.onChange}
          onFormSubmit={this.onSubmit}
          checkDate={this.checkDate}
          removeDate={this.removeDate}
          tour={addEventIntro}
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
  checkAvailableDate: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  center: state.center,
  userEvent: state.event
});
AddEventPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    logout,
    getCenterSelected,
    createEvent,
    checkAvailableDate
  }
)(AddEventPage);
