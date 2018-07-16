import React from 'react';
import renderer from 'react-test-renderer';
import expect from 'expect';
import HomeContent from '../../components/HomePage/Template/Content/HomeContent';

describe('Home Component', () => {
  const props = {
    centerState: {
      centers: ['balmoral', 'andela']
    },
    isAuth: true
  };
  it('should render without throwing error', () => {
    const wrapper = renderer.create(<HomeContent />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('show carousel when isAuth value is true', () => {
    const wrapper = renderer.create(<HomeContent isAuth={props.isAuth} centerState={props.centerState}/>).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
