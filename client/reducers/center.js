import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/types';
import paginate from './centersPagination';

const initialState = {
  centers: [],
  center: {
    facilities: []
  },
  paginatedCenters: []
};
export default (state = initialState, action) => {
  const centerList = state.centers;
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
        error: '',
        message: ''
      };
    }
    case actionTypes.GET_CENTERS_FAIL: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.GET_CENTERS_SUCCESS: {
      const { centers, message } = action.payload;
      const { pages, isNext, showCenters } = paginate(centers, action.pageId);
      return {
        ...state,
        loading: false,
        loaded: true,
        centers,
        paginatedCenters: showCenters,
        isNext,
        message,
        pages
      };
    }
    case actionTypes.GET_NEXT_CENTERS: {
      const { pages, isNext, showCenters } = paginate(
        centerList,
        action.payload
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        paginatedCenters: showCenters,
        isNext,
        pages
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
      const { message, status } = action.payload;
      return {
        ...state,
        error: message,
        status
      };
    }
    case actionTypes.GET_CENTER_SUCCESS: {
      const { center } = action.payload;
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
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: message
      };
    }
    case actionTypes.MODIFY_CENTER_SUCCESS: {
      const { message, status, center } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
        center
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
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.DELETE_CENTER_SUCCESS: {
      const { message, status } = action.payload;
      centerList.splice(
        centerList.findIndex(center => center.id === action.id),
        1
      );
      const { pages, isNext, showCenters } = paginate(centerList);
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        message,
        paginatedCenters: showCenters,
        isNext,
        pages
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
      const { message } = action.payload;
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
      const { message } = action.payload;
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
      const { message } = action.payload;
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
