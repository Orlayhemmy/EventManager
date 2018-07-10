// import React from 'react';
// import expect from 'expect';
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
// import Navbar
//   from '../../components/Navbar/Container/navbar';

//   const store = mockStore({
//     auth: {
//       isAuth: false
//     }
//   });

// describe('Admin Component', () => {
//   const props = {
//     location: {
//       pathname: "/admin-dashboard"
//     },
//     auth: {
//       isAuth: false
//     }
//   };
//   it('should render admin dashboard page', () => {
//     const { isAuth } = props.auth;
//   const wrapper = renderer.create(<Navbar store={store}/>);
//     // expect(wrapper.find('nav').exists()).toBe(true);
//     expect(wrapper).toMatchSnapshot();
//   });
// });