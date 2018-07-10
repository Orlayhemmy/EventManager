// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import expect from 'expect';
// import moxios from 'moxios';
// import * as actions from '../../actions/userActions';
// import * as actionTypes from '../../actions/types';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// const mockSignup = {
//   fullname: 'Orlayhemmy',
//   email: 'mail@mail.com',
//   password: 'userPassword'
// };

// const mockSignin = {
//   loginEmail: 'mail@mail.com',
//   loginPassword: 'userPassword'
// };

// const mockPassword = 'qwerty';

// describe('user signup action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('returns success when user is successfully signed up', done => {
//     moxios.stubRequest('/api/v1/users', {
//       status: 201,
//       response: {
//         message: 'signup sucessful',
//         token: 'sdefeffefrg'
//       }
//     });

//     const expectedActions = [
//       { type: 'USER_SIGNUP' },
//       {
//         payload: { status: 201 },
//         type: 'USER_SIGNUP_SUCCESS'
//       },
//       {
//         payload: { newUser: null, token: 'sdefeffefrg' },
//         type: 'SET_CURRENT_USER'
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.userSignupRequest(mockSignup)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });

//   it('returns failure when user is not successfully signed up', done => {
//     moxios.stubRequest('/api/v1/users', {
//       status: 400,
//       response: {
//         message: 'signup fails'
//       }
//     });

//     const expectedActions = [
//       { type: 'USER_SIGNUP' },
//       {
//         type: 'USER_SIGNUP_FAILS',
//         payload: { message: 'signup fails', status: 400 }
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.userSignupRequest(mockSignup)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });
// });

// describe('user signin action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('returns success when user is successfully signed in', done => {
//     moxios.stubRequest('/api/v1/users/login', {
//       status: 200,
//       response: {
//         message: 'signup sucessful',
//         token: 'sdefeffefrg'
//       }
//     });

//     const expectedActions = [
//       { type: 'USER_LOGIN' },
//       {
//         type: 'USER_LOGIN_SUCCESS',
//         payload: { message: 'signup sucessful', token: 'sdefeffefrg' }
//       },
//       {
//         type: 'SET_CURRENT_USER',
//         payload: { newUser: null, token: 'sdefeffefrg' }
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.userSignInRequest(mockSignin)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });

//   it('returns failure when user is not successfully signed in', done => {
//     moxios.stubRequest('/api/v1/users/login', {
//       status: 400,
//       response: {
//         message: 'signup fails'
//       }
//     });

//     const expectedActions = [
//       { type: 'USER_LOGIN' },
//       {
//         type: 'USER_LOGIN_FAILS',
//         payload: { message: 'signup fails', status: 400 }
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.userSignInRequest(mockSignin)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });
// });

// describe('confirm email action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('returns success when user email is confirmed', () => {
//     moxios.stubRequest('/api/v1/passrecovery', {
//       status: 200,
//       response: {
//         message: 'Email exists'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.VERIFY_EMAIL },
//       {
//         type: actionTypes.VERIFY_EMAIL_SUCCESS,
//         payload: { message: 'Email exists', status: 200 }
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.confirmEmail()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('returns failure when user is not successfully signed in', done => {
//     moxios.stubRequest('/api/v1/passrecovery', {
//       status: 400,
//       response: {
//         message: 'Email not found'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.VERIFY_EMAIL },
//       {
//         type: actionTypes.VERIFY_EMAIL_FAILS,
//         payload: { message: 'Email not found' }
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.confirmEmail()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });
// });

// describe('get user action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('returns success when user info is received', () => {
//     moxios.stubRequest('/api/v1/users', {
//       status: 200,
//       response: {
//         userDetails: mockSignup
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.GET_USER },
//       {
//         type: actionTypes.GET_USER_SUCCESS,
//         payload: { status: 200, userDetails: mockSignup }
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.getUser()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('returns failure when user info is not received', () => {
//     moxios.stubRequest('/api/v1/users', {
//       status: 400,
//       response: {
//         mockSignup
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.GET_USER },
//       { type: actionTypes.GET_USER_FAILS, payload: { mockSignup } }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.getUser()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe('get user email action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('returns user email', () => {
//     moxios.stubRequest('/api/v1/userEmail/1', {
//       status: 200,
//       response: {
//         Email: mockSignup.email
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.GET_USER_EMAIL, payload: { Email: mockSignup.email } }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.getUserEmail('1')).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe('check password action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   const matchPassword = 'Password Match';
//   const differentPassword = 'Password does not match';

//   it('return true when password matches', () => {
//     moxios.stubRequest('/api/v1/passwordcheck', {
//       status: 200,
//       response: {
//         message: matchPassword
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.CHECK_PASSWORD },
//       {
//         type: actionTypes.CHECK_PASSWORD_SUCCESS,
//         payload: { status: 200, message: matchPassword }
//       },
//       { type: actionTypes.CLEAR_STATUS }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.checkPassword(mockPassword)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('return failure when password does not match', () => {
//     moxios.stubRequest('/api/v1/passwordcheck', {
//       status: 400,
//       response: {
//         differentPassword
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.CHECK_PASSWORD },
//       { type: actionTypes.CHECK_PASSWORD_FAILS, payload: { differentPassword } }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.checkPassword(mockPassword)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe('log user out', () => {
//   it('should log user out', () => {
//     const expectedActions = [
//       { payload: { newUser: {}, token: undefined }, type: 'SET_CURRENT_USER' }
//     ];

//     const store = mockStore({});
//     store.dispatch(actions.logout());
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

// describe('confirm code action', () => {
//   it('should return 400', () => {
//     const code = 'wrong code';
//     const data = {
//       message: code,
//       status: 400
//     };
//     const expectedActions = [
//       {
//         type: actionTypes.CHECK_CODE,
//         payload: data
//       }
//     ];

//     const store = mockStore({});
//     store.dispatch(actions.confirmCode(code));
//     expect(store.getActions()).toEqual(expectedActions);
//   });

//   it('should return 202', () => {
//     const code = 'correct';
//     const data = {
//       message: code,
//       status: 202
//     };
//     const expectedActions = [
//       {
//         type: actionTypes.CHECK_CODE,
//         payload: data
//       }
//     ];

//     const store = mockStore({});
//     store.dispatch(actions.confirmCode(code));
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

// describe('clear user state', () => {
//   it('should clear user state', () => {
//     const expectedActions = [{ type: actionTypes.CLEAR_USER_STATE }];

//     const store = mockStore({});
//     store.dispatch(actions.clearUserState());
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

// describe('update password actions', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });
//   it('returns success when update successful', () => {
//     moxios.stubRequest('/api/v1/newpassword', {
//       status: 202,
//       response: {
//         message: 'success'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.UPDATE_PASSWORD },
//       {
//         payload: {
//           status: 202,
//           message: 'success'
//         },
//         type: actionTypes.UPDATE_PASSWORD_SUCCESS
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.updatePassword(mockPassword)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('returns success when update fails', () => {
//     moxios.stubRequest('/api/v1/newpassword', {
//       status: 500,
//       response: {
//         message: 'fails'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.UPDATE_PASSWORD },
//       {
//         payload: {
//           message: 'fails'
//         },
//         type: actionTypes.UPDATE_PASSWORD_FAILS
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.updatePassword(mockPassword)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe('update user actions', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });
//   it('returns success when update successful', () => {
//     moxios.stubRequest('/api/v1/users', {
//       status: 202,
//       response: {
//         user: mockSignup,
//         message: 'success'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.UPDATE_USER },
//       {
//         payload: {
//           message: 'success',
//           user: mockSignup,
//           status: 202
//         },
//         type: actionTypes.UPDATE_USER_SUCCESS
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.updateUserDetails(mockSignup)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('returns failure when update fails', () => {
//     moxios.stubRequest('/api/v1/users', {
//       status: 500,
//       response: {
//         message: 'fails'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.UPDATE_USER },
//       {
//         payload: {
//           message: 'fails'
//         },
//         type: actionTypes.UPDATE_USER_FAILS
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.updateUserDetails(mockSignup)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

