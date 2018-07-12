import React from 'react';
import DeleteModal from '../../components/Modal/Container/DeleteModal';

describe('Image upload', () => {
  const content = 'This is a delete modal';
  const wrapper = shallow(<DeleteModal content={content} />);

  it('should render the component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
