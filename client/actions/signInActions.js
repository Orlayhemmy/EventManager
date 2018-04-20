import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthorizationToken';
import { setCurrentCenter } from './centerActions';
import * as actionTypes from './types';

/**
 * @returns {object} status
 */
export function clearStatus() {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATUS });
  };
}

/**
 * @param {object} newUser
 * @param {object} token
 * @returns {object} current user token
 */
export function setCurrentUser(newUser, token) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: { newUser, token } });
  };
}

/**
 * @param {object} title
 * @param {object} message
 * @param {object} email
 * @returns {object} success or failure
 */
export function sendMail(title, message, email) {
  return (dispatch) => {
    const data = {
      title,
      message,
      email,
    };
    dispatch({ type: actionTypes.SEND_MAIL });
    return axios.post('api/v1/sendmail', data).then((response) => {
      dispatch({ type: actionTypes.SEND_MAIL_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.SEND_MAIL_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} user
 * @param {object} title
 * @param {object} message
 * @param {object} email
 * @returns {object} success or failure
 */
export function userSignupRequest(user, title, message, email) {
  return (dispatch) => {
    dispatch({ type: actionTypes.USER_SIGNUP });
    return axios.post('/api/v1/users', user).then((response) => {
      dispatch({ type: actionTypes.USER_SIGNUP_SUCCESS, payload: response.data });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token), token));
      dispatch(sendMail(title, message, email));
    }).catch((err) => {
      dispatch({ type: actionTypes.USER_SIGNUP_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @returns {object} logout
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    localStorage.removeItem('center');
    dispatch(setCurrentCenter({}));
  };
}

/**
 * @param {object} user
 * @returns {object} success or failure
 */
export function userSignInRequest(user) {
  return (dispatch) => {
    dispatch({ type: 'USER_LOGIN' });
    return axios.post('api/v1/users/login', user).then((response) => {
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token), token));
    }).catch((err) => {
      dispatch({ type: 'USER_LOGIN_FAIL', payload: err.response.data });
    });
  };
}

/**
 * @param {object} data
 * @returns {object} success or failure
 */
export function confirmEmail(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.VERIFY_EMAIL });
    return axios.post('api/v1/passrecovery', data).then((response) => {
      dispatch({ type: actionTypes.VERIFY_EMAIL_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.VERIFY_EMAIL_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @returns {object} generated code
 */
export function generateCode() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CODE });
    return axios.get('api/v1/shortcode').then((response) => {
      dispatch({ type: actionTypes.GET_CODE_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.GET_CODE_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @returns {object} user's details
 */
export function getUser() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USER });
    return axios.get('api/v1/users').then((response) => {
      dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: actionTypes.GET_USER_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} data
 * @returns {object} success or failure
 */
export function updateUserDetails(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_USER });
    return axios.put('api/v1/users', data).then((response) => {
      dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, payload: response.data });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token), token));
    }).catch((err) => {
      dispatch({ type: actionTypes.UPDATE_USER_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} id
 * @returns {object} user email
 */
export function getUserEmail(id) {
  return dispatch => axios.get(`api/v1/userEmail/${id}`).then((response) => {
    dispatch({ type: actionTypes.GET_USER_EMAIL, payload: response.data });
  });
}

/**
 * @param {object} data
 * @returns {object} success or failure
 */
export function checkPassword(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHECK_PASSWORD });
    return axios.post('api/v1/passwordcheck', data).then((response) => {
      dispatch({ type: actionTypes.CHECK_PASSWORD_SUCCESS, payload: response.data });
      dispatch(clearStatus());
    }).catch((err) => {
      dispatch({ type: actionTypes.CHECK_PASSWORD_FAILS, payload: err.response.data });
    });
  };
}

/**
 * @param {object} id
 * @param {object} data
 * @param {object} message
 * @param {object} email
 * @returns {object} success or failure
 */
export function uploadUserImage(id, data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPLOAD_IMAGE });
    delete axios.defaults.headers.common['x-access-token'];
    return axios.post('https://api.cloudinary.com/v1_1/kalel/image/upload', data)
      .then((response) => {
        dispatch({ type: actionTypes.UPLOAD_IMAGE_SUCCESS, payload: response.data.secure_url });
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        const imgData = {
          imageUrl: response.data.secure_url,
        };
        dispatch(updateUserDetails(imgData));
      }).catch((err) => {
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        dispatch({ type: actionTypes.UPLOAD_IMAGE_FAILS, payload: err.response.data });
      });
  };
}
