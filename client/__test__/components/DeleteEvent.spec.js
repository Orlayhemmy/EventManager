import React from 'react';
import DeleteContent from '../../components/CenterDetails/Template/Content/DeleteEvent';
import { onChange } from './MockData';

describe.only('Delete Event Component', () => {
  const onApprove = jest.fn();
  const state = {
    reason: '',
    suggestions: ''
  };
  const wrapper = shallow(<DeleteContent onChange={onChange} onApprove={onApprove} state={state} />);
  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#delete-content').length).toEqual(1);
  });
});
