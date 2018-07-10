import React from 'react';
import expect from 'expect';
import AboutPage from '../../components/AboutPage/Container/AboutPage';

describe('AboutPage Component', () => {
  const props = {
    location: {
      pathname: '/about'
    }
  };
  it('should render admin dashboard page', () => {
    const wrapper = shallow(<AboutPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
