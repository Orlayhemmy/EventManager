import React from 'react';
import UserNavbar from '../../components/Navbar/Template/Content/UserContent/UserNavbar';
import { navbarProps } from './defaultProps';

describe('User navbar', () => {
  const wrapper = shallow(<UserNavbar navbarProps={navbarProps} />);
  it('should render the component without errors', () => {
    expect(wrapper).toMatchSnapshot();
    // wrapper.instance().logout();
    // expect(wrapper.instance().logout.calledOnce).toEqual(true);
  });
});
