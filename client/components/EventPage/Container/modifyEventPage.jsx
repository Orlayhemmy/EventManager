import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Content from '../Template/Content/eventContent';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/Container/footer';
import { logout } from '../../../actions/userActions';
import { getCenterSelected } from '../../../actions/centerActions';
import { modifyEventValidation } from '../../../shared/eventValidations';
import { modifyEvent, getEventSelected, checkAvailableDate } from '../../../actions/eventActions';



/**
 * @description ModifyEventPage component
 */
export class ModifyEventPage extends React.Component {
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
    dateArray.splice(dataIndex, 1);
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
  * @memberof EditEventForm
  * @method componentWillReceiveProps
  * @description it updates the state when new props are recieved
  * @param {object} nextProps
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
   if (nextProps.userEvent.event) {
     const {
       description,
       eventTitle,
       bookedDate,
       dateArray,
       centerId,
       centerName
     } = nextProps.userEvent.event;

     this.setState({
       eventTitle: eventTitle || '',
       dateArray: bookedDate || '',
       description: description || '',
       centerName: centerName || '',
       centerId: centerId || '',
     });
   }
  }

  /**
  * @memberof EditEventForm
  * @method componentWillMount
  * @returns {void}
  */
  componentWillMount() {
    this.props.getCenterSelected();
    this.props.getEventSelected();
  }
  /**
   * @memberof AddEventForm
   * @method isValid
   * @description it calls validation action on user data
   * @param {void}
   * @returns true or false
   */
  isValid() {
    const { errors, isValid } = modifyEventValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
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
    if (this.isValid()) {
      this.props.modifyEvent(this.props.userEvent.event.id, this.state);
    }
  }

  /**
   * @memberof ModifyEventPage
   * @method logout
   * @description it calls a logout action
   * @param {object} event
   * @returns {void}
   */
  logout(e) {
    this.props.logout();
  }
  /**
   * @memberof ModifyEventPage
   * @method render
   * @description it renders the component
   * @returns the HTML of ModifyEventPage
   */
  render() {
    //Check if user is logged in
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.props.center.status === 401) {
      this.logout();
    }
    if(this.props.userEvent.status === 202) {
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
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  modifyEvent: PropTypes.func.isRequired,
  getEventSelected: PropTypes.func.isRequired,
  checkAvailableDate: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  center: state.center,
  userEvent: state.event
});
ModifyEventPage.propTypes = propTypes;

export default connect(mapStateToProps, {
  logout,
  getCenterSelected,
  modifyEvent,
  getEventSelected,
  checkAvailableDate
})(ModifyEventPage);
