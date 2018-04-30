import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  events: [],
  disableDates: [],
  error: null,
  event: {},
  message: '',
  status: '',
  isEvent: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_EVENT: {
      const event = action.payload;
      return {
        ...state,
        isEvent: !isEmpty(event),
        event,
      };
    }

    case actionTypes.GET_EVENTS: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
        error: '',
      };
    }
    case actionTypes.GET_EVENTS_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        message,
      };
    }
    case actionTypes.GET_EVENTS_SUCCESS: {
      const { events } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        events,
      };
    }
    case actionTypes.GET_CENTER_EVENTS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: '',
      };
    }
    case actionTypes.GET_CENTER_EVENTS_FAIL: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.GET_CENTER_EVENTS_SUCCESS: {
      const { events } = action.payload;
      const disableDates = events.map(event => (
        event.bookedDate
      ));
      return {
        ...state,
        loading: false,
        loaded: true,
        events,
        disableDates,

      };
    }
    case actionTypes.EVENT_SELECTED: {
      const {
        eventId,
        eventTitle
      } = action.payload;
      return {
        ...state,
        eventId,
        eventTitle,
      };
    }
    case actionTypes.GET_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case actionTypes.GET_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        message,
      };
    }
    case actionTypes.GET_EVENT_SUCCESS: {
      const { event } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        event,
      };
    }
    case actionTypes.MODIFY_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case actionTypes.MODIFY_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.MODIFY_EVENT_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status: 200,
      };
    }
    case actionTypes.MODIFY_CENTER_EVENT: {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: '',
      };
    }
    case actionTypes.MODIFY_CENTER_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.MODIFY_CENTER_EVENT_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status: 200,
        message,
      };
    }
    case actionTypes.DELETE_CENTER_EVENT: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.DELETE_CENTER_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.DELETE_CENTER_EVENT_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status: 200,
      };
    }
    case actionTypes.ADD_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case actionTypes.ADD_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.ADD_EVENT_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status: 201,
      };
    }
    case actionTypes.DELETE_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case actionTypes.DELETE_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.DELETE_EVENT_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status: 200
      };
    }
    case actionTypes.CLEAR_EVENT_STATE: {
      return {
        ...state,
        status: '',
        message: '',
      };
    }
    case actionTypes.GET_EVENTS_BOOKED_COUNT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS: {
      const {
        message,
        eventBookedCount
      } = action.payload;
      return {
        ...state,
        message,
        status: 200,
        eventBookedCount,
      };
    }
    case actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL: {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        error: message,
        status,
      };
    }
    case actionTypes.GET_EVENTS_DELETED_COUNT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case actionTypes.EVENTS_DELETED_COUNT_SUCCESS: {
      const {
        message,
        eventDeletedCount
      } = action.payload;
      return {
        ...state,
        message,
        status: 200,
        eventDeletedCount,
      };
    }
    case actionTypes.EVENTS_DELETED_COUNT_FAIL: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    default:
      return state;
  }
};
