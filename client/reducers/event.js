import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: false,
  loaded: false,
  events: [],
  error: null,
  event: {},
  message: '',
  status: '',
  isEvent: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EVENT': {
      const event = action.payload;
      return {
        ...state,
        isEvent: !isEmpty(event),
        event,
      };
    }

    case 'GET_EVENTS': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
        error: '',
      };
    }
    case 'GET_EVENTS_FAILS': {
      const { status } = action.payload;
      return {
        ...state,
        status,
      };
    }
    case 'GET_EVENTS_SUCCESS': {
      const { events } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        events,
      };
    }
    case 'GET_CENTER_EVENTS': {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: '',
      };
    }
    case 'GET_CENTER_EVENTS_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'GET_CENTER_EVENTS_SUCCESS': {
      const { events } = action.payload;
      const disableDates = events.map(event => (
        event.bookedDate
      ));
      return {
        ...state,
        loading: false,
        loaded: true,
        centerEvents: events,
        disableDates,

      };
    }
    case 'EVENT_SELECTED': {
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
    case 'GET_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'GET_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        message,
      };
    }
    case 'GET_EVENT_SUCCESS': {
      const { event } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        event,
      };
    }
    case 'MODIFY_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'MODIFY_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'MODIFY_EVENT_SUCCESS': {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'MODIFY_CENTER_EVENT': {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: '',
      };
    }
    case 'MODIFY_CENTER_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'MODIFY_CENTER_EVENT_SUCCESS': {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
      };
    }
    case 'DELETE_CENTER_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'DELETE_CENTER_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'DELETE_CENTER_EVENT_SUCCESS': {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'ADD_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'ADD_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'ADD_EVENT_SUCCESS': {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'DELETE_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'DELETE_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'DELETE_EVENT_SUCCESS': {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'CLEAR_EVENT_STATE': {
      return {
        ...state,
        status: '',
        message: '',
      };
    }
    case 'GET_EVENTS_BOOKED_COUNT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'EVENTS_BOOKED_COUNT_SUCCESS': {
      const {
        status,
        data: {
          message,
          eventBookedCount
        }
      } = action.payload;
      return {
        ...state,
        message,
        status,
        eventBookedCount,
      };
    }
    case 'EVENTS_BOOKED_COUNT_FAIL': {
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
    case 'GET_EVENTS_DELETED_COUNT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'EVENTS_DELETED_COUNT_SUCCESS': {
      const {
        status,
        data: {
          message,
          eventDeletedCount
        }
      } = action.payload;
      return {
        ...state,
        message,
        status,
        eventDeletedCount,
      };
    }
    case 'EVENTS_DELETED_COUNT_FAIL': {
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
