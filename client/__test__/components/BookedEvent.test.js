import React from 'react';
import EventList from '../../components/CenterDetails/Template/Content/bookedEvents';
import { bookedEvent } from './defaultProps';

describe('Approve Event Component', () => {
  const onClick = jest.fn();
  const eventState = bookedEvent;
  it('should render component without error', () => {
    const wrapper = renderer
      .create(<EventList eventState={eventState} onClick={onClick} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
