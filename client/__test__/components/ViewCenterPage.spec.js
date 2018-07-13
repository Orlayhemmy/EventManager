import React from 'react';
import { ViewCenterDetails } from '../../components/CenterDetails/Container/ViewCenterPage';
import { props, logout, location } from './defaultProps';

describe('View center Page component', () => {
  const center = {
    message: '',
    status: ''
  };
  const center2 = {
    message: '',
    status: 498
  };
  const center3 = {
    message: '',
    status: 401
  };
  const center4 = {
    message: '',
    status: 202
  };
  const userprops = {
    userState: {
      user: {
        isAdmin: true,
        id: 1
      },
      isAuth: true
    }
  };
  const wrapper = shallow(<ViewCenterDetails
    auth={userprops.userState}
    center={center}
    logout={logout}
    location={props.location}
  />);
  it('should render without throwing error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should get the length of div', () => {
    wrapper.setProps({
      ...userprops,
      center: center2,
      userState: {
        isAuth: false
      }
    });
    const centerdiv = wrapper.find('#view-center-wrapper');
    expect(centerdiv.length).toEqual(1);
  });
  it('should get the length of div', () => {
    wrapper.setProps({
      center: center3
    });
    const centerdiv = wrapper.find('div');
    expect(centerdiv.length).toEqual(1);
  });
  it('should redirect user from page', () => {
    wrapper.setProps({
      auth: {
        isAuth: false,
        user: {
          isAdmin: false
        }
      },
      center
    });
    const centerdiv = wrapper.find('#view-center-wrapper');
    expect(centerdiv.length).toEqual(0);
  });
  it('should get the length of div', () => {
    wrapper.setProps({
      auth: {
        isAuth: true,
        user: {
          isAdmin: false
        }
      },
    });
    const centerdiv = wrapper.find('div');
    expect(centerdiv.length).toEqual(0);
  });
  it('should get the length of div', () => {
    wrapper.setProps({
      center: center4,
      auth: {
        isAuth: true,
        user: {
          isAdmin: true
        }
      },
    });
    const centerdiv = wrapper.find('#view-center-wrapper');
    expect(centerdiv.length).toEqual(1);
  });
});
