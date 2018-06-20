import axios from 'axios';
import { getCenterEvents } from './eventActions';
import * as actionTypes from './types';

/**
 * @returns {object} clear state
 */
export function clearCenterStorage() {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_CENTER_STATE });
    if (localStorage.getItem('center')) {
      localStorage.removeItem('center');
    }
  };
}

/**
 * @param {object} centerInfo
 * @param {object} page
 * @returns {object} Get centers
 */
export function getCenters(centerInfo, page) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CENTERS });
    let query;
    if (centerInfo) {
      query = axios.get('/api/v1/centers', {
        params: {
          location: centerInfo.location,
          facilities: centerInfo.facilities,
          capacity: centerInfo.capacity,
          capacityType: centerInfo.capacityType,
          btwValue: centerInfo.btwValue,
          page
        }
      });
    } else {
      query = axios.get('/api/v1/centers', {
        params: {
          page
        }
      });
    }
    return query
      .then((response) => {
        const { data } = response;
        dispatch({
          type: actionTypes.GET_CENTERS_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.GET_CENTERS_FAIL,
          payload: data
        });
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
 * @param {object} center
 * @returns {void}
 */
export function viewCenterSelected(center) {
  return (dispatch) => {
    dispatch({ type: 'CENTER' });
    localStorage.setItem('centerId', center);
  };
}
/**
 * @param {object} centerInfo
 * @returns {object} current center
 */
export function getCenterSelected(centerInfo) {
  let id;
  if (centerInfo) {
    id = centerInfo;
  } else {
    id = localStorage.getItem('centerId');
  }
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CENTER });
    return axios
      .get(`/api/v1/centers/${id}`)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: actionTypes.GET_CENTER_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.GET_CENTER_FAILS,
          payload: data
        });
      });
  };
}
/**
 * @returns {void}
 */
// export function clearCenterStorage() {
//   if (localStorage.getItem('center')) {
//     localStorage.removeItem('center');
//   }
// }

/**
 * @param {object} centerInfo
 * @param {object} image
 * @returns {object} new center information
 */
export function addCenter(centerInfo) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_CENTER });
    return axios
      .post('/api/v1/centers', centerInfo)
      .then((response) => {
        const { data: { message }, status } = response;
        const res = {
          message,
          status
        };
        dispatch({
          type: actionTypes.ADD_CENTER_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.ADD_CENTER_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} centerInfo
 * @param {object} centerId
 * @returns {object} success or failure
 */
export function modifyCenter(centerInfo, centerId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_CENTER });
    return axios
      .put(`/api/v1/centers/${centerId}`, centerInfo)
      .then((response) => {
        const { data: { message }, status } = response;
        const res = {
          message,
          status
        };
        dispatch({
          type: actionTypes.MODIFY_CENTER_SUCCESS,
          payload: res
        });
        dispatch(getCenterSelected(centerId));
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.MODIFY_CENTER_FAILS,
          payload: data
        });
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
    return axios
      .delete(`/api/v1/centers/${id}`)
      .then((response) => {
        const { data: { message }, status } = response;
        const res = {
          message,
          status
        };
        dispatch({
          type: actionTypes.DELETE_CENTER_SUCCESS,
          payload: res
        });
        dispatch(getCenters());
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.DELETE_CENTER_FAILS,
          payload: data
        });
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
    return axios
      .put(`/api/v1/centerStatus/${id}`)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: actionTypes.CENTER_STATUS_UPDATE_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.CENTER_STATUS_UPDATE_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} data
 * @param {object} image
 * @returns {object} url of image uploaded
 */
export function uploadImage(data, image) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_IMAGE });
    delete axios.defaults.headers.common['x-access-token'];
    return axios
      .post('https://api.cloudinary.com/v1_1/kalel/image/upload', image)
      .then((response) => {
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        data.imageUrl = response.data.secure_url;
        dispatch(addCenter(data));
      })
      .catch((err) => {
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        dispatch({
          type: actionTypes.ADD_IMAGE_FAILS,
          payload: err.response.data
        });
      });
  };
}
