import React from 'react';
import DeleteContent from '../../components/CenterDetails/Template/Content/deleteEvent';
import { onChange } from './defaultProps';

describe.only('Approve Event Component', () => {
  const onApprove = jest.fn();
  const state = {
    reason: '',
    suggestions: ''
  };
  it('should render component without error', () => {
    const wrapper = renderer
      .create(<DeleteContent onChange={onChange} onApprove={onApprove} state={state} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
