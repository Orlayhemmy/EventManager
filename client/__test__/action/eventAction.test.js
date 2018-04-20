import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as actionTypes from '../../actions/types';
import * as actions from '../../actions/eventActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockEvent = {
  eventTitle: 'Birthday',
  date: '24/10/2018'
};

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
describe('confirm email action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  let mockToken = 'dsfgdsggdf#R$#dsgfdGDFGd.dsgSDGFDFH';

  it('returns success when user email is confirmed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: mockResponse,
      });
    });

    const expectedActions = [
      { type: actionTypes.VERIFY_EMAIL },
      { type: actionTypes.VERIFY_EMAIL_SUCCESS, payload: mockResponse }
    ];
    const store = mockStore({});

    return store.dispatch(actions.createEvent(mockEvent)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('get Events', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns events booked by user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockEvents,
      });
    });

    const expectedActions = [
      { type: actionTypes.GET_EVENTS },
      { type: actionTypes.GET_EVENTS_SUCCESS, payload: mockEvents }
    ];
    const store = mockStore({});

    return store.dispatch(actions.getEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
