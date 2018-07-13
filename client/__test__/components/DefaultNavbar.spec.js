import React from 'react';
import DefaultNavbar from '../../components/Navbar/Template/Content/Index';

describe('Default navbar', () => {
  const props = {
    auth: {
      user: { isAdmin: true }
    }
  };
  const wrapper = shallow(<DefaultNavbar navbarProps={props} />);
  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should switch the default navbar when user is authenticated', () => {
    wrapper.setProps({
      navbarProps: {
        auth: {
          user: { isAdmin: false }
        }
      }
    });
    expect(wrapper.find('#usernavbar').length).toEqual(1);
  });
});
