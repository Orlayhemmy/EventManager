import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import CenterSearch from '../centerSearch';
import { createEvent, getCenterEvents } from '../../actions/eventActions';
import TextField from '../../common/textField';
import { addEventValidation, modifyEventValidation } from '../../shared/eventValidations';
import { getCenterSelected } from '../../actions/centerActions';

/**
 * @description AddEventForm component
 */
export class AddEventForm extends React.Component {
  /**
   * @memberof AddEventForm
   * @description it creates an instance of AddEventForm
   */
  constructor() {
    super();
    this.state = {
      eventTitle: '',
      bookedDate: '',
      description: '',
      errors: {},
      isLoading: false,
      centerId: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
  /**
   * @memberof AddEventForm
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
      this.setState({
        centerId: e.target.value
      });
      this.props.getCenterSelected(e.target.value, 'tag');
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
    if (this.props.path === '/modify-event') {
      const {
        errors,
        isValid
      } = modifyEventValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    } else {
      const {
        errors,
        isValid
      } = addEventValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      
      return isValid;
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
   * @method render
   * @description it renders the component
   * @returns the HTML of addeventform
   */
  render() {
    const { event } = this.props.event;
    const {
      eventTitle,
      bookedDate,
      description,
      errors,
      isLoading,
      centerId
    } = this.state;
    
    const showCenters = _.map(this.props.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    
    return (
      <div>        
        <form id="add-event-form" onSubmit={this.onSubmit}>
          <span className="help-block">{this.props.event.error}</span>
          <CenterSearch />
          <p className="subtitle">select your preferred event center</p>
          <div className="input-group">
            <span class="input-group-addon">
              <i className="fa fa-home"></i>
            </span>
            <select className="form-control" defaultValue={this.state.centerId} id="centerId" onChange={this.onChange}>            
              <option value="">Select Center</option>
              {showCenters}
            </select>
          </div>

          <span className="help-block">{errors.bookedDate}</span>
            <div class="input-group">
              <span class="input-group-addon">
                <i className="fa fa-calendar"></i>
              </span>
              <input type="text" id="bookedDate" onBlur={this.onChange} class="form-control" value={this.state.bookedDate} placeholder="Select preferred date"/>
            </div>

          <span className="help-block">{errors.eventTitle}</span>  
            <div class="input-group">
              <span class="input-group-addon">
                <i className="fa fa-microphone"></i>
              </span> 
              <input type="text" id="eventTitle" onChange={this.onChange} class="form-control" value={this.state.eventTitle} placeholder="give your event a title"/>
            </div>

          <span className="help-block">{errors.description}</span>
          <p className="subtitle">describe your event in few words</p>
          <div className="form-group">
            <textarea className="form-control" id="description"
          onChange={this.onChange} placeholder="Give a brief description of the event"></textarea>
          </div> 
          <input id="add-event" type="submit" value="Add Event" className="btn btn-primary"/>
        </form> 
      </div>
    )
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  centers: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  createEvent: PropTypes.func.isRequired,
  getCenterEvents: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  centers: state.center.centers,
  center: state.center.center,
  dates: state.event.disableDates,
  event: state.event,
})
AddEventForm.propTypes = propTypes;

export default connect(mapStateToProps,
  {
    createEvent,
    getCenterEvents,
    getCenterSelected
  })(AddEventForm);
