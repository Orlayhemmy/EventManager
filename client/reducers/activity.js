import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  activities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVITY: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.SET_ACTIVITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case actionTypes.SET_ACTIVITY_FAILS: {
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
    case actionTypes.DELETE_ACTIVITY: {
      return {
        ...state,
        loading: true,
        message: '',
      };
    }
    case actionTypes.DELETE_ACTIVITY_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case actionTypes.DELETE_ACTIVITY_FAILS: {
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
