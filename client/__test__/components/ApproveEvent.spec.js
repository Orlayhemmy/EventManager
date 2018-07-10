import React from 'react';
import ApproveEvent from '../../components/CenterDetails/Template/Content/ApproveEvent';
import { onChange } from './defaultProps';

describe('Approve Event Component', () => {
  const onApprove = jest.fn();
  const showHiddenDiv = jest.fn();
  const state = {
    comment: ''
  }
  it('should render component without error', () => {
  const wrapper = renderer.create(<ApproveEvent onChange={onChange} onApprove={onApprove} showHiddenDiv={showHiddenDiv} state={state}/>).toJSON();
    expect(wrapper).toMatchSnapshot();
  })
})