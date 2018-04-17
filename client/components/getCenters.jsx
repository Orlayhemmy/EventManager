import React from 'react';
import { Link, Redirect, browserHistory } from 'react-router-dom';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { getCenters, getCenterSelected, centerSelected } from '../actions/centerActions';
import { getCenterEvents } from '../actions/eventActions';
import DeleteModal from './deleteModal';
import { getAdminActivity } from '../actions/adminActivityActions';


@connect((store) => {
  return {
    center: store.center,
    auth: store.auth,
    activity: store.activity,
  };
})

export default class DisplayCenters extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCenters());
    this.props.dispatch(getAdminActivity());
  }

  onClick(e) {
    const id = e.target.id;
    this.props.dispatch(getCenterSelected(id));
  }

  componentDidUpdate() {
    if (this.props.center.status === 200) {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
      });
    }
  }

  onDelete(e) {
    const center = {
      centerId: e.target.id,
      centerName: e.target.parentNode.id,
    }
    this.props.dispatch(centerSelected(center));
  }

  render() {
    const path = this.props.path;
    const { centers } = this.props.center;
    const { activities } = this.props.activity;
    let adminCenter;
    const recentActivity = _.map(activities,  (activity, index) => {
      const creationDate = activity.createdAt.replace(/-/g,'/').replace('Z','').replace('T',' ').slice(0, 16);
      return (
        <div className="row ml p-1" key={index}>
          <Link to="/view-center-event"><span><p className="activity-font mb-0 p-1" onClick={this.onClick.bind(this)} id={activity.centerId}>{activity.description}<br/>
          {creationDate}</p></span></Link>
        </div>
      )
    })
    if (isEmpty(this.props.center.centers)) {
      adminCenter = (
        <div className="emptyCenter img-fluid text-center ml-2 mt-2">
          <span><p className="display-3">No Center Found</p></span>
        </div>
      );
    } else {
      adminCenter = _.map(centers, (center, index) => {
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
    const guestCenterPage = _.map(centers, (center) => {
      return (
        <div className="row" id={center.id} key={center.id}>
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


