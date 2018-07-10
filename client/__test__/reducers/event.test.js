// import expect from 'expect';
// import eventReducer from '../../reducers/event';
// import * as actionTypes from '../../actions/types';

// describe.only('center reducers', () => {
//   const initialState = {
//     events: [],
//     disableDates: [],
//     error: null,
//     event: {},
//     isEvent: false,
//     isAvailable: ''
//   };

//   // it('should return the initial state', () => {
//   //   expect((undefined, {})).toEqual(initialState);
//   // });

//   // it('should return inital state on clear state', (done) => {
//   //   const action = { type: actionTypes.CLEAR_CENTER_STATE };
//   //   expect(eventReducer(initialState, action)).toEqual({
//   //     ...initialState,
//   //     loading: '',
//   //     loaded: '',
//   //     message: '',
//   //     status: ''
//   //   });
//   //   done();
//   // });

//   it('should return inital state on get events', (done) => {
//     const action = { type: actionTypes.GET_EVENTS };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: '',
//       status: '',
//       error: ''
//     });
//     done();
//   });

//   it('should return success code on get events', (done) => {
//     const action = {
//       type: actionTypes.GET_EVENTS_SUCCESS,
//       payload: {
//         events: [],
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       events: action.payload.events
//     });
//     done();
//   });

//   it('should return error message on get events', (done) => {
//     const action = {
//       type: actionTypes.GET_EVENTS_FAIL,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       message: action.payload.message,
//     });
//     done();
//   });

//   it('should return inital state on get center events', (done) => {
//     const action = { type: actionTypes.GET_CENTER_EVENTS };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       loaded: false,
//       message: ''
//     });
//     done();
//   });

//   it('should return success code on get center events', (done) => {
//     const action = {
//       type: actionTypes.GET_CENTER_EVENTS_SUCCESS,
//       payload: {
//         events: [],
//         disablesDates: []
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       events: action.payload.events,
//       disableDates: action.payload.disablesDates
//     });
//     done();
//   });

//   it('should return error message on get center events', (done) => {
//     const action = {
//       type: actionTypes.GET_CENTER_EVENTS_FAIL,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message,
//     });
//     done();
//   });

//   it('should return inital state on get event', (done) => {
//     const action = { type: actionTypes.GET_EVENT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on get center event', (done) => {
//     const action = {
//       type: actionTypes.GET_EVENT_SUCCESS,
//       payload: {
//         event: {},
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       event: action.payload.event
//     });
//     done();
//   });

//   it('should return error message on ge event', (done) => {
//     const action = {
//       type: actionTypes.GET_EVENT_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       message: action.payload.message,
//     });
//     done();
//   });

//   it('should return inital state on modify event', (done) => {
//     const action = { type: actionTypes.MODIFY_EVENT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on modify event', (done) => {
//     const action = {
//       type: actionTypes.MODIFY_EVENT_SUCCESS,
//       payload: {
//         message: 'Update successful',
//         status: 202,
//         event: {}
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       message: action.payload.message,
//       status: 202,
//       event: {}
//     });
//     done();
//   });

//   it('should return error message on modify event', (done) => {
//     const action = {
//       type: actionTypes.MODIFY_EVENT_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message,
//     });
//     done();
//   });

//   it('should return inital state on delete center event', (done) => {
//     const action = { type: actionTypes.DELETE_CENTER_EVENT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//     });
//     done();
//   });

//   it('should return success code on delete center event', (done) => {
//     const action = {
//       type: actionTypes.DELETE_CENTER_EVENT_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return error message on delete center event', (done) => {
//     const action = {
//       type: actionTypes.DELETE_CENTER_EVENT_SUCCESS,
//       payload: {
//         message: 'Deleted',
//         status: 200
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       message: action.payload.message,
//       status: 200
//     });
//     done();
//   });

//   it('should return inital state on add event', (done) => {
//     const action = { type: actionTypes.ADD_EVENT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on add event', (done) => {
//     const action = {
//       type: actionTypes.ADD_EVENT_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return error message on add event', (done) => {
//     const action = {
//       type: actionTypes.ADD_EVENT_SUCCESS,
//       payload: {
//         message: 'Event added',
//         status: 201
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       message: action.payload.message,
//       status: 201
//     });
//     done();
//   });

//   it('should return inital state on get events booked', (done) => {
//     const action = { type: actionTypes.GET_EVENTS_BOOKED_COUNT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return error code on get events booked', (done) => {
//     const action = {
//       type: actionTypes.GET_EVENTS_BOOKED_COUNT_FAIL,
//       payload: {
//         message: 'Error',
//         status: 500
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message,
//       status: action.payload.status
//     });
//     done();
//   });

//   it('should return success message on get events booked', (done) => {
//     const action = {
//       type: actionTypes.GET_EVENTS_BOOKED_COUNT_SUCCESS,
//       payload: {
//         message: 'Events count',
//         eventBookedCount: 7
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       message: action.payload.message,
//       eventBookedCount: action.payload.eventBookedCount,
//     });
//     done();
//   });

//   it('should return inital state on modify center event', (done) => {
//     const action = { type: actionTypes.MODIFY_CENTER_EVENT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       loaded: false,
//       message: '',
//     });
//     done();
//   });

//   it('should return error code on modify center event', (done) => {
//     const action = {
//       type: actionTypes.MODIFY_CENTER_EVENT_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message,
//     });
//     done();
//   });

//   it('should return success message on modify center event', (done) => {
//     const action = {
//       type: actionTypes.MODIFY_CENTER_EVENT_SUCCESS,
//       payload: {
//         message: 'Update successful',
//         status: 202,
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       message: action.payload.message,
//       loading: false,
//       loaded: true,
//       status: 202,
//     });
//     done();
//   });

//   it('should return inital state on delete center event', (done) => {
//     const action = { type: actionTypes.DELETE_EVENT };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on delete event', (done) => {
//     const action = {
//       type: actionTypes.DELETE_EVENT_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return error message on delete center event', (done) => {
//     const action = {
//       type: actionTypes.DELETE_EVENT_SUCCESS,
//       payload: {
//         message: 'Deleted',
//         status: 200
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       message: action.payload.message,
//       status: 200
//     });
//     done();
//   });

//   it('should return inital state on event selected', (done) => {
//     const action = { type: actionTypes.CLEAR_EVENT_STATE };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return inital state on event selected', (done) => {
//     const action = {
//       type: actionTypes.SET_CURRENT_EVENT,
//       payload: {
//         eventId: 1
//       }
//     };
//     expect(eventReducer(initialState, action)).toEqual({
//       ...initialState,
//       isEvent: true,
//       event: action.payload
//     });
//     done();
//   });
// });
