import isEmpty from 'lodash/isEmpty';

const initialState = {
  loading: false,
  loaded: false,
  centers: [],
  error: '',
  centerSelected: '',
  center: {
    facilities: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_CENTER_STATE': {
      return {
        ...state,
        loading: '',
        loaded: '',
        message: '',
        status: '',
      };
    }
    case 'SET_CURRENT_CENTER': {
      const { centerName, location, capacity, description, facilities, imageUrl, id } = action.payload.center;
      const center = { centerName, location, capacity, description, facilities, imageUrl, id }
      return {
        ...state,
        isCenter: !isEmpty(center),
        center,
      };
    }

    case 'GET_CENTERS': {
      return {
        ...state,
        loading: true,
        status: '',
        error: '',
      };
    }
    case 'GET_CENTERS_FAILS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        error: message,
        status,
      };
    }
    case 'GET_CENTERS_SUCCESS': {
      const { centers } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        centers,
      };
    }
    case 'CENTER_SELECTED': {
      const { centerId, centerName } = action.payload;
      return {
        ...state,
        centerId,
        centerName,
      };
    }
    case 'GET_CENTER': {
      return {
        ...state,
        error: '',
      };
    }
    case 'GET_CENTER_FAILS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        error: message,
        status,
      };
    }
    case 'GET_CENTER_SUCCESS': {
      const { center } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        center,
      };
    }
    case 'MODIFY_CENTER': {
      return {
        ...state,
        loading: true,
        message: '',
      };
    }
    case 'MODIFY_CENTER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message,
      };
    }
    case 'MODIFY_CENTER_SUCCESS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'DELETE_CENTER': {
      return {
        ...state,
        loading: true,
        status: '',
      };
    }
    case 'DELETE_CENTER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'DELETE_CENTER_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'ADD_CENTER': {
      return {
        ...state,
        loading: true,
        status: '',
        url: '',
      };
    }
    case 'ADD_CENTER_FAILS': {
      const { status } = action.payload;
      const { message } = action.payload.data;
      return {
        ...state,
        status,
        error: message,
      };
    }
    case 'ADD_CENTER_SUCCESS': {
      const { status } = action.payload;
      const { center } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        center,
      };
    }
    case 'ADD_IMAGE': {
      return {
        ...state,
        loading: true,
        status: '',
      };
    }
    case 'ADD_IMAGE_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'ADD_IMAGE_SUCCESS': {
      const url = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        url,
      };
    }
    case 'CENTER_STATUS_UPDATE': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'CENTER_STATUS_UPDATE_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      }
    }
    case 'CENTER_STATUS_UPDATE_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message,
      }
    }
  
    default:
      return state;
  }
};
