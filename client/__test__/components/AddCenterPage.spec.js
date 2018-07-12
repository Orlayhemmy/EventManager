import React from 'react';
import { AddCenterPage }
  from '../../components/CenterDetails/Container/AddCenterPage';
  import { props } from './defaultProps';

describe('AddCenter Page component', () => {
  const center = {
    message: '',
    status: ''
  };
  const wrapper = shallow(<AddCenterPage {...props}/>);
  it('should render without throwing error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should get the length of div', () => {
    const centerdiv = wrapper.find('#add-center');
    expect(centerdiv.length).toEqual(1);
  });
  it('should redirect user to landing page', () => {
    wrapper.setProps({
      userState: {
        user: {
          isAdmin: false,
          id: 1
        },
        isAuth: true
      },
      center,
      location: props.location
    });
    const centerdiv = wrapper.find('#add-center');
    expect(centerdiv.length).toEqual(0);
  });
  it('should redirect the user to dashboard', () => {
    wrapper.setProps({
      userState: {
        user: {
          isAdmin: false,
          id: 1
        },
        isAuth: false
      }
    });
    const centerdiv = wrapper.find('#add-center');
    expect(centerdiv.length).toEqual(0);
  });
  it('should redirect to admin dashboard when status is 201', () => {
    wrapper.setProps({
      ...wrapper.props,
      center: {
        status: 201
      },
      userState: {
        user: {
          isAdmin: true,
          id: 1
        },
        isAuth: true
      }
    });
    const centerdiv = wrapper.find('#add-center');
    expect(centerdiv.length).toEqual(0);
  });
});
