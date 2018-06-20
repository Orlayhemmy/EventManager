import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/types';

const initialState = {
  centers: [],
  center: {
    facilities: []
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_CENTER_STATE: {
      return {
        ...state,
        loading: '',
        loaded: '',
        message: '',
        status: ''
      };
    }
    case actionTypes.SET_CURRENT_CENTER: {
      const {
        centerName,
        location,
        capacity,
        description,
        facilities,
        imageUrl,
        id
      } = action.payload.center;
      const center = {
        centerName,
        location,
        capacity,
        description,
        facilities,
        imageUrl,
        id
      };
      return {
        ...state,
        isCenter: !isEmpty(center),
        center
      };
    }

    case actionTypes.GET_CENTERS: {
      return {
        ...state,
        loading: true,
        status: '',
        error: ''
      };
    }
    case actionTypes.GET_CENTERS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.GET_CENTERS_SUCCESS: {
      const { centers } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        centers
      };
    }
    case actionTypes.CENTER_SELECTED: {
      const { centerId, centerName } = action.payload;
      return {
        ...state,
        centerId,
        centerName
      };
    }
    case actionTypes.GET_CENTER: {
      return {
        ...state,
        error: ''
      };
    }
    case actionTypes.GET_CENTER_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.GET_CENTER_SUCCESS: {
      const { center } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        center
      };
    }
    case actionTypes.MODIFY_CENTER: {
      return {
        ...state,
        loading: true,
        message: ''
      };
    }
    case actionTypes.MODIFY_CENTER_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message
      };
    }
    case actionTypes.MODIFY_CENTER_SUCCESS: {
      const { message, status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case actionTypes.DELETE_CENTER: {
      return {
        ...state,
        loading: true,
        status: ''
      };
    }
    case actionTypes.DELETE_CENTER_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.DELETE_CENTER_SUCCESS: {
      const { message, status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message
      };
    }
    case actionTypes.ADD_CENTER: {
      return {
        ...state,
        loading: true,
        status: '',
        url: ''
      };
    }
    case actionTypes.ADD_CENTER_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.ADD_CENTER_SUCCESS: {
      const { message, status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message
      };
    }
    case actionTypes.ADD_IMAGE: {
      return {
        ...state,
        loading: true,
        status: ''
      };
    }
    case actionTypes.ADD_IMAGE_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.ADD_IMAGE_SUCCESS: {
      const url = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        url
      };
    }
    case actionTypes.CENTER_STATUS_UPDATE: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.CENTER_STATUS_UPDATE_SUCCESS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message
      };
    }
    case actionTypes.CENTER_STATUS_UPDATE_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message
      };
    }
    default:
      return state;
  }
};
