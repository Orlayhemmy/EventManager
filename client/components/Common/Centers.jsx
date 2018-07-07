import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import DeleteContent from './Delete';
import DeleteModal from '../Modal/Container/deleteModal';
import { getAdminActivity } from '../../actions/adminActivityActions';
import {
  getCenters,
  deleteCenter,
  getNextCenters
} from '../../actions/centerActions';
import { centerIntro } from './intro';
import Tour from './Tour';
import { checkPaginationValue } from '../../shared/centerValidations';

/**
 * @description DisplayCenters form component
 */
export class DisplayCenters extends React.Component {
  state = {
    centerId: '',
    centerName: '',
    goto: '',
    error: {}
  };

  goTo = () => {
    if (this.isValid()) {
      this.props.nextCenters('', this.state.goto);
      document.getElementById('inner-item-div').style.width = '0px';
    }
  };

  /**
   * @memberof DisplayCenters
   * @method onChange
   * @param {object} e
   * @returns {void}
   */
  onChange = e => {
    this.setState({
      goto: Number(e.target.value)
    });
  };

  /**
   * @memberof DisplayCenters
   * @method IsValid
   * @param {object} e
   * @returns {boolean} true or false
   */
  isValid = () => {
    const { error, isValid } = checkPaginationValue(
      this.state,
      this.props.eventCenter.pages
    );
    if (error) swal(error.goto);
    if (!isValid) {
      this.setState({ error });
    }
    return isValid;
  };

  showHidden = () => {
    document.getElementById('inner-item-div').style.width = '100px';
  };

  /**
   * @memberof DisplayCenters
   * @method onSelect
   * @param {object} e
   * @returns {void}
   */
  onSelect = e => {
    this.setState({
      centerId: e.target.id,
      centerName: e.target.parentNode.id
    });
  };
  /**
   * @memberof DisplayCenters
   * @method componentDidMount
   * @description it gets the necessary object before component is mounted
   */
  componentDidMount() {
    const {
      searchState,
      userEvent: { eventBookedCount }
    } = this.props;
    this.props.getCenters(searchState, searchState.counter);
    this.props.getAdminActivity();
    if (eventBookedCount === 0 || eventBookedCount === undefined) {
      centerIntro();
    }
  }

  /**
   * @memberof DisplayCenters
   * @method componentDidUpdate
   * @description it gets the necessary object before component is mounted
   */
  componentDidUpdate() {
    if (this.props.eventCenter.status === 200) {
      swal('Center deleted successfully');
      $('#deleteModal').modal('hide');
    }
  }

  onDelete = () => {
    this.props.deleteCenter(this.state.centerId);
    $('#deleteModal').modal('hide');
  };

  onCancel = () => {
    $('#deleteModal').modal('hide');
  };

  /**
   * @memberof DisplayCenters
   * @method render
   * @description it renders the component
   * @returns the HTML of displaycenters component
   */

  render() {
    const { paginatedCenters } = this.props.eventCenter;
    const { activities } = this.props.adminActivity;
    let adminCenter;
    const recentActivity = activities.map((activity, index) => {
      const creationDate = activity.createdAt
        .replace(/-/g, '/')
        .replace('Z', '')
        .replace('T', ' ')
        .slice(0, 16);
      return (
        <div key={index} className="main-color-bg p-2 mb-1">
          <Link to="/view-center-event">
            <p
              className="activity-font mb-0 p-1"
              onClick={this.showCenter}
              id={activity.centerId}
            >
              {activity.description}
              <br />
              {creationDate}
            </p>
          </Link>
        </div>
      );
    });
    if (isEmpty(this.props.eventCenter.centers)) {
      adminCenter = (
        <div className="emptyCenter img-fluid text-center ml-2 mt-2">
          <span>
            <p className="display-3">No Center Found</p>
          </span>
        </div>
      );
    } else {
      adminCenter = paginatedCenters.map((center, index) => (
        <div className="row card reverse p-4" key={index}>
          <div className="col-lg-4 col-md-12 col-sm-12 text-center">
            <img className="img-fluid" src={center.imageUrl} />
          </div>
          <div className="col-8 col-md-8 col-sm-12 pl-4">
            <h2 className="media-heading text-center">
              <Link to="/view-center-event">
                <span onClick={this.props.showCenter} id={center.id}>
                  {center.centerName}
                </span>
              </Link>
            </h2>
            <span>Location: </span>
            <p>{center.location}</p>
            <span>capacity: </span>
            <p>{center.capacity}</p>
            <span>facilities: </span>
            <p>{center.facilities}</p>
            <span>cost: </span>
            <p>{center.cost}</p>
            <span>description: </span>
            <p>{center.description}</p>
          </div>
          <span
            className="trash p-2"
            data-toggle="modal"
            data-target="#deleteModal"
            id={center.centerName}
            onClick={this.onSelect}
          >
            <i id={center.id} className="fa fa-trash trash" />
          </span>
        </div>
      ));
    }

    const adminCenterPage = (
      <div className="section">
        <div className="row wc">
          <div className="col-lg-8 mr-3">{adminCenter}</div>
          <div className="col-lg-3 card p-2 ho">
            <h2>Notifications</h2>
            {recentActivity}
          </div>
        </div>
      </div>
    );
    const guestCenters = paginatedCenters.map((center, index) => (
      <div className="row card reverse p-4" id={center.id} key={index}>
        <div className="col-lg-4 col-md-12 col-sm-12 text-center">
          <img className="img" src={center.imageUrl} />
        </div>
        <div className="col-8 col-md-8 pl-4">
          <h2 className="media-heading text-center">{center.centerName}</h2>
          <span>Location: </span>
          <p>{center.location}</p>
          <span>capacity: </span>
          <p>{center.capacity}</p>
          <span>facilities: </span>
          <p>{center.facilities}</p>
          <span>Cost: </span>
          <p>{center.cost}</p>
          <span>description: </span>
          <p>{center.description}</p>
        </div>
      </div>
    ));

    const guestCenterPage = <div>{guestCenters}</div>;
    const {
      counter,
      eventCenter: { pages }
    } = this.props;

    return (
      <div>
        <div
          className="search-icon"
          id="search-centers"
          onClick={this.props.searchNav}
        >
          <i className="fa fa-search" />
          <p class="tooltiptext">Filter Centers</p>
        </div>
        <div class="pagination-container" id="pagination-container">
          <div>
            {' '}
            {counter > 0 ? (
              <div className="pagination-icon mb-1">
                <i
                  className="fa fa-chevron-up icon"
                  id="previous"
                  onClick={this.props.nextCenters}
                />
                <p class="tooltiptext">
                  {counter}/{pages}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
          <div class="inner-div">
            <div id="goto-page" onClick={this.showHidden}>
              <input
                type="text"
                value={counter + 1}
                id="current-page"
                className="form-control"
                disabled
              />
            </div>
            <div class="inner-item-div" id="inner-item-div">
              <div class="inner-item">
                <input
                  type="text"
                  value={this.state.goto}
                  id="goto"
                  onChange={this.onChange}
                  className="form-control w-1 ml-1"
                />
              </div>
              <div class="inner-item">
                <input
                  type="button"
                  className="btn btn-success page-btn ml-1"
                  value="Go"
                  onClick={this.goTo}
                />
              </div>
            </div>
          </div>
          <div>
            {' '}
            {this.props.eventCenter.isNext ? (
              <div className="pagination-icon mt-2">
                <i
                  className="fa fa-chevron-down icon"
                  id="next"
                  onClick={this.props.nextCenters}
                />
                <p class="tooltiptext">
                  {counter + 2}/{pages}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div id="centers">
          {this.props.auth.user.isAdmin ? adminCenterPage : guestCenterPage}
        </div>
        <Tour tour={centerIntro} />
        <DeleteModal
          content={
            <DeleteContent
              onDelete={this.onDelete}
              title={this.state.centerName}
              onCancel={this.onCancel}
            />
          }
        />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  adminActivity: PropTypes.object.isRequired,
  getAdminActivity: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  deleteCenter: PropTypes.func.isRequired,
  getNextCenters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  eventCenter: state.center,
  auth: state.auth,
  adminActivity: state.adminActivity,
  userEvent: state.event
});

DisplayCenters.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    getAdminActivity,
    getCenters,
    deleteCenter,
    getNextCenters
  }
)(DisplayCenters);
