import React from 'react';
import { Dashboard } from '../../components/Dashboard/Container/userPanelPage';

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
      message: ''
    },
    location: {
      pathname: '/'
    },
    state: {
      counter: 1,
      eventId: 1,
      eventName: 'Pizza Party'
    },
    activity: {},
    clearCenterStorage: jest.fn(() => {}),
    clearEventState: jest.fn(() => {}),
    getEvents: jest.fn(() => {}),
    getActivity: jest.fn(() => {}),
    eventBooked: jest.fn(() => {}),
    setCurrentEvent: jest.fn(() => {}),
    deleteEvent: jest.fn(() => {}),
  };
  const wrapper = shallow(<Dashboard {...props} />);

  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal on update', () => {
    wrapper.setProps({
      ...wrapper.props(),
      userEvent: {
        ...wrapper.props(),
        status: 200,
        message: 'Done'
      }
    });
    const modal = wrapper.find('DeleteModal');
    expect(modal.exists()).toBeTruthy();
  });
});
