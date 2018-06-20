import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/types';

const initialState = {
  isAuth: false,
  user: {},
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER: {
      const { newUser } = action.payload;
      return {
        ...state,
        isAuth: !isEmpty(newUser),
        user: newUser,
      };
    }
    case actionTypes.USER_LOGIN: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: ''
      };
    }
    case actionTypes.USER_LOGIN_SUCCESS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message
      };
    }
    case actionTypes.USER_LOGIN_FAILS: {
      const { data: { message }, status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        signinError: message
      };
    }
    case actionTypes.USER_SIGNUP: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: ''
      };
    }
    case actionTypes.USER_SIGNUP_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status
      };
    }
    case actionTypes.USER_SIGNUP_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status: 401,
        message
      };
    }
    case actionTypes.VERIFY_EMAIL: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.VERIFY_EMAIL_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status
      };
    }
    case actionTypes.VERIFY_EMAIL_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message
      };
    }
    case actionTypes.GET_CODE: {
      return {
        ...state,
        status: ''
      };
    }
    case actionTypes.GET_CODE_SUCCESS: {
      const { data: { shortCode }, status } = action.payload;
      return {
        ...state,
        status,
        code: shortCode
      };
    }
    case actionTypes.GET_CODE_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        message
      };
    }
    // case actionTypes.WRONG_CODE: {
    //   return {
    //     ...state,
    //     status: '',
    //     codeMessage: action.payload
    //   };
    // }
    case actionTypes.UPDATE_USER: {
      return {
        ...state,
        status: '',
        message: '',
        code: '',
        loading: true,
        loaded: false
      };
    }
    case actionTypes.UPDATE_USER_SUCCESS: {
      const { data: { message }, status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status
      };
    }
    case actionTypes.UPDATE_USER_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message
      };
    }
    // case actionTypes.SEND_MAIL: {
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false,
    //     status: '',
    //     message: ''
    //   };
    // }
    // case actionTypes.SEND_MAIL_SUCCESS: {
    //   const { status } = action.payload;
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     status
    //   };
    // }
    // case actionTypes.SEND_MAIL_FAIL: {
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     message: action.payload
    //   };
    // }
    case actionTypes.GET_USER: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case actionTypes.GET_USER_SUCCESS: {
      const { data: { userDetails }, status } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        status,
        userDetails
      };
    }
    case actionTypes.GET_USER_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message
      };
    }
    case actionTypes.CHECK_PASSWORD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case actionTypes.CHECK_PASSWORD_SUCCESS: {
      const { data: { message }, status } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        message,
        status
      };
    }
    case actionTypes.CHECK_PASSWORD_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message
      };
    }
    case actionTypes.UPLOAD_IMAGE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case actionTypes.UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        url: action.payload
      };
    }
    case actionTypes.UPLOAD_IMAGE_FAILS: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.CLEAR_STATUS: {
      return {
        ...state,
        status: '',
        message: ''
      };
    }
    default:
      return state;
  }
};
