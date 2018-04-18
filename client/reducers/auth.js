import isEmpty from 'lodash/isEmpty';


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

    case 'SET_CURRENT_USER': {
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
      }
      return {
        ...state,
        isAuth: !isEmpty(newUser),
        user,
      };
    }
    case 'USER_LOGIN': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
      };
    }
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'USER_LOGIN_FAIL': {
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
    case 'USER_SIGNUP': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'USER_SIGNUP_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'USER_SIGNUP_FAIL': {
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
    case 'VERIFY_EMAIL': {
      return {
        ...state,
        loading: true,
        status: '',
        message: '',
      };
    }
    case 'VERIFY_EMAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'VERIFY_EMAIL_FAIL': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'GET_CODE': {
      return {
        ...state,
        status: '',
      };
    }
    case 'GET_CODE_SUCCESS': {
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
    case 'GET_CODE_FAILS': {
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
    case 'WRONG_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: action.payload,
        codeStatus: '',
      };
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        status: '',
        message: '',
        code: '',
        loading: true,
        loaded: false,
      };
    }
    case 'UPDATE_USER_SUCCESS': {
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
    case 'UPDATE_USER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'SEND_MAIL': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'SEND_MAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'SEND_MAIL_FAIL': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'GET_USER': {
      return {
        ...state,
        loaded: true,
        loading: false,
      };
    }
    case 'GET_USER_SUCCESS': {
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
    case 'GET_USER_FAILS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'CHECK_PASSWORD': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'CHECK_PASSWORD_SUCCESS': {
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
    case 'CHECK_PASSWORD_FAILS': {
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
    case 'UPLOAD_IMAGE': {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case 'UPLOAD_IMAGE_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
        url: action.payload,
      };
    }
    case 'UPLOAD_IMAGE_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'CLEAR_STATUS': {
      return {
        ...state,
        status: '',
        message: '',
      };
    }
    default: return state;
  }
};
