import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
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
import Modal from '../../../Modal/Container/DeleteModal';
import EditCenterForm from '../Form/EditCenterForm';
import CenterDetails from './ViewCenterDetails';
import { modifyCenterValidation } from '../../../../shared/centerValidations';
import uploadImage from '../../../../actions/imageAction';
import ApproveEvent from './ApproveEvent';
import BookedEvents from './BookedEvents';
import DeleteEvent from './DeleteEvent';
import showDiv from '../../../../shared/methods';
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
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    this.state.imageData = event.target.files[0]; //eslint-disable-line
    reader.onloadend = () => {
      this.setState({ image: reader.result });
    };
    reader.readAsDataURL(file);
  };
  /**
   * @memberof CenterDetailsContent
   * @method isValid
   * @param {object} e
   * @description it calls validation action on user data
   */
  isValid = e => {
    e.preventDefault();
    const { errors, isValid } = modifyCenterValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    this.onSubmit(e);
  };
  /**
   * @memberof CenterDetailsContent
   * @method onSubmit
   * @description it calls the user signin action
   * @param {object} e
   * @returns {void}
   */
  onSubmit = e => {
    const {
      location,
      centerName,
      facilities,
      capacity,
      cost,
      id,
      image,
      description
    } = this.state;
    e.preventDefault();
    if (this.initialState !== this.state) {
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

      if (this.initialState.image === image) {
        this.props.modifyCenter(this.state);
      } else {
        this.props.uploadImage(data, formData, 'modify-center');
      }
      this.showHiddenDiv(e);
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
    if (nextProps.centerData !== this.props.centerData.center) {
      const {
        centerName,
        location,
        facilities,
        description,
        capacity,
        imageUrl,
        id,
        cost,
        image
      } = nextProps.centerData.center;
      this.setState(
        {
          centerName: centerName || '',
          location: location || '',
          facilities: facilities.toString() || '',
          description: description || '',
          imageUrl: imageUrl || nextProps.centerData.url,
          capacity: capacity || '',
          id: id || '',
          cost: cost || '',
          image: image || ''
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
      toastr.success('Changes Applied');
      $('#eventStatus').modal('hide');
      $('#deleteModal').modal('hide');
      this.props.clearEventState();
    }
    if (this.props.centerData.status === 202) {
      toastr.success('Changes Applied');
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
    showDiv(e);
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
                isValid={this.isValid}
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
  centerData: PropTypes.object,
  eventState: PropTypes.object,
  getEventSelected: PropTypes.func.isRequired,
  modifyCenterEvent: PropTypes.func.isRequired,
  deleteCenterEvent: PropTypes.func.isRequired,
  getCenterEvents: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
  modifyCenter: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  clearEventState: PropTypes.func.isRequired,
  showDiv: PropTypes.func.isRequired
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
    clearEventState,
    showDiv
  }
)(CenterDetailsContent);
