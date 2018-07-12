import React from 'react';
import EditCenter from '../../components/CenterDetails/Template/Form/EditCenterForm';
import { centerState } from './defaultProps';

describe('Edit center', () => {
  const props = {
    centerState,
    showImage: jest.fn(),
    showHidden: jest.fn(),
    onChange: jest.fn()
  };

  it('should render component without errors', () => {
    const wrapper = shallow(<EditCenter {...props} />);
      expect(wrapper).toMatchSnapshot();
  });
});
