import React from 'react';
import EventList from '../../components/CenterDetails/Template/Content/BookedEvents';
import { bookedEvent } from './MockData';

describe('Booked Event Component', () => {
  const onClick = jest.fn();
  const eventState = bookedEvent;
  const wrapper = shallow(<EventList eventState={eventState} onClick={onClick} />)
  ;
  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render without error', () => {
    expect(wrapper.find('#event-list').length).toEqual(1);
  });
});
