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
  location: 'ET'
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
        message: 'Center found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTER },
      {
        type: actionTypes.GET_CENTER_SUCCESS,
        payload: {
          message: 'Center found'
        }
      }
    ];
    localStorage.setItem('centerId', '1');
    const store = mockStore({});

    return store.dispatch(actions.getCenterSelected()).then(() => {
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
          message: 'Center not found'
        }
      }
    ];
    localStorage.setItem('centerId', '1');
    const store = mockStore({});

    return store.dispatch(actions.getCenterSelected()).then(() => {
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
        message: 'Center updated successfully'
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER },
      {
        type: actionTypes.MODIFY_CENTER_SUCCESS,
        payload: {
          message: 'Center updated successfully'
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
        message: 'Center updated successfully'
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER },
      {
        type: actionTypes.MODIFY_CENTER_FAILS,
        payload: {
          message: 'Center updated successfully'
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
        message: 'Center deleted'
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER },
      {
        type: actionTypes.DELETE_CENTER_SUCCESS,
        payload: {
          message: 'Center deleted'
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
        message: 'Center not deleted'
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER },
      {
        type: actionTypes.DELETE_CENTER_FAILS,
        payload: {
          message: 'Center not deleted'
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
        message: 'Center status updated'
      }
    });

    const expectedActions = [
      { type: actionTypes.CENTER_STATUS_UPDATE },
      {
        type: actionTypes.CENTER_STATUS_UPDATE_SUCCESS,
        payload: {
          message: 'Center status updated'
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
        message: 'Center status not updated'
      }
    });

    const expectedActions = [
      { type: actionTypes.CENTER_STATUS_UPDATE },
      {
        type: actionTypes.CENTER_STATUS_UPDATE_FAILS,
        payload: {
          message: 'Center status not updated'
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

describe('other center actions', () => {
  const data = {
    center: {
      id: '2'
    }
  };
  localStorage.setItem('center', 'Ara Hall');
  it('should clear center in localStorage', () => {
    const expectedActions = [{ type: actionTypes.CLEAR_CENTER_STATE }];

    const store = mockStore({});
    store.dispatch(actions.clearCenterStorage());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set a current center', () => {
    const expectedActions = [
      {
        payload: {
          center: {
            id: '2'
          }
        },
        type: actionTypes.SET_CURRENT_CENTER
      },
      {
        type: actionTypes.GET_CENTER_EVENTS
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.setCurrentCenter(data));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return center selected', () => {
    const expectedActions = [
      {
        payload: {
          center: {
            id: '2'
          }
        },
        type: actionTypes.CENTER_SELECTED
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.centerSelected(data));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return center selected', () => {
    const expectedActions = [{ type: 'CENTER' }];

    const store = mockStore({});
    store.dispatch(actions.viewCenterSelected(data.center.id));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('get centers action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  const data = {};
  it('returns success when centers are received', (done) => {
    moxios.stubRequest('/api/v1/centers', {
      status: 200,
      response: {
        message: 'Centers found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTERS },
      {
        payload: {
          message: 'Centers found'
        },
        type: actionTypes.GET_CENTERS_SUCCESS
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenters(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when centers are not received', (done) => {
    moxios.stubRequest('/api/v1/centers', {
      status: 500,
      response: {
        message: 'Sorry there was an error'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTERS },
      {
        payload: {
          message: 'Sorry there was an error'
        },
        type: actionTypes.GET_CENTERS_FAIL
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenters()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('add centers action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('returns success when center is added', (done) => {
    moxios.stubRequest('/api/v1/centers', {
      status: 200,
      response: {
        message: 'Centers successfully added'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_CENTER },
      {
        payload: {
          message: 'Centers successfully added'
        },
        type: actionTypes.ADD_CENTER_SUCCESS
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.addCenter(Center)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center is not added', (done) => {
    moxios.stubRequest('/api/v1/centers', {
      status: 500,
      response: {
        message: 'There was an error when adding center'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_CENTER },
      {
        payload: {
          message: 'There was an error when adding center'
        },
        type: actionTypes.ADD_CENTER_FAILS
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.addCenter('Center')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('upload image centers action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('returns success when image is uploaded', (done) => {
    moxios.stubRequest('https://api.cloudinary.com/v1_1/kalel/image/upload', {
      status: 200,
      response: {
        message: 'image uploaded successfully'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_IMAGE },
      { type: actionTypes.ADD_CENTER }
    ];
    const store = mockStore({});

    return store.dispatch(actions.uploadImage(Center, 'Image')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns error when image is not uploaded', (done) => {
    moxios.stubRequest('https://api.cloudinary.com/v1_1/kalel/image/upload', {
      status: 500,
      response: {
        message: 'image cannot be uploaded'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_IMAGE },
      {
        payload: { message: 'image cannot be uploaded' },
        type: actionTypes.ADD_IMAGE_FAILS
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.uploadImage(Center, 'Image')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
