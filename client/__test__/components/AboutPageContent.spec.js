import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import AboutPageContent
  from '../../components/AboutPage/Template/aboutPageContent';

describe('Home Component', () => {
  it('should render without throwing error', () => {
    const wrapper = renderer.create(<AboutPageContent />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
