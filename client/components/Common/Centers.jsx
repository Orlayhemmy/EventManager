import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, browserHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import DeleteModal from '../Modal/Container/deleteModal';
import { getAdminActivity } from '../../actions/adminActivityActions';
import { getCenters } from '../../actions/centerActions';

/**
 * @description DisplayCenters form component
 */
export class DisplayCenters extends React.Component {
  state = {
    centerId: '',
    centerName: ''
  };

  onSelect = e => {
    this.setState({
      centerId: e.target.id,
      centerName: e.target.parentNode.id
    });
  };
  /**
   * @memberof DisplayCenters
   * @method componentWillMount
   * @description it gets the necessary object before component is mounted
   */
  componentWillMount() {
    const { searchState } = this.props;
    this.props.getCenters(searchState, searchState.counter);
    this.props.getAdminActivity();
  }

  /**
   * @memberof DisplayCenters
   * @method componentDidUpdate
   * @description it gets the necessary object before component is mounted
   */
  componentDidUpdate() {
    if (this.props.eventCenter.status === 200) {
      swal('Center deleted successfully');
      $(document).ready(function() {
        $('#deleteModal').modal('hide');
      });
    }
  }

  /**
   * @memberof DisplayCenters
   * @method render
   * @description it renders the component
   * @returns the HTML of displaycenters component
   */

  render() {
    const { path } = this.props;
    const { centers } = this.props.eventCenter;
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
              className="activity-font mb-0 p-1 fw"
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
      adminCenter = centers.map((center, index) => {
        return (
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

              <h3>
                <span>Location: </span> {center.location}
              </h3>

              <h3>
                <span>capacity: </span> {center.capacity}
              </h3>

              <h3>
                <span>facilities: </span> {center.facilities}
              </h3>

              <h3>
                <span>cost: </span> {center.cost}
              </h3>

              <h3>
                <span>description: </span> {center.description}
              </h3>
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
        );
      });
    }

    const adminCenterPage = (
      <div className="section">
        <div className="row wc">
          <div className="col-lg-8 mr-3">
            {this.props.counter > 0 ? (
              <div className="pagination-icon">
                <i
                  className="fa fa-chevron-up icon"
                  id="previous"
                  onClick={this.props.nextCenters}
                />
                <p class="tooltiptext">Previous Centers</p>
              </div>
            ) : (
              ''
            )}
            {this.props.eventCenter.isNext ? (
              <div className="pagination-icon mt-y1-5">
                <i
                  className="fa fa-chevron-down icon"
                  id="next"
                  onClick={this.props.nextCenters}
                />
                <p class="tooltiptext">Next Centers</p>
              </div>
            ) : (
              ''
            )}
            {adminCenter}
          </div>
          <div className="col-lg-3 card p-2 ho">
            <h2>Notifications</h2>
            {recentActivity}
          </div>
        </div>
      </div>
    );
    const guestCenters = centers.map((center, index) => {
      return (
        <div className="row card reverse p-4" id={center.id} key={index}>
          <div className="col-lg-4 col-md-12 col-sm-12 text-center">
            <img className="img" src={center.imageUrl} />
          </div>
          <div className="col-8 col-md-8 pl-4">
            <h2 className="media-heading text-center">{center.centerName}</h2>

            <h3>
              <span>Location: </span> {center.location}
            </h3>

            <h3>
              <span>capacity: </span> {center.capacity}
            </h3>

            <h3>
              <span>facilities: </span> {center.facilities}
            </h3>

            <h3>
              <span>Cost: </span> {center.cost}
            </h3>

            <h3>
              <span>description: </span> {center.description}
            </h3>
          </div>
        </div>
      );
    });

    const guestCenterPage = (
      <div>
        {this.props.counter > 0 ? (
          <div className="pagination-icon">
            <i
              className="fa fa-chevron-up icon"
              id="previous"
              onClick={this.props.nextCenters}
              data-toggle="tooltip"
              data-placement="right"
              title="Previous Centers"
            />
          </div>
        ) : (
          ''
        )}
        {centers.length > 4 ? (
          <div className="pagination-icon mt-y1-5">
            <i
              className="fa fa-chevron-down icon"
              id="next"
              onClick={this.props.nextCenters}
            />
            <p class="tooltiptext">Filter Centers</p>
          </div>
        ) : (
          ''
        )}
        {guestCenters}
      </div>
    );
    return (
      <div>
        <div className="search-icon" onClick={this.props.searchNav}>
          <i className="fa fa-search" />
          <p class="tooltiptext">Filter Centers</p>
        </div>
        {this.props.auth.user.isAdmin ? adminCenterPage : guestCenterPage}
        <DeleteModal path={path} centerProps={this.state} />
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  adminActivity: PropTypes.object.isRequired,
  getAdminActivity: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  eventCenter: state.center,
  auth: state.auth,
  adminActivity: state.adminActivity
});

DisplayCenters.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    getAdminActivity,
    getCenters
  }
)(DisplayCenters);
