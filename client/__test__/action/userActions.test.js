import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as actions from '../../actions/userActions';
import * as actionTypes from '../../actions/types';

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

const mockCode = 'RRERW#$#@$@';

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
      }
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

  it('returns success when user is successfully signed in', (done) => {
    moxios.stubRequest('/api/v1/users/login', {
      status: 200,
      response: {
        message: 'signup sucessful',
        token: 'sdefeffefrg'
      }
    });

    const expectedActions = [
      { type: 'USER_LOGIN' },
      {
        type: 'USER_LOGIN_SUCCESS',
        payload: { message: 'signup sucessful', token: 'sdefeffefrg' }
      },
      {
        type: 'SET_CURRENT_USER',
        payload: { newUser: null, token: 'sdefeffefrg' }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.userSignInRequest(mockSignin)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when user is not successfully signed in', (done) => {
    moxios.stubRequest('/api/v1/users/login', {
      status: 400,
      response: {
        message: 'signup fails',
      }
    });

    const expectedActions = [
      { type: 'USER_LOGIN' },
      {
        type: 'USER_LOGIN_FAILS',
        payload: { message: 'signup fails' }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.userSignInRequest(mockSignin)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('confirm email action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when user email is confirmed', () => {
    moxios.stubRequest('/api/v1/passrecovery', {
      status: 200,
      response: {
        message: 'Email exists',
      }
    });

    const expectedActions = [
      { type: actionTypes.VERIFY_EMAIL },
      { type: actionTypes.VERIFY_EMAIL_SUCCESS, payload: { message: 'Email exists' } }
    ];
    const store = mockStore({});

    return store.dispatch(actions.confirmEmail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('returns failure when user is not successfully signed in', (done) => {
    moxios.stubRequest('/api/v1/passrecovery', {
      status: 400,
      response: {
        message: 'Email not found',
      }
    });

    const expectedActions = [
      { type: actionTypes.VERIFY_EMAIL },
      {
        type: actionTypes.VERIFY_EMAIL_FAILS,
        payload: { message: 'Email not found' }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.confirmEmail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
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
    moxios.stubRequest('/api/v1/shortcode', {
      status: 200,
      response: {
        mockCode,
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CODE },
      { type: actionTypes.GET_CODE_SUCCESS, payload: { mockCode } }
    ];
    const store = mockStore({});

    return store.dispatch(actions.generateCode()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('returns failure when code is not received', () => {
    moxios.stubRequest('/api/v1/shortcode', {
      status: 400,
      response: {
        mockCode,
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CODE },
      { type: actionTypes.GET_CODE_FAILS, payload: { mockCode } }
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

  it('returns success when user info is received', () => {
    moxios.stubRequest('/api/v1/users', {
      status: 200,
      response: {
        mockSignup,
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_USER },
      { type: actionTypes.GET_USER_SUCCESS, payload: { mockSignup } }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('returns failure when user info is not received', () => {
    moxios.stubRequest('/api/v1/users', {
      status: 400,
      response: {
        mockSignup,
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_USER },
      { type: actionTypes.GET_USER_FAILS, payload: { mockSignup } }
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
    moxios.stubRequest('/api/v1/userEmail/1', {
      status: 200,
      response: {
        Email: mockSignup.email,
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_USER_EMAIL, payload: { Email: mockSignup.email } }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getUserEmail('1')).then(() => {
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
  const matchPassword = 'Password Match';
  const differentPassword = 'Password does not match';

  it('return true when password matches', () => {
    moxios.stubRequest('/api/v1/passwordcheck', {
      status: 200,
      response: {
        matchPassword
      }
    });

    const expectedActions = [
      { type: actionTypes.CHECK_PASSWORD },
      { type: actionTypes.CHECK_PASSWORD_SUCCESS, payload: { matchPassword } },
      { type: actionTypes.CLEAR_STATUS }
    ];
    const store = mockStore({});

    return store.dispatch(actions.checkPassword(mockPassword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('return failure when password does not match', () => {
    moxios.stubRequest('/api/v1/passwordcheck', {
      status: 400,
      response: {
        differentPassword,
      }
    });

    const expectedActions = [
      { type: actionTypes.CHECK_PASSWORD },
      { type: actionTypes.CHECK_PASSWORD_FAILS, payload: { differentPassword } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.checkPassword(mockPassword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('update user details action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const updateSuccess = 'Changes Applied Successfully';
  const updateFails = 'User not found';

  it('return true when user info updates', () => {
    moxios.stubRequest('/api/v1/users', {
      status: 200,
      response: {
        updateSuccess,
        token: '##EEDDDFDGFE',
      }
    });

    const expectedActions = [
      { type: actionTypes.UPDATE_USER },
      {
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: {
          updateSuccess,
          token: '##EEDDDFDGFE',
        }
      },
      {
        type: actionTypes.SET_CURRENT_USER,
        payload: {
          newUser: null,
          token: '##EEDDDFDGFE'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.updateUserDetails(mockSignup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('return failure when user info fails to update', () => {
    moxios.stubRequest('/api/v1/users', {
      status: 400,
      response: {
        updateFails,
      }
    });

    const expectedActions = [
      { type: actionTypes.UPDATE_USER },
      { type: actionTypes.UPDATE_USER_FAILS, payload: { updateFails } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.updateUserDetails(mockSignup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

