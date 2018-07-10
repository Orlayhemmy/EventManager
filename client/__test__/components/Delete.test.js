import React from 'react';
import DeleteContent from '../../components/Common/Delete';

describe('Approve Event Component', () => {
  const onDelete = jest.fn();
  const title = '';
  const onCancel = jest.fn();
  it('should render component without error', () => {
    const wrapper = renderer
      .create(<DeleteContent onCancel={onCancel} onDelete={onDelete} title={title} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
