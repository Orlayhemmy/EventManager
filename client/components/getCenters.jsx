import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, browserHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { getCenters, centerSelected, getCenterSelected } from '../actions/centerActions';
import DeleteModal from './deleteModal';
import { getAdminActivity } from '../actions/adminActivityActions';

/**
 * @description DisplayCenters form component
 */
export class DisplayCenters extends React.Component {
  
  /**
   * @memberof DisplayCenters
   * @method componentWillMount
   * @description it gets the necessary object before component is mounted
   */
  componentWillMount() {
    this.props.getCenters();
    this.props.getAdminActivity();
  }

  /**
   * @memberof DisplayCenters
   * @method componentDidUpdate
   * @description it gets the necessary object before component is mounted
   */
  componentDidUpdate() {
    if (this.props.eventCenter.status === 200) {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
      });
    }
  }

  /**
   * @memberof DisplayCenters
   * @method onClick
   * @description it fetches the details of the center to be viewed
   * @param {object} event
   * @returns {void}
   */
  onClick(e) {
    this.props.getCenterSelected(e.target.id);
  }

   /**
   * @memberof DisplayCenters
   * @method onDelete
   * @description it fetches the details of the center to be deleted
   * @param {object} event
   * @returns {void}
   */
  onDelete(e) {
    const center = {
      centerId: e.target.id,
      centerName: e.target.parentNode.id,
    }
    this.props.centerSelected(center);
  }

    /**
   * @memberof DisplayCenters
   * @method render
   * @description it renders the component
   * @returns the HTML of displaycenters component
   */
  render() {
    const path = this.props.path;
    const { centers } = this.props.eventCenter;
    const { activities } = this.props.adminActivity;
    let adminCenter;
    const recentActivity = activities.map((activity, index) => {
      const creationDate = activity.createdAt.replace(/-/g,'/').replace('Z','').replace('T',' ').slice(0, 16);
      return (
        <div className="row ml p-1" key={index}>
          <Link to="/view-center-event"><span><p className="activity-font mb-0 p-1">{activity.description}<br/>
          {creationDate}</p></span></Link>
        </div>
      )
    })
    if (isEmpty(this.props.eventCenter.centers)) {
      adminCenter = (
        <div className="emptyCenter img-fluid text-center ml-2 mt-2">
          <span><p className="display-3">No Center Found</p></span>
        </div>
      );
    } else {
      adminCenter = centers.map((center, index) => {
        return (
          <div className="row bw" key={index}>
            <div className="col-lg-4 col-md-12 col-sm-12 text-center">
              <img className="img-fluid" src={center.imageUrl}/>
            </div>
            <div className="col-8 col-md-8 col-sm-12 pl-4">
  
                <h2 className="media-heading text-center">
                  <Link to="/view-center-event"><span onClick={this.onClick.bind(this)} id={center.id}>{center.centerName}</span></Link>
                </h2>
  
                  <h3><span>Location: </span> {center.location}</h3>
  
  
                  <h3><span>capacity: </span> {center.capacity}</h3>
   
  
                  <h3><span>facilities: </span> {center.facilities}</h3>
  
  
                  <h3><span>description: </span> {center.description}</h3>
  
            </div>
            <span onClick={this.onDelete.bind(this)} className="trash p-2" data-toggle="modal" data-target="#deleteModal" id={center.centerName}><i id={center.id} className="fa fa-trash trash"></i></span>      
          </div>
        )
      }); 
    }
    
    const adminCenterPage = (
      <div className="row">
        <div className="col-lg-9">
          {adminCenter}
        </div>
        <div className="col-lg-3">
          {recentActivity}
        </div>
      </div>
    )
    const guestCenterPage = centers.map((center, index) => {
      return (
        <div className="row" id={center.id} key={index}>
          <div className="col-lg-4 col-md-12 col-sm-12 text-center">

              <img className="img" src={center.imageUrl}/>

          </div>
          <div className="col-8 col-md-8 pl-4">
              <h2 className="media-heading text-center">{center.centerName}</h2>

                <h3><span>Location: </span> {center.location}</h3>


                <h3><span>capacity: </span> {center.capacity}</h3>
 

                <h3><span>facilities: </span> {center.facilities}</h3>


                <h3><span>description: </span> {center.description}</h3>
          </div>
        </div>
      )
    });

    return (
      <div>
        { this.props.auth.user.isAdmin ? adminCenterPage : guestCenterPage }
        <DeleteModal path={path}/>
      </div>
    );
  }
}
const propTypes = {
  auth: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  adminActivity: PropTypes.object.isRequired,
  getAdminActivity: PropTypes.func.isRequired,
  centerSelected: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  getCenterSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  eventCenter: state.center,
  auth: state.auth,
  adminActivity: state.adminActivity,
});

DisplayCenters.propTypes = propTypes;

export default connect(mapStateToProps, 
  {centerSelected, getAdminActivity, getCenters, getCenterSelected})(DisplayCenters);