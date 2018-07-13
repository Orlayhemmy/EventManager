import React from 'react';
import expect from 'expect';
import AboutPage from '../../components/AboutPage/Container/AboutPage';

describe('AboutPage Component', () => {
  const props = {
    location: {
      pathname: '/about'
    }
  };
  it('should render without error', () => {
    const wrapper = shallow(<AboutPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
