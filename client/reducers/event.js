import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/types';

const initialState = {
  events: [],
  disableDates: [],
  error: null,
  event: {
    Center: {}
  },
  isEvent: false
};
export default (state = initialState, action) => {
  const eventList = state.events;
  switch (action.type) {
    case actionTypes.SET_CURRENT_EVENT: {
      const event = action.payload;
      return {
        ...state,
        isEvent: !isEmpty(event),
        event
      };
    }

    case actionTypes.GET_EVENTS: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
        error: ''
      };
    }
    case actionTypes.GET_EVENTS_SUCCESS: {
      const { events } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        events
      };
    }
    case actionTypes.GET_EVENTS_FAIL: {
      const { message, status } = action.payload;
      return {
        ...state,
        message,
        status
      };
    }

    case actionTypes.GET_CENTER_EVENTS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: ''
      };
    }
    case actionTypes.GET_CENTER_EVENTS_FAIL: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.GET_CENTER_EVENTS_SUCCESS: {
      const { events } = action.payload;
      const disableDates = events.map(event => event.bookedDate);
      return {
        ...state,
        loading: false,
        loaded: true,
        events,
        disableDates
      };
    }
    // case actionTypes.EVENT_SELECTED: {
    //   const { eventId, eventTitle } = action.payload;
    //   return {
    //     ...state,
    //     eventId,
    //     eventTitle
    //   };
    // }
    case actionTypes.GET_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: ''
      };
    }
    case actionTypes.GET_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        message
      };
    }
    case actionTypes.GET_EVENT_SUCCESS: {
      const { event } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        event
      };
    }
    case actionTypes.MODIFY_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: ''
      };
    }
    case actionTypes.MODIFY_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.MODIFY_EVENT_SUCCESS: {
      const { status, message, event } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
        event
      };
    }
    case actionTypes.MODIFY_CENTER_EVENT: {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: ''
      };
    }
    case actionTypes.MODIFY_CENTER_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.MODIFY_CENTER_EVENT_SUCCESS: {
      const { message, status, event } = action.payload;
      const index = eventList.findIndex(oldEvent => oldEvent.id === event.id);
      eventList[index] = event;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
        events: [...state.events]
      };
    }
    case actionTypes.DELETE_CENTER_EVENT: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.DELETE_CENTER_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.DELETE_CENTER_EVENT_SUCCESS: {
      const { message, status, id } = action.payload;
      eventList.splice(eventList.findIndex(event => event.id === id), 1);
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
        events: [...state.events]
      };
    }
    case actionTypes.ADD_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: ''
      };
    }
    case actionTypes.ADD_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.ADD_EVENT_SUCCESS: {
      const { message, status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status
      };
    }
    case actionTypes.DELETE_EVENT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: ''
      };
    }
    case actionTypes.DELETE_EVENT_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.DELETE_EVENT_SUCCESS: {
      const { message, status } = action.payload;
      eventList.splice(eventList.findIndex(event => event.id === action.id), 1);
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
        events: [...state.events]
      };
    }
    case actionTypes.CLEAR_EVENT_STATE: {
      return {
        ...state,
        status: '',
        message: '',
        isAvailable: ''
      };
    }
    case actionTypes.GET_EVENTS_BOOKED_COUNT: {
      return {
        ...state,
        loading: true,
        message: '',
        status: ''
      };
    }
    case actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS: {
      const { message, eventBookedCount } = action.payload;
      return {
        ...state,
        message,
        eventBookedCount
      };
    }
    case actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL: {
      const { status, message } = action.payload;
      return {
        ...state,
        error: message,
        status
      };
    }
    case actionTypes.CHECK_DATE: {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
        isAvailable: '',
        error: ''
      };
    }
    case actionTypes.CHECK_DATE_FAILS: {
      const { status, message } = action.payload;
      return {
        ...state,
        error: message,
        status,
        isAvailable: false
      };
    }
    case actionTypes.CHECK_DATE_SUCCESS: {
      const { status, message, isAvailable } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        isAvailable,
        status
      };
    }
    default:
      return state;
  }
};
