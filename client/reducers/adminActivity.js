import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  activities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMINCTIVITY: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.SET_ADMINACTIVITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case actionTypes.SET_ADMINACTIVITY_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message,
      };
    }
    case actionTypes.GET_ACTIVITIES: {
      return {
        ...state,
        loading: true,
        message: '',
      };
    }
    case actionTypes.GET_ACTIVITIES_SUCCESS: {
      const { activities } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        activities,
      };
    }
    case actionTypes.GET_ACTIVITIES_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        message,
      };
    }
    default:
      return state;
  }
};
