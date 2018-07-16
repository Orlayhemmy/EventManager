import React from 'react';
import EditCenter from '../../components/CenterDetails/Template/Form/EditCenterForm';
import { centerState } from './MockData';

describe('Edit center', () => {
  const props = {
    centerState,
    showImage: jest.fn(),
    showHidden: jest.fn(),
    onChange: jest.fn()
  };

  const wrapper = shallow(<EditCenter {...props} />);
  it('should render component without errors', () => {
      expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#editCenterDetails').length).toEqual(1);
  });
});
