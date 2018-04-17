import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CenterSearch from '../centerSearch';
import { getCenters, getCenterSelected } from '../../actions/centerActions';
import { createEvent, getCenterEvents , modifyEvent } from '../../actions/eventActions';
import TextField from '../../common/textField';
import DatePicker from '../datePicker';
import { addEventValidation, modifyEventValidation } from '../../shared/eventValidations';



@connect((store) => {
  return {
    auth: store.auth,
    centers: store.center.centers,
    center: store.center.center,
    dates: store.event.disableDates,
    event: store.event,
  }
})

export default class AddEventForm extends React.Component {
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
    this.search = this.search.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
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

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    
    if (e.target.id === 'centerId') {
      this.setState({
        centerId: e.target.value
      });
      this.props.dispatch(getCenterSelected(e.target.value, 'tag'));
    }
  }

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

  search() {
    this.props.dispatch(getCenters(this.state));
  }

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
    if (this.props.path === '/modify-event') {
      const { event } = this.props.event;
      if (isEmpty(this.state.bookedDate)) {
        this.state.bookedDate = event.bookedDate;
      }
      if (isEmpty(this.state.centerId)) {
        this.state.centerId = event.centerId;
      }
      if (isEmpty(this.state.eventTitle)) {
        this.state.eventTitle = event.eventTitle;
      }
      this.state.isApproved = event.isApproved;
        if (!isEmpty(this.state.description) || !isEmpty(this.state.eventTitle)
      || !isEmpty(this.state.bookedDate) || !isEmpty(this.state.centerId)) {
        if (this.isValid()) {
          this.props.dispatch(modifyEvent(this.props.event.event.id, this.state. this.state.centerId));
        }
      }      
    } else {
      if (this.isValid()) {
        this.props.dispatch(createEvent(data));
      }
    }
  }

  render() {
    const { event } = this.props.event;
    let buttonValue;
    if (this.props.path === '/modify-event') {
      buttonValue = "save changes";
    } else {
      buttonValue = "add event";
    }

    let titleHolder, dateHolder, descriptionHolder;
      titleHolder = "Give your event a title";
      dateHolder = "Choose a date for your event";
      descriptionHolder = "Write few things about the event";

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
              <input type="text" id="bookedDate" onBlur={this.onChange} class="form-control" value={this.state.bookedDate} placeholder={dateHolder}/>
            </div>

          <span className="help-block">{errors.eventTitle}</span>  
            <div class="input-group">
              <span class="input-group-addon">
                <i className="fa fa-microphone"></i>
              </span> 
              <input type="text" id="eventTitle" onChange={this.onChange} class="form-control" value={this.state.eventTitle} placeholder={titleHolder}/>
            </div>

          <span className="help-block">{errors.description}</span>
          <p className="subtitle">describe your event in few words</p>
          <div className="form-group">
            <textarea className="form-control" id="description"
          onChange={this.onChange} placeholder={descriptionHolder}></textarea>
          </div> 
          <input id="add-event" type="submit" value={buttonValue} className="btn btn-primary"/>
        </form> 
      </div>
    )
  }
}
