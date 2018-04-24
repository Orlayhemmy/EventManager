import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as actionTypes from '../../actions/types';
import * as actions from '../../actions/centerActions';

const mockStore = configureMockStore([thunk]);
const Center = {
  centerName: 'Balmoral',
  capacity: 700,
  location: 'ET',
};
describe('get center selected action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center is received', (done) => {
    moxios.stubRequest('/api/v1/centers/1', {
      status: 200,
      response: {
        message: 'Center found',
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTER },
      {
        type: actionTypes.GET_CENTER_SUCCESS,
        payload: {
          message: 'Center found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenterSelected('1', 'tag')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center is not received', (done) => {
    moxios.stubRequest('/api/v1/centers/1', {
      status: 400,
      response: {
        message: 'Center not found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTER },
      {
        type: actionTypes.GET_CENTER_FAILS,
        payload: {
          message: 'Center not found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenterSelected('1', 'tag')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('get add center action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center is received', (done) => {
    moxios.stubRequest('/api/v1/centers', {
      status: 200,
      response: {
        message: 'Center created',
        Center
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_CENTER },
      {
        type: actionTypes.ADD_CENTER_SUCCESS,
        payload: {
          message: 'Center created',
          Center,
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.addCenter(Center)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center is not received', (done) => {
    moxios.stubRequest('/api/v1/centers', {
      status: 400,
      response: {
        message: 'Center not created'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_CENTER },
      {
        type: actionTypes.ADD_CENTER_FAILS,
        payload: {
          message: 'Center not created',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.addCenter(Center)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('modify center selected action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center is received', (done) => {
    moxios.stubRequest('/api/v1/centers/1', {
      status: 200,
      response: {
        message: 'Center updated successfully',
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER },
      {
        type: actionTypes.MODIFY_CENTER_SUCCESS,
        payload: {
          message: 'Center updated successfully',
        }
      },
      { type: actionTypes.GET_CENTER }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyCenter(Center, '1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center is not received', (done) => {
    moxios.stubRequest('/api/v1/centers/1', {
      status: 400,
      response: {
        message: 'Center updated successfully',
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER },
      {
        type: actionTypes.MODIFY_CENTER_FAILS,
        payload: {
          message: 'Center updated successfully',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyCenter(Center, '1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('delete center action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center is deleted', (done) => {
    moxios.stubRequest('/api/v1/centers/1', {
      status: 200,
      response: {
        message: 'Center deleted',
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER },
      {
        type: actionTypes.DELETE_CENTER_SUCCESS,
        payload: {
          message: 'Center deleted',
        }
      },
      { type: actionTypes.GET_CENTERS }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteCenter('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center is not received', (done) => {
    moxios.stubRequest('/api/v1/centers/1', {
      status: 400,
      response: {
        message: 'Center not deleted',
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER },
      {
        type: actionTypes.DELETE_CENTER_FAILS,
        payload: {
          message: 'Center not deleted',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteCenter('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('delete center status action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center status is updated', (done) => {
    moxios.stubRequest('/api/v1/centerStatus/1', {
      status: 200,
      response: {
        message: 'Center status updated',
      }
    });

    const expectedActions = [
      { type: actionTypes.CENTER_STATUS_UPDATE },
      {
        type: actionTypes.CENTER_STATUS_UPDATE_SUCCESS,
        payload: {
          message: 'Center status updated',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.centerStatus('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center status is not updated', (done) => {
    moxios.stubRequest('/api/v1/centerStatus/1', {
      status: 400,
      response: {
        message: 'Center status not updated',
      }
    });

    const expectedActions = [
      { type: actionTypes.CENTER_STATUS_UPDATE },
      {
        type: actionTypes.CENTER_STATUS_UPDATE_FAILS,
        payload: {
          message: 'Center status not updated',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.centerStatus('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
