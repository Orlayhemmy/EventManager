import React from 'react';
import expect from 'expect';
import AboutPage from '../../components/AboutPage/Container/AboutPage';

describe('AboutPage Component', () => {
  const props = {
    location: {
      pathname: '/about'
    }
  };
  const wrapper = shallow(<AboutPage {...props} />);
  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render without error', () => {
    expect(wrapper.find('#about-page').length).toEqual(1);
  });
});
