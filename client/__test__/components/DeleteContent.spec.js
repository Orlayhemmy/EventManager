import React from 'react';
import DeleteContent from '../../components/Common/Delete';

describe('Delete Event Component', () => {
  const onDelete = jest.fn();
  const title = '';
  const onCancel = jest.fn();
  const wrapper = shallow(<DeleteContent onCancel={onCancel} onDelete={onDelete} title={title} />)
  ;
  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#delete-content').length).toEqual(1);
  });
});
