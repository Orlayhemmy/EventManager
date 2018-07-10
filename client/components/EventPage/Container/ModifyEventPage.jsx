import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import Content from '../Template/Content/eventContent';
import Navbar from '../../Navbar/Container/Navbar';
import Footer from '../../Footer/Footer';
import { logout } from '../../../actions/userActions';
import { getCenterSelected } from '../../../actions/centerActions';
import { modifyEventValidation } from '../../../shared/eventValidations';
import {
  modifyEvent,
  getEventSelected,
  checkAvailableDate
} from '../../../actions/eventActions';
import { addEventIntro } from '../../Common/intro';

/**
 * @description ModifyEventPage component
 */
export class ModifyEventPage extends React.Component {
  state = {
    eventTitle: '',
    bookedDate: '',
    description: '',
    errors: {},
    isLoading: false,
    centerId: '',
    centerName: '',
    dateArray: [],
    event: {
      Center: {}
    }
  };
  /**
   * @memberof AddEventForm
   * @method onChange
   * @description it sets user input to state
   * @param {object} e
   */
  onChange = e => {
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
   * @method checkDate
   * @param {object} e
   */
  checkDate = e => {
    e.preventDefault();
    if (this.state.bookedDate && this.state.centerId) {
      this.props.checkAvailableDate(this.state);
    }
  };

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
        // centerId
        // Center: { centerName }
      } = nextProps.userEvent.event;

      this.setState({
        eventTitle: eventTitle || '',
        dateArray: bookedDate || '',
        description: description || '',
        // centerName: centerName || '',
        // centerId: centerId || ''
      });
    }
    if (nextProps.centerSelected.center) {
      const { centerName } = nextProps.centerSelected.center;
      this.setState({
        centerName: centerName || ''
      });
    }
  }

  /**
   * @memberof EditEventForm
   * @method componentDidMount
   * @returns {void}
   */
  componentDidMount() {
    this.props.getCenterSelected();
    this.props.getEventSelected();
  }
  /**
   * @memberof AddEventForm
   * @method isValid
   * @description it calls validation action on user data
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
   * @memberof ModifyEventPage
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} e
   * @returns {void}
   */
  onSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.props.modifyEvent(this.props.userEvent.event.id, this.state);
    }
  };

  /**
   * @memberof ModifyEventPage
   * @method removeDate
   * @description it sets user input to state
   * @param {string} data
   * @returns {Array} datearray
   */
  removeDate = data => {
    const { dateArray } = this.state;
    const dataIndex = dateArray.indexOf(data);
    dateArray.splice(dataIndex, 1);
    return dateArray;
  };

  /**
   * @memberof ModifyEventPage
   * @method render
   * @description it renders the component
   * @returns the HTML of ModifyEventPage
   */
  render() {
    const {
      centerSelected: { status },
      auth: { isAuth }
    } = this.props;
    if (!isAuth) {
      return <Redirect to="/" />;
    }
    if (status === 401) {
      this.props.logout();
    }
    if (this.props.userEvent.status === 202) {
      swal(this.props.userEvent.message);
      return <Redirect to="/dashboard" />;
    }
    const { pathname } = this.props.location;
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
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  centerSelected: PropTypes.object.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  modifyEvent: PropTypes.func.isRequired,
  getEventSelected: PropTypes.func.isRequired,
  checkAvailableDate: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  centerSelected: state.center,
  userEvent: state.event
});
ModifyEventPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    logout,
    getCenterSelected,
    modifyEvent,
    getEventSelected,
    checkAvailableDate
  }
)(ModifyEventPage);
