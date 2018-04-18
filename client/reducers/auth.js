import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/types';


const initialState = {
  userDetails: {},
  isAuth: false,
  user: {},
  loading: '',
  loaded: '',
  status: '',
  message: '',
  error: '',
  userToken: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER: {
      const {
        newUser,
        token
      } = action.payload;
      const {
        fullname,
        email,
        isAdmin,
        id,
        createdAt,
        imageUrl
      } = newUser;
      const user = {
        fullname,
        email,
        isAdmin,
        id,
        token,
        createdAt,
        imageUrl,
      };
      return {
        ...state,
        isAuth: !isEmpty(newUser),
        user,
      };
    }
    case actionTypes.USER_LOGIN: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
      };
    }
    case actionTypes.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case actionTypes.USER_LOGIN_FAIL: {
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
    case actionTypes.USER_SIGNUP: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case actionTypes.USER_SIGNUP_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case actionTypes.USER_SIGNUP_FAILS: {
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
    case actionTypes.VERIFY_EMAIL: {
      return {
        ...state,
        loading: true,
        status: '',
        message: '',
      };
    }
    case actionTypes.VERIFY_EMAIL_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case actionTypes.VERIFY_EMAIL_FAIL: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case actionTypes.GET_CODE: {
      return {
        ...state,
        status: '',
      };
    }
    case actionTypes.GET_CODE_SUCCESS: {
      const {
        status,
        data: { shortCode }
      } = action.payload;
      return {
        ...state,
        status,
        codeMessage: '',
        code: shortCode,
      };
    }
    case actionTypes.GET_CODE_FAILS: {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        status,
        message,
      };
    }
    case actionTypes.WRONG_CODE: {
      return {
        ...state,
        status: '',
        codeMessage: action.payload,
        codeStatus: '',
      };
    }
    case actionTypes.UPDATE_USER: {
      return {
        ...state,
        status: '',
        message: '',
        code: '',
        loading: true,
        loaded: false,
      };
    }
    case actionTypes.UPDATE_USER_SUCCESS: {
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
    case actionTypes.UPDATE_USER_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case actionTypes.SEND_MAIL: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case actionTypes.SEND_MAIL_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case actionTypes.SEND_MAIL_FAIL: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case actionTypes.GET_USER: {
      return {
        ...state,
        loaded: true,
        loading: false,
      };
    }
    case actionTypes.GET_USER_SUCCESS: {
      const {
        status,
        data: { userDetails }
      } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        status,
        userDetails
      };
    }
    case actionTypes.GET_USER_FAILS: {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case actionTypes.CHECK_PASSWORD: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case actionTypes.CHECK_PASSWORD_SUCCESS: {
      const {
        status,
        data: { message }
      } = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        message,
        status,
      };
    }
    case actionTypes.CHECK_PASSWORD_FAILS: {
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
    case actionTypes.UPLOAD_IMAGE: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case actionTypes.UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        url: action.payload,
      };
    }
    case actionTypes.UPLOAD_IMAGE_FAILS: {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case actionTypes.CLEAR_STATUS: {
      return {
        ...state,
        status: '',
        message: '',
      };
    }
    default: return state;
  }
};
