import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import CenterSearch from '../../../Common/Search';


/**
 * @description EditEventForm component
 */
export class EditEventForm extends React.Component {
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
    } = this.props.eventState;
    const showCenters = this.props.eventCenter.centers.map((center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    return (       
      <form id="edit-event-form" onSubmit={this.props.onFormSubmit}>
        <span className="help-block">{this.props.userEvent.error}</span>
        <CenterSearch
          criteria={this.props.criteria}
          search={this.props.search}
          onChange={this.props.onChange}
        />
        <p className="subtitle">select your preferred event center</p>
        <div className="input-group">
          <span class="input-group-addon search-icon">
            <i className="fa fa-home"></i>
          </span>
          <select className="form-control" id="centerId" onChange={this.props.onFormChange}>            
            <option value="">{centerName}</option>
            {showCenters}
          </select>
        </div>

        <span className="help-block">{errors.bookedDate}</span>
          <div class="input-group">
            <span class="input-group-addon search-icon">
              <i className="fa fa-calendar"></i>
            </span>
            <input type="text" id="bookedDate" onChange={this.props.onFormChange} class="form-control" value={bookedDate}/>
          </div>

        <span className="help-block">{errors.eventTitle}</span>  
          <div class="input-group">
            <span class="input-group-addon search-icon">
              <i className="fa fa-microphone"></i>
            </span> 
            <input type="text" id="eventTitle" onChange={this.props.onFormChange} class="form-control" value={eventTitle}/>
          </div>

        <span className="help-block">{errors.description}</span>
        <p className="subtitle">describe your event in few words</p>
        <div className="form-group">
          <textarea className="form-control" id="description" onChange={this.props.onFormChange} value={description}></textarea>
        </div> 
        <input id="add-event" type="submit" value="save" className="btn btn-primary"/>
      </form> 
    );
  }
}

const propTypes = {
  user: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userEvent: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth,
  eventCenter: state.center,
  userEvent: state.event,
})
EditEventForm.propTypes = propTypes;

export default connect(mapStateToProps, {})(EditEventForm);