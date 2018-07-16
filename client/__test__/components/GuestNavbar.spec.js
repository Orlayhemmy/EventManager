import React from 'react';
import GuestNavbar from '../../components/Navbar/Template/Content/GuestNavbar';
import { navbarProps } from './MockData';

describe('guest navbar', () => {
  const wrapper = shallow(<GuestNavbar navbarProps={navbarProps} />);
  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
