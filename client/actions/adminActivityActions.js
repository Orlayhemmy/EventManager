import axios from 'axios';
import * as actionTypes from './types';

/**
 * @param {object} data
 * @returns {object} Get Admin Activities
 */
export function getAdminActivity() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ACTIVITIES });
    return axios.get('api/v1/adminactivity').then((response) => {
      dispatch({ type: actionTypes.GET_ACTIVITIES_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.GET_ACTIVITIES_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} data
 * @returns {object} Set Admin Activities
 */
export function setAdminActivity(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_ADMINACTIVITY });
    return axios.post('api/v1/activity', data).then((response) => {
      dispatch({ type: actionTypes.SET_ADMINACTIVITY_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.SET_ADMINACTIVITY_FAILS, payload: err.response.data });
    });
  };
}
