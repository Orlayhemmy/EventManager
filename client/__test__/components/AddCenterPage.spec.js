// import React from 'react';
// import { AddCenterPage }
//   from '../../components/CenterDetails/Container/addCenterPage';
//   import { props } from './defaultProps';

// describe('AddCenter Page component', () => {
//   const center = {
//     message: '',
//     status: 201
//   };
//   it('should render without throwing error', () => {
//     const wrapper = shallow(<AddCenterPage {...props}/>);
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('should get the length of div', () => {
//     const wrapper = shallow(<AddCenterPage {...props} />);
//     const centerdiv = wrapper.find('[id="add-center"]');
//     expect(centerdiv.length).toEqual(1);
//   });
//   it('should return on status update', () => {
//     const wrapper = shallow(<AddCenterPage userState={props.userState} center={center} location={props.location}/>);
//     const centerdiv = wrapper.find('[id="add-center"]');
//     expect(centerdiv.length).toEqual(0);
//   });
// });