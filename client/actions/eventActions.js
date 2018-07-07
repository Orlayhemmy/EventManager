import axios from 'axios';
import * as actionTypes from './types';


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
 * @param {object} info
 * @returns {object} new event details
 */
export function createEvent(info) {
  const { eventInfo } = info;
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_EVENT });
    return axios
      .post('/api/v1/events', eventInfo)
      .then((response) => {
        const { data: { message }, status } = response;
        const res = { message, status };
        dispatch({
          type: actionTypes.ADD_EVENT_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.ADD_EVENT_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @returns {object} list of events
 * @param {object} data
 */
export function getEvents(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_EVENTS });
    return axios
      .get(`/api/v1/userEvents/${data}`)
      .then((response) => {
        const { status, data: { events } } = response;
        const res = {
          status,
          events
        };
        dispatch({
          type: actionTypes.GET_EVENTS_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { status, data: { message } } = err.response;
        const res = {
          status,
          message
        };
        dispatch({
          type: actionTypes.GET_EVENTS_FAIL,
          payload: res
        });
      });
  };
}

/**
 * @param {object} id
 * @returns {object} center events
 */
export function getCenterEvents() {
  const id = localStorage.getItem('centerId');
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CENTER_EVENTS });
    return axios
      .get(`/api/v1/centerEvents/${id}`)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: actionTypes.GET_CENTER_EVENTS_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.GET_CENTER_EVENTS_FAIL,
          payload: data
        });
      });
  };
}

/**
 * @param {object} eventId
 * @param {object} centerId
 */
export function setCurrentEvent(eventId) {
  localStorage.setItem('event', eventId);
}

/**
 * @param {object} id
 * @param {object} tag
 * @returns {object} an event
 */
export function getEventSelected() {
  const id = localStorage.getItem('event');
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_EVENT });
    return axios
      .get(`/api/v1/events/${id}`)
      .then((response) => {
        const { status, data: { event } } = response;
        const res = {
          status,
          event
        };
        dispatch({
          type: actionTypes.GET_EVENT_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.GET_EVENT_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function modifyCenterEvent(info) {
  const { id } = info;
  return (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_CENTER_EVENT });
    return axios
      .put(`/api/v1/approveEvent/${id}`, info)
      .then((response) => {
        const { status, data: { message, event } } = response;
        const res = {
          message,
          status,
          event
        };
        dispatch({
          type: actionTypes.MODIFY_CENTER_EVENT_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.MODIFY_CENTER_EVENT_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} id
 * @param {object} eventData
 * @returns {object} success or failure
 */
export function modifyEvent(id, eventData) {
  return (dispatch) => {
    dispatch({ type: actionTypes.MODIFY_EVENT });
    return axios
      .put(`/api/v1/events/${id}`, eventData)
      .then((response) => {
        const { status, data: { message, event } } = response;
        const res = {
          message,
          status,
          event
        };
        dispatch({
          type: actionTypes.MODIFY_EVENT_SUCCESS,
          payload: res
        });
        dispatch(clearEventState());
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.MODIFY_EVENT_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} success or failure
 */
export function deleteCenterEvent(info) {
  const { id, centerId } = info;
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CENTER_EVENT });
    return axios
      .delete(`/api/v1/events/${id}`)
      .then((response) => {
        const { status, data: { message } } = response;
        const res = {
          status,
          message,
          id
        };
        dispatch({
          type: actionTypes.DELETE_CENTER_EVENT_SUCCESS,
          payload: res
        });
        dispatch(getCenterEvents(centerId));
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.DELETE_CENTER_EVENT_FAILS,
          payload: data
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
        const { status, data: { message } } = response;
        const res = {
          status,
          message,
          id
        };
        dispatch({
          type: actionTypes.DELETE_EVENT_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.DELETE_EVENT_FAILS,
          payload: data
        });
      });
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
        const { status, data: { message, eventBookedCount } } = response;
        const res = {
          status,
          message,
          eventBookedCount
        };
        dispatch({
          type: actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { status, data: { message } } = err.response;
        const res = {
          status,
          message
        };
        dispatch({
          type: actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL,
          payload: res
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
        const { data } = response;
        dispatch({
          type: actionTypes.DATE_JOINED_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const { data } = err.response;
        dispatch({
          type: actionTypes.DATE_JOINED_FAILS,
          payload: data
        });
      });
  };
}

/**
 * @param {object} info
 * @returns {object} true or false
 */
export function checkAvailableDate(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHECK_DATE });
    return axios
      .post('/api/v1/checkDate', info)
      .then((response) => {
        const { status, data: { message, isAvailable } } = response;
        const res = {
          status,
          message,
          isAvailable
        };
        dispatch({
          type: actionTypes.CHECK_DATE_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        const { status, data: { message } } = err.response;
        const res = {
          status,
          message
        };
        dispatch({
          type: actionTypes.CHECK_DATE_FAILS,
          payload: res
        });
      });
  };
}
