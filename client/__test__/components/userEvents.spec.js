import React from 'react';
import Content from '../../components/Dashboard/Template/Content/UserEvents';
import { bookedEvent } from './MockData';

describe('Dashboard Component', () => {
  const props = {
    auth: {
      user: {
        isAdmin: true,
        id: 1
      },
      isAuth: true
    },
    userEvent: {
      status: '',
      message: '',
      events: []
    },
    location: {
      pathname: '/'
    },
    state: {
      eventId: 1,
      eventName: 'Pizza Party'
    },
    counter: 0,
    activity: {},
    nextEvents: jest.fn(),
    onSelect: jest.fn()
  };
  const wrapper = shallow(<Content {...props} />);

  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('check the length of the user events in the component', () => {
    wrapper.setProps({
      ...wrapper.props,
      userEvent: {
        status: '',
        message: '',
        events: bookedEvent
      },
      counter: 1
    });
    expect(wrapper.find('#booked-events').length).toEqual(10);
  });
});
