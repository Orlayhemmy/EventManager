import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import CenterSearch from '../centerSearch';
import { modifyEvent } from '../../actions/eventActions';
import { modifyEventValidation } from '../../shared/eventValidations';
import TextField from '../../common/textField';
import { getCenterSelected } from '../../actions/centerActions';

/**
 * @description EditEventForm component
 */
export class EditEventForm extends React.Component {
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
        centerId,
        centerName
      } = nextProps.userEvent.event;

      this.setState({
        eventTitle: eventTitle || '',
        bookedDate: bookedDate || '',
        description: description || '',
        centerName: centerName || '',
        centerId: centerId || '',
      });
    }
  }
  /**
   * @memberof EditEventForm
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
  * @memberof EditEventForm
  * @method isValid
  * @description it calls validation action on user data
  * @param {void}
  * @returns true or false
  */
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

  /**
   * @memberof EditEventForm
   * @method render
   * @description it renders the component
   * @returns the HTML of editeventform
   */
  render() {
    if(this.props.userEvent.status === 200) {
      swal(this.props.userEvent.message);
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
    const showCenters = this.props.eventCenter.centers.map((center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    return (       
      <form id="edit-event-form" onSubmit={this.onSubmit}>
        <span className="help-block">{this.props.userEvent.error}</span>
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

const propTypes = {
  user: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired,
  modifyEvent: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.auth,
  eventCenter: state.center,
  userEvent: state.event,
})
EditEventForm.propTypes = propTypes;

export default connect(mapStateToProps,
  {
    modifyEvent,
    getCenterSelected
  })(EditEventForm);