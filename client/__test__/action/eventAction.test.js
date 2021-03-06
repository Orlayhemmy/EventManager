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
    eventTitle: 'Birthday'
  },
  {
    eventTitle: 'Seminar'
  },
  {
    eventTitle: 'Talk'
  }
];
const Center = {
  centerName: 'Balmoral',
  capacity: 700,
  location: 'ET',
  id: 1
};
const Event = {
  id: 1
}
const user = {
  id: 1
}
describe('get events action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when events are received', done => {
    moxios.stubRequest('/api/v1/userEvents', {
      status: 200,
      response: {
        events: mockEvents
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS },
      {
        type: actionTypes.GET_EVENTS_SUCCESS,
        payload: {
          status: 200,
          events: mockEvents
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEvents(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when events are not received', done => {
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
          message: 'Events not found'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEvents(1)).then(() => {
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

  it('returns success when center events are received', done => {
    moxios.stubRequest(`/api/v1/centerEvents/${Center.id}`, {
      status: 200,
      response: {
        message: 'Events found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_CENTER_EVENTS },
      {
        type: actionTypes.GET_CENTER_EVENTS_SUCCESS,
        payload: {
          message: 'Events found'
        }
      }
    ];
    localStorage.setItem('centerId', 1);
    const store = mockStore({});

    return store.dispatch(actions.getCenterEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when events are not received', done => {
    moxios.stubRequest(`/api/v1/centerEvents/${Center.id}`, {
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
          message: 'Events not found'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getCenterEvents()).then(() => {
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

  it('returns success when event is received', done => {
    localStorage.setItem('event', 1);
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
      status: 200,
      response: {
        event: mockEvents[0]
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENT },
      {
        type: actionTypes.GET_EVENT_SUCCESS,
        payload: {
          event: mockEvents[0],
          status: 200
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEventSelected()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event is not received', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
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
          message: 'Events not found'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEventSelected()).then(() => {
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
    id: 1
  };
  it('returns success when center event is modified successfully', done => {
    moxios.stubRequest(`/api/v1/approveEvent/${Event.id}`, {
      status: 202,
      response: {
        message: 'Event updated',
        event: mockEvents[0]
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER_EVENT },
      {
        type: actionTypes.MODIFY_CENTER_EVENT_SUCCESS,
        payload: {
          message: 'Event updated',
          status: 202,
          event: mockEvents[0]
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyCenterEvent(Event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when center event is modified successfully', done => {
    moxios.stubRequest(`/api/v1/approveEvent/${Event.id}`, {
      status: 400,
      response: {
        message: 'Update fails'
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_CENTER_EVENT },
      {
        type: actionTypes.MODIFY_CENTER_EVENT_FAILS,
        payload: {
          message: 'Update fails'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyCenterEvent(Event)).then(() => {
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

  it('returns success when event is modified successfully', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
      status: 202,
      response: {
        message: 'Event updated',
        event: mockEvents[0]
      }
    });

    const expectedActions = [
      { type: actionTypes.MODIFY_EVENT },
      {
        type: actionTypes.MODIFY_EVENT_SUCCESS,
        payload: {
          message: 'Event updated',
          status: 202,
          event: mockEvents[0]
        }
      },
      { type: actionTypes.CLEAR_EVENT_STATE }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyEvent(Event.id, mockEvents[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event is not modified', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
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
          message: 'Event update fails'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.modifyEvent(Event.id, mockEvents[0])).then(() => {
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
  it('returns success when center event is deleted successfully', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
      status: 200,
      response: {
        message: 'Event deleted',
        id: data.id
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_CENTER_EVENT },
      {
        type: actionTypes.DELETE_CENTER_EVENT_SUCCESS,
        payload: {
          message: 'Event deleted',
          status: 200,
          id: data.id
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteCenterEvent(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when centerevent is not deleted', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
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
          message: 'Event not deleted'
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
  const event = `delete-${Event.id}`;
  it('returns success when event is deleted successfully', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
      status: 200,
      response: {
        message: 'Event deleted',
        id: '1'
      }
    });

    const expectedActions = [
      { type: actionTypes.DELETE_EVENT },
      {
        type: actionTypes.DELETE_EVENT_SUCCESS,
        payload: {
          message: 'Event deleted',
          status: 200,
          id: 1
        }
      },
      { type: actionTypes.CLEAR_EVENT_STATE },
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteEvent(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event is not deleted', done => {
    moxios.stubRequest(`/api/v1/events/${Event.id}`, {
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
          message: 'Event not deleted'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.deleteEvent(event)).then(() => {
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

  it('returns success when events booked count is returned', done => {
    moxios.stubRequest('/api/v1/eventsbookedcount', {
      status: 200,
      response: {
        eventBookedCount: '3',
        message: 'Events found'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS_BOOKED_COUNT },
      {
        type: actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS,
        payload: {
          eventBookedCount: '3',
          message: 'Events found',
          status: 200
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(actions.eventBooked()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when event booked count is not received', done => {
    moxios.stubRequest('/api/v1/eventsbookedcount', {
      status: 500,
      response: {
        message: 'Error'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS_BOOKED_COUNT },
      {
        type: actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL,
        payload: {
          message: 'Error',
          status: 500
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.eventBooked()).then(() => {
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

  it('returns success when date joined is returned', done => {
    moxios.stubRequest(`/api/v1/datejoined/${Event.id}`, {
      status: 200,
      response: {
        dateJoined: '12/12/2012'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_DATE_JOINED },
      {
        type: actionTypes.DATE_JOINED_SUCCESS,
        payload: {
          dateJoined: '12/12/2012'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.dateJoined(user.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns failure when the date joined is not received', done => {
    moxios.stubRequest(`/api/v1/datejoined/${Event.id}`, {
      status: 500,
      response: {
        message: 'Error'
      }
    });

    const expectedActions = [
      { type: actionTypes.GET_DATE_JOINED },
      {
        type: actionTypes.DATE_JOINED_FAILS,
        payload: {
          message: 'Error'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.dateJoined(user.id)).then(() => {
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
    const eventId = 1;
    const centerId = 2;
    const expectedActions = [
      {
        type: actionTypes.SET_CURRENT_EVENT
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.setCurrentEvent(eventId, centerId));
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

  it('returns success when event is created', done => {
    moxios.stubRequest('/api/v1/events', {
      status: 200,
      response: {
        message: 'Event Created'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_EVENT },
      {
        type: actionTypes.ADD_EVENT_SUCCESS,
        payload: {
          message: 'Event Created',
          status: 200
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(actions.createEvent(mockEvents[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('returns success when event is not created', done => {
    moxios.stubRequest('/api/v1/events', {
      status: 500,
      response: {
        message: 'Event cannot be created'
      }
    });

    const expectedActions = [
      { type: actionTypes.ADD_EVENT },
      {
        type: actionTypes.ADD_EVENT_FAILS,
        payload: {
          message: 'Event cannot be created'
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

describe('check date action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns success when date is available', done => {
    moxios.stubRequest('/api/v1/checkDate', {
      status: 200,
      response: {
        message: 'available',
        isAvailable: true
      }
    });

    const expectedActions = [
      { type: actionTypes.CHECK_DATE },
      {
        type: actionTypes.CHECK_DATE_SUCCESS,
        payload: {
          message: 'available',
          isAvailable: true,
          status: 200
        }
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.checkAvailableDate(mockEvents[0]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('returns failure when date is not available', done => {
    moxios.stubRequest('/api/v1/checkDate', {
      status: 500,
      response: {
        message: 'date not available'
      }
    });

    const expectedActions = [
      { type: actionTypes.CHECK_DATE },
      {
        type: actionTypes.CHECK_DATE_FAILS,
        payload: {
          message: 'date not available',
          status: 500
        }
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.checkAvailableDate(mockEvents[0]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
