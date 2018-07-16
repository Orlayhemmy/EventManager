import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import Carousel from '../../components/Carousel/Container/Carousel';

describe('Carousel Component', () => {
  const props = {
    centerState: {
      centers: ['balmoral', 'andela']
    }
  };
  const wrapper = shallow(<Carousel {...props} />);
  it('should render without throwing error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#carousel').length).toEqual(1);
  });
});
