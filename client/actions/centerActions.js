import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setAdminActivity } from './adminActivityActions';
import { getCenterEvents } from './eventActions';
import * as actionTypes from './types';

/**
 * @returns {object} clear state
 */
export function clearState() {
  return dispatch => dispatch({ type: actionTypes.CLEAR_CENTER_STATE });
}

/**
 * @param {object} data
 * @returns {object} Get centers
 */
export function getCenters(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CENTERS });
    let query;
    if (data) {
      query = axios.get('/api/v1/centers', {
        params: {
          location: data.location,
          facilities: data.facilities,
          capacity: data.capacity,
          capacityType: data.capacityType,
          btwValue: data.btwValue,
        },
      });
    } else {
      query = axios.get('/api/v1/centers');
    }
    query.then((response) => {
      console.log('@@@@$$%%%%%%%%%%%______@@@@@@@@@@')
      dispatch({ type: actionTypes.GET_CENTERS_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.GET_CENTERS_FAIL, payload: err.response.data });
    });
  };
}

/**
 * @param {object} centerData
 * @returns {object} current center
 */
export function setCurrentCenter(centerData) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_CURRENT_CENTER, payload: centerData });
    dispatch(getCenterEvents(centerData.center.id));
  };
}

/**
 * @param {object} center
 * @returns {object} center information
 */
export function centerSelected(center) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CENTER_SELECTED, payload: center });
  };
}
/**
 * @param {object} id
 * @param {object} tag
 * @returns {object} current center
 */
export function getCenterSelected(id, tag) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CENTER });
    return axios.get(`/api/v1/centers/${id}`).then((response) => {
      dispatch({ type: actionTypes.GET_CENTER_SUCCESS, payload: response.data });
      if (!tag) {
        const { token } = response.data;
        localStorage.setItem('center', token);
        dispatch(setCurrentCenter(jwt.decode(token)));
      }
    }).catch((err) => {
      dispatch({ type: actionTypes.GET_CENTER_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} data
 * @returns {object} new center information
 */
export function addCenter(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_CENTER });
    return axios.post('/api/v1/centers', data).then((response) => {
      dispatch({ type: actionTypes.ADD_CENTER_SUCCESS, payload: response.data });
      // const { center } = response.data;
      // dispatch(setAdminActivity(center));
    }).catch((err) => {
      dispatch({ type: actionTypes.ADD_CENTER_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} data
 * @param {object} centerId
 * @returns {object} success or failure
 */
export function modifyCenter(data, centerId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_CENTER });
    return axios.put(`/api/v1/centers/${centerId}`, data).then((response) => {
      dispatch({ type: actionTypes.MODIFY_CENTER_SUCCESS, payload: response.data });
      dispatch(getCenterSelected(centerId));
    }).catch((err) => {
      dispatch({ type: actionTypes.MODIFY_CENTER_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} data
 * @returns {object} url of image uploaded
 */
export function uploadImage(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_IMAGE });
    delete axios.defaults.headers.common['x-access-token'];
    return axios.post('https://api.cloudinary.com/v1_1/kalel/image/upload', data)
      .then((response) => {
        dispatch({ type: actionTypes.ADD_IMAGE_SUCCESS, payload: response.data.secure_url });
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
      }).catch((err) => {
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        dispatch({ type: actionTypes.ADD_IMAGE_FAILS, payload: err.response.data });
      });
  };
}

/**
 * @param {object} id
 * @returns {object} delete center
 */
export function deleteCenter(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CENTER });
    return axios.delete(`/api/v1/centers/${id}`).then((response) => {
      dispatch({ type: actionTypes.DELETE_CENTER_SUCCESS, payload: response.data });
      dispatch(getCenters());
    }).catch((err) => {
      dispatch({ type: actionTypes.DELETE_CENTER_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} id
 * @returns {object} center status
 */
export function centerStatus(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CENTER_STATUS_UPDATE });
    return axios.put(`/api/v1/centerStatus/${id}`).then((response) => {
      dispatch({ type: actionTypes.CENTER_STATUS_UPDATE_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.CENTER_STATUS_UPDATE_FAILS, payload: err.response.data });
    });
  };
}
