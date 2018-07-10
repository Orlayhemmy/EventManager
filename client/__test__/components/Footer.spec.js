import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import Footer from '../../components/Footer/Footer';

describe('Home Component', () => {
  it('should render without throwing error', () => {
    const wrapper = renderer.create(<Footer />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
