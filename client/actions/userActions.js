/* eslint-disable */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthorizationToken';
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
    dispatch({
      type: actionTypes.SET_CURRENT_USER,
      payload: { newUser, token }
    });
  };
}

/**
 * @param {object} user
 * @returns {object} success or failure
 */
export function userSignupRequest(user) {
  return (dispatch) => {
    dispatch({ type: actionTypes.USER_SIGNUP });
    return axios
      .post('/api/v1/users', user)
      .then((response) => {
        const {
          data: { token },
          status
        } = response;
        const res = {
          status
        };
        dispatch({
          type: actionTypes.USER_SIGNUP_SUCCESS,
          payload: res
        });
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token), token));
      })
      .catch((err) => {
        const {
          status,
          data: { message }
        } = err.response;
        const res = {
          status,
          message
        };
        dispatch({
          type: actionTypes.USER_SIGNUP_FAILS,
          payload: res
        });
      });
  };
}

/**
 * @returns {object} logout
 */
export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 * @param {object} user
 * @returns {object} success or failure
 */
export function userSignInRequest(user) {
  return (dispatch) => {
    dispatch({ type: actionTypes.USER_LOGIN });
    return axios
      .post('/api/v1/users/login', user)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: actionTypes.USER_LOGIN_SUCCESS,
          payload: data
        });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token), token));
      })
      .catch((err) => {
        const {
          data: { message },
          status
        } = err.response;
        const res = {
          message,
          status
        };
        dispatch({
          type: actionTypes.USER_LOGIN_FAILS,
          payload: res
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function confirmEmail(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.VERIFY_EMAIL });
    return axios
      .post('/api/v1/passrecovery', info)
      .then((response) => {
        const {
          data: { message },
          status
        } = response;
        const res = { message, status };
        dispatch({
          type: actionTypes.VERIFY_EMAIL_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.VERIFY_EMAIL_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @returns {void}
 * @param {string} email
 */
export function sendMail(email) {
  const data = {
    email
  };
  return (dispatch) => {
    dispatch({ type: actionTypes.SEND_MAIL });
    return axios
      .post('/api/v1/sendmail', data)
      .then((response) => {
        const {
          status,
          data: { shortCode }
        } = response;
        const res = {
          status,
          shortCode
        };
        dispatch({
          type: actionTypes.SEND_MAIL_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.SEND_MAIL_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @returns {object} user's details
 */
export function getUser() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USER });
    return axios
      .get('/api/v1/users')
      .then((response) => {
        const {
          status,
          data: { userDetails }
        } = response;
        const res = {
          status,
          userDetails
        };
        dispatch({
          type: actionTypes.GET_USER_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.GET_USER_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function updateUserDetails(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_USER });
    return axios
      .put('/api/v1/users', info)
      .then((response) => {
        const {
          status,
          data: { message, user }
        } = response;
        const res = {
          status,
          message,
          user
        };
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_USER_FAILS,
          payload: err.response.data
        });
      });
  };
}
/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function updatePassword(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PASSWORD });
    return axios
      .put('/api/v1/newpassword', info)
      .then((response) => {
        const {
          status,
          data: { message }
        } = response;
        const res = {
          status,
          message
        };
        dispatch({
          type: actionTypes.UPDATE_PASSWORD_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_PASSWORD_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function checkPassword(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHECK_PASSWORD });
    return axios
      .post('/api/v1/passwordcheck', info)
      .then((response) => {
        const {
          status,
          data: { message }
        } = response;
        const res = {
          status,
          message
        };
        dispatch({
          type: actionTypes.CHECK_PASSWORD_SUCCESS,
          payload: res
        });
        dispatch(clearStatus());
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.CHECK_PASSWORD_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function confirmCode(info) {
  return (dispatch) => {
    let status = 202;
    if (info === 'wrong code') status = 400;
    const data = {
      message: info,
      status
    };
    dispatch({
      type: actionTypes.CHECK_CODE,
      payload: data
    });
  };
}

/**
 * @param {object} data
 * @param {object} centerId
 * @returns {object} event state
 */
export function clearUserState() {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_USER_STATE });
  };
}
