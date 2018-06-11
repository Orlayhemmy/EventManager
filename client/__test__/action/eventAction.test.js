import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as actionTypes from '../../actions/types';
import * as actions from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockEvents = [
  {
    eventTitle: 'Birthday',
  },
  {
    eventTitle: 'Seminar',
  },
  {
    eventTitle: 'Talk',
  }
];


describe('get events action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when events are received', (done) => {
    moxios.stubRequest('/api/v1/userEvents', {
      status: 200,
      response: {
        message: 'Events found',
        events: mockEvents,
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS },
      {
        type: actionTypes.GET_EVENTS_SUCCESS,
        payload: {
          status: 200,
          events: mockEvents,
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when events are not received', (done) => {
    moxios.stubRequest('/api/v1/userEvents', {
      status: 400,
      response: {
        message: 'Events not found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS },
      {
        type: actionTypes.GET_EVENTS_FAIL,
        payload: {
          status: 400,
          message: 'Events not found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('get center events action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center events are received', (done) => {
    moxios.stubRequest('/api/v1/centerEvents/1', {
      status: 200,
      response: {
        message: 'Events found',
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTER_EVENTS },
      {
        type: actionTypes.GET_CENTER_EVENTS_SUCCESS,
        payload: {
          message: 'Events found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenterEvents('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when events are not received', (done) => {
    moxios.stubRequest('/api/v1/centerEvents/1', {
      status: 400,
      response: {
        message: 'Events not found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTER_EVENTS },
      {
        type: actionTypes.GET_CENTER_EVENTS_FAIL,
        payload: {
          message: 'Events not found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenterEvents('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('get event selected action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when event is received', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 200,
      response: {
        message: 'Event found',
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENT },
      {
        type: actionTypes.GET_EVENT_SUCCESS,
        payload: {
          message: 'Event found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEventSelected('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event is not received', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 400,
      response: {
        message: 'Events not found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENT },
      {
        type: actionTypes.GET_EVENT_FAILS,
        payload: {
          message: 'Events not found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEventSelected('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('get center event selected action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const data = {
    id: 1,
  };
  it('returns success when center event is modified successfully', (done) => {
    moxios.stubRequest('/api/v1/approveEvent/1', {
      status: 200,
      response: {
        message: 'Event updated',
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER_EVENT },
      {
        type: actionTypes.MODIFY_CENTER_EVENT_SUCCESS,
        payload: {
          message: 'Event updated',
        }
      },
      { type: actionTypes.GET_CENTER_EVENTS }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyCenterEvent(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when events are not received', (done) => {
    moxios.stubRequest('/api/v1/approveEvent/1', {
      status: 400,
      response: {
        message: 'Event not found'
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER_EVENT },
      {
        type: actionTypes.MODIFY_CENTER_EVENT_FAILS,
        payload: {
          message: 'Event not found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyCenterEvent(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('modify event action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when center event is modified successfully', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 200,
      response: {
        message: 'Event updated',
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_EVENT },
      {
        type: actionTypes.MODIFY_EVENT_SUCCESS,
        payload: {
          message: 'Event updated',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyEvent('1', 'data')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when events are not received', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 400,
      response: {
        message: 'Event update fails'
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_EVENT },
      {
        type: actionTypes.MODIFY_EVENT_FAILS,
        payload: {
          message: 'Event update fails',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyEvent('1', 'data')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('delete center event action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  const data = {
    id: 1,
    centerId: 2
  };
  it('returns success when center event is deleted successfully', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 200,
      response: {
        message: 'Event deleted',
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER_EVENT },
      {
        type: actionTypes.DELETE_CENTER_EVENT_SUCCESS,
        payload: {
          message: 'Event deleted',
        }
      },
      { type: actionTypes.GET_CENTER_EVENTS }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteCenterEvent(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event is not deleted', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 400,
      response: {
        message: 'Event not deleted'
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER_EVENT },
      {
        type: actionTypes.DELETE_CENTER_EVENT_FAILS,
        payload: {
          message: 'Event not deleted',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteCenterEvent(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('delete event action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when event is deleted successfully', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 200,
      response: {
        message: 'Event deleted',
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_EVENT },
      {
        type: actionTypes.DELETE_EVENT_SUCCESS,
        payload: {
          message: 'Event deleted',
        }
      },
      { type: actionTypes.GET_EVENTS }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteEvent('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event is not deleted', (done) => {
    moxios.stubRequest('/api/v1/events/1', {
      status: 400,
      response: {
        message: 'Event not deleted'
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_EVENT },
      {
        type: actionTypes.DELETE_EVENT_FAILS,
        payload: {
          message: 'Event not deleted',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteEvent('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('event booked action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when events booked count is returned', (done) => {
    moxios.stubRequest('/api/v1/eventsbookedcount/1', {
      status: 200,
      response: {
        count: '3',
        message: 'Events found',
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS_BOOKED_COUNT },
      {
        type: actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS,
        payload: {
          count: '3',
          message: 'Events found',
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(actions.eventBooked('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event booked count is not received', (done) => {
    moxios.stubRequest('/api/v1/eventsbookedcount/1', {
      status: 400,
      response: {
        message: 'Events not found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS_BOOKED_COUNT },
      {
        type: actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL,
        payload: {
          message: 'Events not found',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.eventBooked('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('date joined action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when date joined is returned', (done) => {
    moxios.stubRequest('/api/v1/datejoined/1', {
      status: 200,
      response: {
        dateJoined: '12/12/2012',
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_DATE_JOINED },
      {
        type: actionTypes.DATE_JOINED_SUCCESS,
        payload: {
          dateJoined: '12/12/2012',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.dateJoined('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when the date joined is not received', (done) => {
    moxios.stubRequest('/api/v1/datejoined/1', {
      status: 400,
      response: {
        message: 'Error'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_DATE_JOINED },
      {
        type: actionTypes.DATE_JOINED_FAILS,
        payload: {
          message: 'Error',
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.dateJoined('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('other event actions', () => {
  it('should clear event state', () => {
    const expectedActions = [{ type: actionTypes.CLEAR_EVENT_STATE }];

    const store = mockStore({});
    store.dispatch(actions.clearEventState());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set current event', () => {
    const expectedActions = [
      {
        payload: mockEvents[0],
        type: actionTypes.SET_CURRENT_EVENT
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.setCurrentEvent(mockEvents[0]));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('create event action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when event is created', (done) => {
    moxios.stubRequest('/api/v1/events', {
      status: 200,
      response: {
        message: 'Event Created',
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_EVENT },
      {
        type: actionTypes.ADD_EVENT_SUCCESS,
        payload: {
          message: 'Event Created',
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(actions.createEvent(mockEvents[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns success when event is created', (done) => {
    moxios.stubRequest('/api/v1/events', {
      status: 500,
      response: {
        message: 'Event cannot be created',
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_EVENT },
      {
        type: actionTypes.ADD_EVENT_FAILS,
        payload: {
          message: 'Event cannot be created',
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(actions.createEvent(mockEvents[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
