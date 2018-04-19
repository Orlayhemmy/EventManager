import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import * as actionTypes from '../../actions/types';
import * as actions from '../../actions/signInActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSignup = {
  fullname: 'Orlayhemmy',
  email: 'mail@mail.com',
  password: 'userPassword',
};

const mockResponse = {
  message: 'Email Found',
  email: 'mail@mail.com'
};

const mockSignin = {
  message: 'You are now logged In',
};

const mockCode = {
  shortCode: 'efefEef3sd'
};

const token = 'dshfbsjfs.safhbsjhbfsdjfbjhfbj#$#hjvr3#Rdchvbjsfbjs';
// const mockAdapter = new MockAdapter(axios);
// describe('Lib', () => {
//   beforeEach(() => {
//     mockAdapter.restore();
//   });

//   it('Should return data from response', () => {
//     mockAdapter.onPost('/api/v1/users', mockSignup).reply(200, {
//       data: {
//         token,
//         message: 'You are now Signed Up',
//       }
//     });
//     const expectedActions = [
//       { type: actionTypes.USER_SIGNUP },
//       { type: actionTypes.USER_SIGNUP_SUCCESS, payload: mockSignup }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.userSignupRequest(mockSignup)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe('user signup action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('returns success when user is successfully signed up', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 201,
//         response: mockResponse
//       });
//     });

//     const expectedActions = [
//       { type: actionTypes.USER_SIGNUP },
//       { type: actionTypes.USER_SIGNUP_SUCCESS, payload: mockResponse }
//     ];
//     const store = mockStore({ payload: {} });

//     return store.dispatch(actions.userSignupRequest(mockSignup)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
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

//   it('returns success when user is successfully signed in', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: mockSignup.email
//       });
//     });

//     const expectedActions = [
//       { type: actionTypes.USER_LOGIN },
//       { type: actionTypes.USER_LOGIN_SUCCESS, payload: mockSignin }
//     ];
//     const store = mockStore({ payload: {} });

//     return store.dispatch(actions.userSignInRequest()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

describe('confirm email action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when user email is confirmed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponse,
      });
    });

    const expectedActions = [
      { type: actionTypes.VERIFY_EMAIL },
      { type: actionTypes.VERIFY_EMAIL_SUCCESS, payload: mockResponse }
    ];
    const store = mockStore({});

    return store.dispatch(actions.confirmEmail(mockResponse.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('generate code action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when code is received', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: mockCode
      });
    });

    const expectedActions = [
      { type: actionTypes.GET_CODE },
      { type: actionTypes.GET_CODE_SUCCESS, payload: mockCode }
    ];
    const store = mockStore({});

    return store.dispatch(actions.generateCode()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('get user action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when code is received', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: mockSignup
      });
    });

    const expectedActions = [
      { type: actionTypes.GET_USER },
      { type: actionTypes.GET_USER_SUCCESS, payload: mockSignup }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('get user email action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns user email', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: mockSignup.email
      });
    });

    const expectedActions = [
      { type: actionTypes.GET_USER_EMAIL, payload: mockSignup.email }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getUserEmail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('check password action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const mockPassword = 'qwerty';
  const message = 'Password Match';
  it('return true', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: message
      });
    });

    const expectedActions = [
      { type: actionTypes.CHECK_PASSWORD },
      { type: actionTypes.CHECK_PASSWORD_SUCCESS, payload: message },
      { type: actionTypes.CLEAR_STATUS }
    ];
    const store = mockStore({});

    return store.dispatch(actions.checkPassword(mockPassword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// describe('check password action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   const id = '1';
//   const data = 'I am a very good boy';
//   const url = 'www.center.com/ddfsgdfhg';
//   it('return true', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         response: url
//       });
//     });

//     const expectedActions = [
//       { type: actionTypes.UPLOAD_IMAGE },
//       { type: actionTypes.UPLOAD_IMAGE_SUCCESS, payload: url },
//       { type: actionTypes.UPDATE_USER }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.uploadUserImage(id, data)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe('set current user', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('return current user details', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         response: {
//           mockSignup,
//           token
//         }
//       });
//     });

//     const expectedActions = [
//       { type: actionTypes.SET_CURRENT_USER, payload: { mockSignup, token } }
//     ];
//     const store = mockStore({});

//     return store.dispatch(actions.setCurrentUser(mockSignup, token)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

describe('send mail action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  const message = 'Mail sent';
  it('return true', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: message
      });
    });

    const expectedActions = [
      { type: actionTypes.SEND_MAIL },
      { type: actionTypes.SEND_MAIL_SUCCESS, payload: message }
    ];
    const store = mockStore({});

    return store.dispatch(actions.sendMail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
