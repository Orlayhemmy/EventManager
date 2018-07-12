import React from 'react';
import { NavBar } from '../../components/Navbar/Container/Navbar';

const auth = {
  isAuth: true
};
describe('guest navbar', () => {
  const wrapper = shallow(<NavBar auth={auth} />);
  it('should render the component based', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
