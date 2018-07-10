// import expect from 'expect';
// import centerReducer from '../../reducers/center';
// import * as actionTypes from '../../actions/types';

// describe.only('center reducers', () => {
//   const initialState = {
//     centers: [],
//     center: {
//       facilities: []
//     },
//     paginatedCenters: []
//   };
//   const mockCenters = [
//     { centerName: 'balmoral', id: 0 },
//     { centerName: 'epic', id: 1 },
//     { centerName: 'andela', id: 2 },
//     { centerName: 'faith', id: 3 },
//     { centerName: 'plaza', id: 4 },
//     { centerName: 'zeng', id: 5 },
//     { centerName: 'kingdom', id: 6 },
//     { centerName: 'aurora', id: 7 }
//   ];

//   let action = {};
//   it('should return the initial state', () => {
//     expect(centerReducer(undefined, action)).toEqual(initialState);
//   });

//   it('should return inital state on clear state', done => {
//     action = { type: actionTypes.CLEAR_CENTER_STATE };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: '',
//       loaded: '',
//       message: '',
//       status: ''
//     });
//     done();
//   });

//   it('should return inital state on get centers', done => {
//     action = { type: actionTypes.GET_CENTERS };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       status: '',
//       error: '',
//       message: ''
//     });
//     done();
//   });

//   it('should return success code on get centers', done => {
//     action = {
//       type: actionTypes.GET_CENTERS_SUCCESS,
//       payload: {
//         centers: mockCenters,
//         message: ''
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       centers: action.payload.centers,
//       message: '',
//       isNext: true,
//       paginatedCenters: [
//         { centerName: 'balmoral', id: 0 },
//         { centerName: 'epic', id: 1 },
//         { centerName: 'andela', id: 2 },
//         { centerName: 'faith', id: 3 },
//         { centerName: 'plaza', id: 4 },
//       ],
//       pages: 2
//     });
//     done();
//   });

//   it('should return error message on get centers', done => {
//     action = {
//       type: actionTypes.GET_CENTERS_FAIL,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on get center', done => {
//     action = { type: actionTypes.GET_CENTER };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: ''
//     });
//     done();
//   });

//   it('should return success code on get center', done => {
//     action = {
//       type: actionTypes.GET_CENTER_SUCCESS,
//       payload: {
//         center: []
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       center: action.payload.center
//     });
//     done();
//   });

//   it('should return error message on get center', done => {
//     action = {
//       type: actionTypes.GET_CENTER_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on modify center', done => {
//     action = { type: actionTypes.MODIFY_CENTER };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       message: ''
//     });
//     done();
//   });

//   it('should return success code on modify center', done => {
//     action = {
//       type: actionTypes.MODIFY_CENTER_SUCCESS,
//       payload: {
//         message: 'Update successful',
//         status: 202,
//         center: {}
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       message: action.payload.message,
//       status: 202,
//       center: {}
//     });
//     done();
//   });

//   it('should return error message on get center', done => {
//     action = {
//       type: actionTypes.MODIFY_CENTER_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on modify center', done => {
//     action = { type: actionTypes.DELETE_CENTER };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on delete center', done => {
//     action = {
//       type: actionTypes.DELETE_CENTER_SUCCESS,
//       payload: {
//         message: 'Center deleted',
//         status: 200
//       },
//       id: 1
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       paginatedCenters: [],
//       isNext: false,
//       pages: 0,
//       message: action.payload.message,
//       status: action.payload.status
//     });
//     done();
//   });

//   it('should return error message on get center', done => {
//     action = {
//       type: actionTypes.DELETE_CENTER_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on add center', done => {
//     action = { type: actionTypes.ADD_CENTER };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       status: '',
//       url: ''
//     });
//     done();
//   });

//   it('should return success code on add center', done => {
//     action = {
//       type: actionTypes.ADD_CENTER_SUCCESS,
//       payload: {
//         center: {},
//         status: 201,
//         message: 'Center Added'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       status: 201,
//       message: action.payload.message
//     });
//     done();
//   });

//   it('should return error message on add center', done => {
//     action = {
//       type: actionTypes.ADD_CENTER_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on add image', done => {
//     action = { type: actionTypes.ADD_IMAGE };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true,
//       status: ''
//     });
//     done();
//   });

//   it('should return success code on add image', done => {
//     action = {
//       type: actionTypes.ADD_IMAGE_SUCCESS,
//       payload: 'web.image.com'
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       url: action.payload
//     });
//     done();
//   });

//   it('should return error message on add image', done => {
//     action = {
//       type: actionTypes.ADD_IMAGE_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should return inital state on add image', done => {
//     action = { type: actionTypes.CENTER_STATUS_UPDATE };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: true
//     });
//     done();
//   });

//   it('scenter selected', done => {
//     action = {
//       type: actionTypes.CENTER_SELECTED,
//       payload: {
//         centerId: '',
//         centerName: ''
//       }
//     };
//     const { centerId, centerName } = action.payload;
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       centerId,
//       centerName
//     });
//     done();
//   });

//   it('should return next center', done => {
//     action = {
//       type: actionTypes.GET_NEXT_CENTERS,
//       payload: {
//         pages: 0,
//         isNext: false,
//         showCenters: []
//       }
//     };
//     const { pages, isNext, showCenters } = action.payload;
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       paginatedCenters: showCenters,
//       isNext,
//       pages
//     });
//     done();
//   });

//   it('should return success code on add image', done => {
//     action = {
//       type: actionTypes.CENTER_STATUS_UPDATE_SUCCESS,
//       payload: 'web.image.com'
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true
//     });
//     done();
//   });

//   it('should return error message on add image', done => {
//     action = {
//       type: actionTypes.CENTER_STATUS_UPDATE_FAILS,
//       payload: {
//         message: 'Error'
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       loading: false,
//       loaded: true,
//       error: action.payload.message
//     });
//     done();
//   });

//   it('should set current user', done => {
//     action = {
//       type: actionTypes.SET_CURRENT_CENTER,
//       payload: {
//         center: {
//           centerName: 'Balmoral',
//           location: 'Ojota',
//           capacity: 300,
//           description: 'The best center around you',
//           facilities: '[car park]',
//           imageUrl: 'web.image.com',
//           id: '4'
//         }
//       }
//     };
//     expect(centerReducer(initialState, action)).toEqual({
//       ...initialState,
//       isCenter: true,
//       center: action.payload.center
//     });
//     done();
//   });
// });
