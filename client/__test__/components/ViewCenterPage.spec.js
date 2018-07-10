// import React from 'react';
// import { ViewCenterDetails } from '../../components/CenterDetails/Container/viewCenterPage';
// import { props, logout, location } from './defaultProps';

// describe('AddCenter Page component', () => {
//   const center = {
//     message: '',
//     status: 202
//   };
//   const center2 = {
//     message: '',
//     status: 498
//   };
//   const center3 = {
//     message: '',
//     status: 401
//   };
//   it('should render without throwing error', () => {
//     const wrapper = shallow(<ViewCenterDetails
//         auth={props.userState}
//         center={center}
//         logout={logout}
//         location={props.location}
//       />);
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('should get the length of div', () => {
//     const wrapper = shallow(<ViewCenterDetails
//       auth={props.userState}
//         center={center2}
//         logout={logout}
//         location={props.location}
//     />);
//     const centerdiv = wrapper.find('div');
//     expect(centerdiv.length).toEqual(1);
//   });
//   it('should get the length of div', () => {
//     const wrapper = shallow(<ViewCenterDetails
//       auth={props.userState}
//         center={center3}
//         logout={logout}
//         location={props.location}
//     />);
//     const centerdiv = wrapper.find('div');
//     expect(centerdiv.length).toEqual(1);
//   });
// });
