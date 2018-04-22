import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as actions from '../../actions/signInActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSignup = {
  fullname: 'Orlayhemmy',
  email: 'mail@mail.com',
  password: 'userPassword',
};

const mockSignin = {
  loginEmail: 'mail@mail.com',
  loginPassword: 'userPassword',
};

describe('user signup action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when user is successfully signed up', (done) => {
    moxios.stubRequest('/api/v1/users', {
      status: 201,
      response: {
        message: 'signup sucessful',
        token: 'sdefeffefrg'
      }
    });

    const expectedActions = [
      { type: 'USER_SIGNUP' },
      {
        type: 'USER_SIGNUP_SUCCESS',
        payload: { message: 'signup sucessful', token: 'sdefeffefrg' }
      },
      {
        type: 'SET_CURRENT_USER',
        payload: { newUser: null, token: 'sdefeffefrg' }
      },
      { type: 'SEND_MAIL' }
    ];
    const store = mockStore({});

    return store.dispatch(actions.userSignupRequest(mockSignup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when user is not successfully signed up', (done) => {
    moxios.stubRequest('/api/v1/users', {
      status: 400,
      response: {
        message: 'signup fails',
      }
    });

    const expectedActions = [
      { type: 'USER_SIGNUP' },
      {
        type: 'USER_SIGNUP_FAILS',
        payload: { message: 'signup fails' }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.userSignupRequest(mockSignup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('user signin action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when user is successfully signed up', (done) => {
    moxios.stubRequest('/users/login', {
      status: 200,
      response: {
        message: 'signup sucessful',
        token: 'sdefeffefrg'
      }
    });

    const expectedActions = [
      { type: 'USER_SIGNIN' },
      {
        type: 'USER_SIGNIN_SUCCESS',
        payload: { message: 'signup sucessful', token: 'sdefeffefrg' }
      },
      {
        type: 'SET_CURRENT_USER',
        payload: { newUser: null, token: 'sdefeffefrg' }
      },
      { type: 'SEND_MAIL' }
    ];
    const store = mockStore({});

    return store.dispatch(actions.userSignInRequest(mockSignin)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

xdescribe('confirm email action', () => {
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

xdescribe('generate code action', () => {
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

xdescribe('get user action', () => {
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

xdescribe('get user email action', () => {
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

xdescribe('check password action', () => {
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


