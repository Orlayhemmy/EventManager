import React from 'react';
import ApproveEvent from '../../components/CenterDetails/Template/Content/ApproveEvent';
import { onChange } from './MockData';

describe('Approve Event Component', () => {
  const onApprove = jest.fn();
  const showHiddenDiv = jest.fn();
  const state = {
    comment: ''
  };
  const wrapper = shallow(<ApproveEvent
      onChange={onChange}
      onApprove={onApprove}
      showHiddenDiv={showHiddenDiv}
      state={state}
    />);
  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#approve-event').length).toEqual(1);
  });
});
