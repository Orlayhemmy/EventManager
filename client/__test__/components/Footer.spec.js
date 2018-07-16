import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import Footer from '../../components/Footer/Footer';

describe('Footer Component', () => {
  const wrapper = shallow(<Footer />);
  it('should render without throwing error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#footer').length).toEqual(1);
  });
});
