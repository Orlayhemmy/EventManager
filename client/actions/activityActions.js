import axios from 'axios';
import * as actionTypes from './types';

/**
 * @returns {object} User Activities
 */
export function getActivity() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ACTIVITIES });
    return axios
      .get('api/v1/activity')
      .then((response) => {
        dispatch({
          type: actionTypes.GET_ACTIVITIES_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_ACTIVITIES_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} id
 * @returns {object} delete Activities
 */
export function deleteActivity(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ACTIVITY });
    return axios
      .delete(`api/v1/activity/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.DELETE_ACTIVITY_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_ACTIVITY_FAILS,
          payload: err.response.data.data
        });
      });
  };
}
