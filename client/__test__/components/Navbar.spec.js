import React from 'react';
import { NavBar } from '../../components/Navbar/Container/Navbar';

const auth = {
  isAuth: true
};
const logout = jest.fn();

describe('guest navbar', () => {
  const wrapper = shallow(<NavBar auth={auth} logout={logout} />);
  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
