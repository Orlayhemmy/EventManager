import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import AboutPageContent
  from '../../components/AboutPage/Template/AboutPageContent';

describe('AboutPage Component', () => {
  it('should render without throwing error', () => {
    const wrapper = renderer.create(<AboutPageContent />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
