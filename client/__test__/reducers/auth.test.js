// import expect from 'expect';
// import userReducer from '../../reducers/auth';
// import * as actionTypes from '../../actions/types';

// // import mockData from '../__mocks__/data/userData';

// describe('Authentication Reducer', () => {
//   const initialState = {
//     isAuth: false,
//     user: {}
//   };
//   let action = {};
//   it('should return the initial state', () => {
//     expect(userReducer(undefined, action)).toEqual(initialState);
//   });

//   it('should return inital state on signup', done => {
//     action = { type: actionTypes.USER_SIGNUP };
//     expect(userReducer({}, action)).toEqual({
//       loading: true,
//       loaded: false,
//       status: '',
//       message: ''
//     });
//     done();
//   });

//   it('should return success code on sign up', done => {
//     action = {
//       type: actionTypes.USER_SIGNUP_SUCCESS,
//       payload: {
//         status: 201
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       status: 201
//     });
//     done();
//   });

//   it('should return error message on sign up', done => {
//     action = {
//       type: actionTypes.USER_SIGNUP_FAILS,
//       payload: {
//         message: 'Sorry you cannot be signed up now',
//         status: 401
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       status: 401,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on sign in', done => {
//     action = { type: actionTypes.USER_LOGIN };
//     expect(userReducer({}, action)).toEqual({
//       loading: true,
//       loaded: false,
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on sign in', done => {
//     action = {
//       type: actionTypes.USER_LOGIN_SUCCESS,
//       payload: {
//         message: 'You are now signed in'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return error message on sign in', done => {
//     action = {
//       type: actionTypes.USER_LOGIN_FAILS,
//       payload: {
//         message: 'Sorry you cannot be signed in',
//         status: 401
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       status: 401,
//       signinError: action.payload.message
//     });
//     done();
//   });

//   it('should return a new user', done => {
//     action = {
//       type: actionTypes.SET_CURRENT_USER,
//       payload: {
//         newUser: {
//           fullname: 'Orlayhemmy',
//           email: 'orla@orla.com'
//         }
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: true,
//       user: action.payload.newUser
//     });
//     done();
//   });

//   it('should return inital state on email verification', done => {
//     action = { type: actionTypes.VERIFY_EMAIL };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: true
//     });
//     done();
//   });

//   it('should return success on email verification', done => {
//     action = {
//       type: actionTypes.VERIFY_EMAIL_SUCCESS,
//       payload: {
//         status: 200,
//         message: ''
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       status: 200,
//       message: ''
//     });
//     done();
//   });

//   it('should return error on email verification', done => {
//     action = {
//       type: actionTypes.VERIFY_EMAIL_FAILS,
//       payload: {
//         message: 'Sorry, email cannot be verified'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on get code', done => {
//     action = { type: actionTypes.GET_CODE };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       status: ''
//     });
//     done();
//   });

//   it('should return success on code received', done => {
//     action = {
//       type: actionTypes.GET_CODE_SUCCESS,
//       payload: {
//         shortCode: 'dedhjfbjkweb4',
//         status: 200
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       code: action.payload.shortCode,
//       status: 200
//     });
//     done();
//   });

//   it('should return failure when code is not sent', done => {
//     action = {
//       type: actionTypes.GET_CODE_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state when user wants to update', done => {
//     action = { type: actionTypes.UPDATE_USER };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       status: '',
//       message: '',
//       code: '',
//       loading: true,
//       loaded: false,
//       userDetails: {}
//     });
//     done();
//   });

//   it('should return success on user update', done => {
//     action = {
//       type: actionTypes.UPDATE_USER_SUCCESS,
//       payload: {
//         message: 'User successfully updated',
//         status: 200
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       message: action.payload.message,
//       loading: false,
//       loaded: true,
//       status: 200
//     });
//     done();
//   });

//   it('should return failure when user fails to update', done => {
//     action = {
//       type: actionTypes.UPDATE_USER_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on password update', done => {
//     action = { type: actionTypes.UPDATE_PASSWORD };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       status: '',
//       message: '',
//       code: '',
//       loading: true,
//       loaded: false
//     });
//     done();
//   });

//   it('should return success on user update', done => {
//     action = {
//       type: actionTypes.UPDATE_PASSWORD_SUCCESS,
//       payload: {
//         message: 'User successfully updated',
//         status: 200
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       ...initialState,
//       message: action.payload.message,
//       loading: false,
//       loaded: true,
//       status: 200
//     });
//     done();
//   });

//   it('should return failure when user fails to update', done => {
//     action = {
//       type: actionTypes.UPDATE_PASSWORD_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state when wanting to get user', done => {
//     action = { type: actionTypes.GET_USER };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loaded: false,
//       loading: true,
//       userDetails: {},
//       status: '',
//       message: ''
//     });
//     done();
//   });

//   it('should return success when user is received', done => {
//     action = {
//       type: actionTypes.GET_USER_SUCCESS,
//       payload: {
//         userDetails: {},
//         status: 200
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loaded: true,
//       loading: false,
//       status: 200,
//       userDetails: action.payload.userDetails
//     });
//     done();
//   });

//   it('should return failure when user not found', done => {
//     action = {
//       type: actionTypes.GET_USER_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on password check', done => {
//     action = { type: actionTypes.CHECK_PASSWORD };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loaded: false,
//       loading: true
//     });
//     done();
//   });

//   it('should return success on password check', done => {
//     action = {
//       type: actionTypes.CHECK_PASSWORD_SUCCESS,
//       payload: {
//         message: 'password correct',
//         status: 200
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loaded: true,
//       loading: false,
//       message: action.payload.message,
//       status: 200
//     });
//     done();
//   });

//   it('should return failure when user not found', done => {
//     action = {
//       type: actionTypes.CHECK_PASSWORD_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on image upload', done => {
//     action = { type: actionTypes.UPLOAD_IMAGE };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: true,
//       loaded: false
//     });
//     done();
//   });

//   it('should return success on image upload', done => {
//     action = {
//       type: actionTypes.UPLOAD_IMAGE_SUCCESS,
//       payload: 'web.image.com'
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       loading: false,
//       loaded: true,
//       url: action.payload
//     });
//     done();
//   });

//   it('should return failure on image upload', done => {
//     action = {
//       type: actionTypes.UPLOAD_IMAGE_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on clear status', done => {
//     action = { type: actionTypes.CLEAR_STATUS };
//     expect(userReducer(initialState, action)).toEqual({
//       isAuth: false,
//       user: {},
//       status: '',
//       message: ''
//     });
//     done();
//   });
//   it('should return inital state on clear user state', done => {
//     action = { type: actionTypes.CLEAR_USER_STATE };
//     expect(userReducer(initialState, action)).toEqual({
//       ...initialState,
//       user: {},
//       status: '',
//       message: '',
//       shortCode: ''
//     });
//     done();
//   });
//   it('check code', done => {
//     action = {
//       type: actionTypes.CHECK_CODE,
//       payload: {
//         message: 'correct',
//         status: 200
//       }
//     };
//     expect(userReducer(initialState, action)).toEqual({
//       ...initialState,
//       status: action.payload.status,
//       message: action.payload.message
//     });
//     done();
//   });
// });
