import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CenterSearch from '../centerSearch';
import DatePicker from '../datePicker';
import { modifyEvent } from '../../actions/eventActions';
import { modifyEventValidation } from '../../shared/eventValidations';
import TextField from '../../common/textField';
import { getCenterSelected } from '../../actions/centerActions';

@connect((store) => {
  return {
    user: store.auth.user,
    event: store.event,
    center: store.center,
  }
})

export default class EditEventForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      description,
      eventTitle,
      bookedDate,
      centerId,
      centerName
    } = props.event.event;
    this.state = {
      eventTitle: eventTitle || '',
      bookedDate: bookedDate || '',
      description: description || '',
      errors: {},
      isLoading: false,
      centerId: centerId || '',
      centerName: centerName || '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.search = this.search.bind(this);
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
      this.state.centerId = e.target.value;
      this.props.dispatch(getCenterSelected(e.target.value, 'tag'));
    }
  }
   componentWillReceiveProps(nextProps) {
    if (nextProps.event.event) {

      const {
        description,
        eventTitle,
        bookedDate,
        centerId,
        centerName
      } = nextProps.event.event;

      this.setState({
        eventTitle: eventTitle || '',
        bookedDate: bookedDate || '',
        description: description || '',
        centerName: centerName || '',
      });
    }
  }
  search() {
    this.props.dispatch(getCenters(this.state));
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(modifyEvent(this.props.event.event.id, this.state));
    }
  }

  isValid() {

    const {
      errors,
      isValid
    } = modifyEventValidation(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    if(this.props.event.status === 200) {
      alert(this.props.event.message);
      return <Redirect to="/dashboard" />;
    }
    const {
      eventTitle,
      bookedDate,
      description,
      errors,
      isLoading,
      centerId,
      centerName
    } = this.state;
    
    const showCenters = _.map(this.props.center.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    return (       
      <form id="edit-event-form" onSubmit={this.onSubmit}>
        <span className="help-block">{this.props.event.error}</span>
        <CenterSearch />
        <p className="subtitle">select your preferred event center</p>
        <div className="input-group">
          <span class="input-group-addon">
            <i className="fa fa-home"></i>
          </span>
          <select className="form-control" id="centerId" onChange={this.onChange}>            
            <option value="">{centerName}</option>
            {showCenters}
          </select>
        </div>

        <span className="help-block">{errors.bookedDate}</span>
          <div class="input-group">
            <span class="input-group-addon">
              <i className="fa fa-calendar"></i>
            </span>
            <input type="text" id="bookedDate" onChange={this.onChange} class="form-control" value={bookedDate}/>
          </div>

        <span className="help-block">{errors.eventTitle}</span>  
          <div class="input-group">
            <span class="input-group-addon">
              <i className="fa fa-microphone"></i>
            </span> 
            <input type="text" id="eventTitle" onChange={this.onChange} class="form-control" value={eventTitle}/>
          </div>

        <span className="help-block">{errors.description}</span>
        <p className="subtitle">describe your event in few words</p>
        <div className="form-group">
          <textarea className="form-control" id="description" onChange={this.onChange} value={description}></textarea>
        </div> 
        <input id="add-event" type="submit" value="save" className="btn btn-primary"/>
      </form> 
    );
  }
}


