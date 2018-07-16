import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import AboutPageContent from '../../components/AboutPage/Template/AboutPageContent';

describe('AboutPage Component', () => {
  const wrapper = shallow(<AboutPageContent />);
  it('should render without throwing error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render without error', () => {
    expect(wrapper.find('#about').length).toEqual(1);
  });
});
