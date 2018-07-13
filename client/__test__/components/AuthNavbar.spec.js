import React from 'react';
import AuthNavbar from '../../components/Navbar/Template/Content/UserContent/AuthNavbar';
import { navbarProps, logout } from './defaultProps';

describe('Auth navbar', () => {
  const wrapper = shallow(<AuthNavbar navbarProps={navbarProps} logout={logout}/>);
  it('should render the component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
