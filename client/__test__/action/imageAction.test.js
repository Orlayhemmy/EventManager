// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import expect from 'expect';
// import moxios from 'moxios';
// import * as actionTypes from '../../actions/types';
// import UploadImage from '../../actions/imageAction';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('upload image centers action', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });
//   const info = {
//     imageUrl: ''
//   };
//   it('returns success when image is uploaded', done => {
//     moxios.stubRequest('https://api.cloudinary.com/v1_1/kalel/image/upload', {
//       status: 200,
//       response: {
//         data: {
//           secure_url: 'www.image.com'
//         }
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.ADD_IMAGE },
//       { type: actionTypes.ADD_IMAGE_SUCCESS },
//       { type: actionTypes.MODIFY_CENTER }
//     ];
//     const store = mockStore({});

//     return store
//       .dispatch(UploadImage(info, 'Image', 'modify-center'))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//         done();
//       });
//   });
//   it('returns success when image is uploaded', done => {
//     moxios.stubRequest('https://api.cloudinary.com/v1_1/kalel/image/upload', {
//       status: 200,
//       response: {
//         data: {
//           secure_url: 'www.image.com'
//         }
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.ADD_IMAGE },
//       { type: actionTypes.ADD_IMAGE_SUCCESS },
//       { type: actionTypes.UPDATE_USER }
//     ];
//     const store = mockStore({});

//     return store.dispatch(UploadImage(info, 'Image', '')).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });

//   it('returns success when image is uploaded', done => {
//     moxios.stubRequest('https://api.cloudinary.com/v1_1/kalel/image/upload', {
//       status: 200,
//       response: {
//         data: {
//           secure_url: 'www.image.com'
//         }
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.ADD_IMAGE },
//       { type: actionTypes.ADD_IMAGE_SUCCESS },
//       { type: actionTypes.ADD_CENTER }
//     ];
//     const store = mockStore({});

//     return store.dispatch(UploadImage(info, 'Image', 'center')).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });

//   it('returns error when image is not uploaded', done => {
//     moxios.stubRequest('https://api.cloudinary.com/v1_1/kalel/image/upload', {
//       status: 500,
//       response: {
//         data: 'image cannot be uploaded'
//       }
//     });

//     const expectedActions = [
//       { type: actionTypes.ADD_IMAGE },
//       {
//         payload: { data: 'image cannot be uploaded' },
//         type: actionTypes.ADD_IMAGE_FAILS
//       }
//     ];
//     const store = mockStore({});

//     return store.dispatch(UploadImage(info, 'Image', 'center')).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });
// });
