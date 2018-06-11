import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import { centerStatus } from './centerActions';
// import { setActivity } from './activityActions';
import * as actionTypes from './types';

/**
 * @param {object} data
 * @returns {object} new event details
 */
export function createEvent(data) {
  const { eventInfo } = data;
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_EVENT });
    return axios
      .post('/api/v1/events', eventInfo)
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_EVENT_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.ADD_EVENT_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @returns {object} list of events
 */
export function getEvents() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_EVENTS });
    return axios
      .get('/api/v1/userEvents')
      .then((response) => {
        const { status } = response;
        const { events } = response.data;
        dispatch({
          type: actionTypes.GET_EVENTS_SUCCESS,
          payload: {
            status,
            events
          }
        });
      })
      .catch((err) => {
        const { status } = err.response;
        const { message } = err.response.data;
        dispatch({
          type: actionTypes.GET_EVENTS_FAIL,
          payload: {
            status,
            message
          }
        });
      });
  };
}

/**
 * @param {object} id
 * @returns {object} center events
 */
export function getCenterEvents(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CENTER_EVENTS });
    return axios
      .get(`/api/v1/centerEvents/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_CENTER_EVENTS_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_CENTER_EVENTS_FAIL,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} event
 * @returns {object} current event
 */
export function setCurrentEvent(event) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_CURRENT_EVENT, payload: event });
  };
}

/**
 * @param {object} id
 * @param {object} tag
 * @returns {object} an event
 */
export function getEventSelected(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_EVENT });
    return axios
      .get(`/api/v1/events/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_EVENT_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_EVENT_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} data
 * @returns {object} success or failure
 */
export function modifyCenterEvent(data) {
  const { id, centerId } = data;
  return (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_CENTER_EVENT });
    return axios
      .put(`/api/v1/approveEvent/${id}`, data)
      .then((response) => {
        dispatch({
          type: actionTypes.MODIFY_CENTER_EVENT_SUCCESS,
          payload: response.data
        });
        // dispatch(setActivity(data));
        dispatch(getCenterEvents(centerId));
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.MODIFY_CENTER_EVENT_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} id
 * @param {object} data
 * @returns {object} success or failure
 */
export function modifyEvent(id, data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_EVENT });
    return axios
      .put(`/api/v1/events/${id}`, data)
      .then((response) => {
        dispatch({
          type: actionTypes.MODIFY_EVENT_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.MODIFY_EVENT_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} data
 * @returns {object} success or failure
 */
export function deleteCenterEvent(data) {
  const { id, centerId } = data;
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CENTER_EVENT });
    return axios
      .delete(`/api/v1/events/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.DELETE_CENTER_EVENT_SUCCESS,
          payload: response.data
        });
        dispatch(getCenterEvents(centerId));
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_CENTER_EVENT_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} id
 * @returns {object} success or failure
 */
export function deleteEvent(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_EVENT });
    return axios
      .delete(`/api/v1/events/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.DELETE_EVENT_SUCCESS,
          payload: response.data
        });
        dispatch(getEvents());
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_EVENT_FAILS,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} data
 * @param {object} centerId
 * @returns {object} event state
 */
export function clearEventState() {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_EVENT_STATE });
  };
}

/**
 * @param {object} id
 * @returns {object} number of event booked
 */
export function eventBooked(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_EVENTS_BOOKED_COUNT });
    return axios
      .get(`/api/v1/eventsbookedcount/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL,
          payload: err.response.data
        });
      });
  };
}

/**
 * @param {object} id
 * @returns {object} date user joined
 */
export function dateJoined(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_DATE_JOINED });
    return axios
      .get(`/api/v1/datejoined/${id}`)
      .then((response) => {
        dispatch({
          type: actionTypes.DATE_JOINED_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DATE_JOINED_FAILS,
          payload: err.response.data
        });
      });
  };
}
