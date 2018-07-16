import React from 'react';
import expect from 'expect';
import AdminDashboardPage from '../../components/AdminDashboard/Container/AdminDashboardPage';

describe('Admin Component', () => {
  const props = {
    location: {
      pathname: '/admin-dashboard'
    },
    auth: {
      isAuth: true
    }
  };
  const wrapper = shallow(<AdminDashboardPage {...props} />);
  it('should render admin dashboard page', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render without error', () => {
    expect(wrapper.find('#center-page').length).toEqual(1);
  });
});
