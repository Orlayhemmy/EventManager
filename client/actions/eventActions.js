import axios from 'axios';
import jwt from 'jsonwebtoken';
import { centerStatus } from './centerActions';
import { setActivity, deleteActivity } from './activityActions';
import { setAdminActivity } from './adminActivityActions';

export function createEvent(data) {
  const { eventInfo } = data;
  return (dispatch) => {
    dispatch({ type: 'ADD_EVENT' });
    axios.post('api/v1/events', eventInfo).then((response) => {
      dispatch({ type: 'ADD_EVENT_SUCCESS', payload: response });
      const info = {
        id: eventInfo.centerId,
        eventTitle: eventInfo.eventTitle,
        eventId: response.data.bookedEvent.id,
        username: data.user,
      };
      dispatch(centerStatus(info.id));
      dispatch(setActivity(info));
    }).catch((err) => {
      dispatch({ type: 'ADD_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function getEvents() {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENTS' });
    axios.get('api/v1/userEvents').then((response) => {
      dispatch({ type: 'GET_EVENTS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_EVENTS_FAILS', payload: err.response });
    });
  };
}

export function getCenterEvents(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTER_EVENTS' });
    axios.get(`api/v1/centerEvents/${id}`).then((response) => {
      dispatch({ type: 'GET_CENTER_EVENTS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTER_EVENTS_FAILS', error: err.response.data });
    });
  };
}

export function setCurrentEvent(event) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_EVENT', payload: event });
  };
}
// export function eventSelected(eventData) {
//   return (dispatch) => {
//     dispatch({ type: 'EVENT_SELECTED', payload: eventData });
//   };
// }
export function getEventSelected(id, tag) {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENT' });
    axios.get(`api/v1/events/${id}`).then((response) => {
      dispatch({ type: 'GET_EVENT_SUCCESS', payload: response.data });
      if (!tag) {
        const { token } = response.data;
        localStorage.setItem('event', token);
        dispatch(setCurrentEvent(jwt.decode(token)));
      }
    }).catch((err) => {
      dispatch({ type: 'GET_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function modifyCenterEvent(data) {
  const { 
    id,
    centerId
  } = data;
  return (dispatch) => {
    dispatch({ type: 'MODIFY_CENTER_EVENT' });
    axios.put(`api/v1/approveEvent/${id}`).then((res) => {
      dispatch({ type: 'MODIFY_CENTER_EVENT_SUCCESS', payload: res });
      dispatch(setActivity(data));
      dispatch(getCenterEvents(centerId));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_CENTER_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function modifyEvent(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_EVENT' });
    axios.put(`api/v1/events/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_EVENT_SUCCESS', payload: response });
      // dispatch(centerStatus(centerId));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function deleteCenterEvent(data) {
  const {
    id,
    centerId
  } = data;
  return (dispatch) => {
    dispatch({ type: 'DELETE_CENTER_EVENT' });
    axios.delete(`api/v1/events/${id}`).then((res) => {
      dispatch({ type: 'DELETE_CENTER_EVENT_SUCCESS', payload: res });
      dispatch(setActivity(data));
      dispatch(getCenterEvents(centerId));
    }).catch((err) => {
      dispatch({ type: 'DELETE_CENTER_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function deleteEvent(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_EVENT' });
    axios.delete(`api/v1/events/${id}`).then((res) => {
      dispatch({ type: 'DELETE_EVENT_SUCCESS', payload: res });
      dispatch(getEvents());
    }).catch((err) => {
      dispatch({ type: 'DELETE_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function clearEventState() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_EVENT_STATE' });
  };
}

export function eventBooked(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENTS_BOOKED_COUNT' });
    axios.get(`api/v1/eventsbookedcount/${id}`).then((res) => {
      dispatch({ type: 'EVENTS_BOOKED_COUNT_SUCCESS', payload: res });
    }).catch((err) => {
      dispatch({ type: 'EVENTS_BOOKED_COUNT_FAIL', payload: err.response });
    });
  };
}

export function dateJoined(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_DATE_JOINED' });
    axios.get(`api/v1/datejoined/${id}`).then((res) => {
      dispatch({ type: 'DATE_JOINED_SUCCESS', payload: res });
    }).catch((err) => {
      dispatch({ type: 'DATE_JOINED_FAILS', payload: err.response.data });
    });
  };
}