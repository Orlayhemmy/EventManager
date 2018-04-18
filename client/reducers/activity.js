const initialState = {
  loading: false,
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVITY': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'SET_ACTIVITY_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'SET_ACTIVITY_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message,
      };
    }
    case 'GET_ACTIVITIES': {
      return {
        ...state,
        loading: true,
        message: '',
        activities: '',
      };
    }
    case 'GET_ACTIVITIES_SUCCESS': {
      const { activities } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        activities,
      };
    }
    case 'GET_ACTIVITIES_FAILS': {
      const { message } = action.payload.data;
      return {
        ...state,
        loaded: true,
        loading: false,
        message,
      };
    }
    case 'DELETE_ACTIVITY': {
      return {
        ...state,
        loading: true,
        message: '',
      };
    }
    case 'DELETE_ACTIVITY_SUCCESS': {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'DELETE_ACTIVITY_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message,
      };
    }
    default:
      return state;
  }
};
