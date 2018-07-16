import React from 'react';
import Tour from '../../components/Common/Tour';

describe('Tour Component', () => {
  const wrapper = shallow(<Tour />)
    ;
  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#tour').length).toEqual(1);
  });
});
