import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import {
  getCenterSelected,
  modifyCenter
} from '../../../../actions/centerActions';
import {
  getEventSelected,
  modifyCenterEvent,
  deleteCenterEvent,
  getCenterEvents,
  clearEventState
} from '../../../../actions/eventActions';
import Modal from '../../../Modal/Container/deleteModal';
import EditCenterForm from '../Form/editCenterForm';
import CenterDetails from './viewCenterDetails';
import { modifyCenterValidation } from '../../../../shared/centerValidations';
import uploadImage from '../../../../actions/imageAction';
import ApproveEvent from './approveEvent';
import BookedEvents from './bookedEvents';
import DeleteEvent from './deleteEvent';

/**
 * @description CenterDetailsContent form component
 */
export class CenterDetailsContent extends React.Component {
  /**
   * @memberof CenterDetailsContent
   * @description it creates an instance of centerdetailscontent
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const {
      centerName,
      location,
      description,
      capacity,
      imageUrl,
      facilities,
      id,
      cost
    } = props.centerData.center;

    this.state = {
      centerName: centerName || '',
      location: location || '',
      facilities: facilities.join() || '',
      description: description || '',
      capacity: capacity || '',
      errors: '',
      event: '',
      imageUrl: imageUrl || '',
      id: id || '',
      cost: cost || '',
      decision: ''
    };
  }
  componentDidMount() {
    this.props.getCenterSelected();
    this.props.getCenterEvents();
  }
  /**
   * @memberof CenterDetailsContent
   * @method onChange
   * @description it sets user input to state
   * @param {object} e
   */
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  /**
   * @memberof CenterForm
   * @method showImage
   * @description it sets user input to state
   * @param {object} event
   */
  showImage = event => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.state.imageData = event.target.files[0]; // eslint-disable-line
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  /**
   * @memberof Profile
   * @method isValid
   * @description it calls validation action on user data
   * @returns true or false
   */
  isValid() {
    const { errors, isValid } = modifyCenterValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @memberof CenterDetailsContent
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} e
   * @returns {void}
   */
  onSubmit = e => {
    const {
      location, centerName, facilities, capacity, cost, id, image, description
    } = this.state;
    e.preventDefault();
    if (this.isValid()) {
      const formData = new FormData();
      formData.append('file', this.state.imageData);
      formData.append('upload_preset', 'u8asaoka');
      const data = {
        centerName,
        location,
        description,
        facilities,
        capacity,
        cost,
        id
      };
      if (this.initialState !== this.state) {
        if (this.initialState.image === image) {
          this.props.modifyCenter(this.state);
        } else {
          this.props.uploadImage(data, formData, 'modify-center');
        }
        this.showHiddenDiv(e);
      }
    }
  };
  /**
   * @memberof CenterDetailsContent
   * @method componentWillReceiveProps
   * @description it updates the state when new props are recieved
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.centerData !== this.props.center) {
      const {
        centerName,
        location,
        facilities,
        description,
        capacity,
        imageUrl,
        id,
        cost
      } = nextProps.centerData.center;
      this.setState(
        {
          centerName: centerName || '',
          location: location || '',
          facilities: facilities.join() || '',
          description: description || '',
          imageUrl: imageUrl || nextProps.centerData.url,
          capacity: capacity || '',
          id: id || '',
          cost: cost || ''
        },
        () => {
          this.initialState = this.state;
        }
      );
    }
  }
  /**
   * @memberof CenterDetailsContent
   * @method componentDidUpdate
   * @description it checks some conditions when component updates
   * @returns {void}
   */
  componentDidUpdate() {
    const { status } = this.props.eventState;
    if (status === 201 || status === 202 || status === 200) {
      swal('Changes Applied');
      $('#eventStatus').modal('hide');
      $('#deleteModal').modal('hide');
      this.props.clearEventState();
    }
    if (this.props.centerData.status === 202) {
      swal('Changes Applied');
    }
  }
  /**
   * @memberof CenterDetailsContent
   * @method onClick
   * @description it calls the get event action
   * @param {object} e
   * @returns {void}
   */
  onClick = e => {
    this.state.eventId = e.target.id;
    this.setState({
      decision: e.target.parentNode.id
    });
  };

  /**
   * @memberof CenterDetailsContent
   * @method onApprove
   * @description it calls an action when changes is made to events
   * @param {object} e
   * @returns {void}
   */
  onApprove = e => {
    const { eventTitle } = this.props.eventState.event;
    const { eventId } = this.state;
    const centerId = this.props.centerData.center.id;
    if (e.target.id === 'approve') {
      const data = {
        centerId,
        isApproved: true,
        id: eventId
      };
      this.props.modifyCenterEvent(data);
    } else {
      const data = {
        eventTitle,
        centerId,
        id: eventId,
        text: 'disapproved'
      };
      this.props.deleteCenterEvent(data);
      $('#deleteModal').modal('hide');
    }
  };
  /**
   * @memberof CenterDetailsContent
   * @method showHiddenDiv
   * @description it toggle's divs display
   * @param {object} e
   * @returns {void}
   */
  showHiddenDiv = e => {
    const id = e.target.dataset.toggleId;
    if (!id) return;
    const div = document.getElementById(id);
    div.hidden = !div.hidden;
    if (id === 'editCenterDetails') {
      const div2 = document.getElementById('centerDetails');
      if (!div.hidden) {
        div2.style.display = 'none';
        return;
      }
      div2.style.display = '';
    }
  };

  /**
   * @memberof CenterDetailsContent
   * @method render
   * @description it renders the component
   * @returns the HTML of centerdetails
   */
  render() {
    const { image, imageUrl, decision } = this.state;
    const { path } = this.props;
    const { events } = this.props.eventState;
    const content =
      decision !== undefined && this.state.decision === 'approve' ? (
        <ApproveEvent
          showHiddenDiv={this.showHiddenDiv}
          onChange={this.onChange}
          onApprove={this.onApprove}
          onClick={this.onClick}
          state={this.state}
        />
      ) : (
        <DeleteEvent
          state={this.state}
          showHiddenDiv={this.showHiddenDiv}
          onChange={this.onChange}
          onApprove={this.onApprove}
          onClick={this.onClick}
        />
      );

    return (
      <div id="center-event">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 card bb text-center pt-4 pb-4">
              <CenterDetails
                centerState={this.state}
                showHiddenDiv={this.showHiddenDiv}
              />
              <EditCenterForm
                path={this.props.path}
                imageUrl={image || imageUrl}
                centerState={this.state}
                showImage={this.showImage}
                onSubmit={this.onSubmit}
                showHiddenDiv={this.showHiddenDiv}
                onChange={this.onChange}
              />
            </div>
            <BookedEvents onClick={this.onClick} eventState={events} />
            <Modal path={path} content={content} />
          </div>
        </div>
      </div>
    );
  }
}
const propTypes = {
  centerData: PropTypes.object.isRequired,
  eventState: PropTypes.object.isRequired,
  getEventSelected: PropTypes.func.isRequired,
  modifyCenterEvent: PropTypes.func.isRequired,
  deleteCenterEvent: PropTypes.func.isRequired,
  getCenterEvents: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  modifyCenter: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  clearEventState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  centerData: state.center,
  eventState: state.event
});

CenterDetailsContent.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    getEventSelected,
    modifyCenterEvent,
    deleteCenterEvent,
    getCenterEvents,
    getCenterSelected,
    modifyCenter,
    uploadImage,
    clearEventState
  }
)(CenterDetailsContent);
