import React from 'react';
import Tour from '../../components/Common/Tour';

describe('Tour Component', () => {
  it('should render component without error', () => {
    const wrapper = renderer
      .create(<Tour />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
