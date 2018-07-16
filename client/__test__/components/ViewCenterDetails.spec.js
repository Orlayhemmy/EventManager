import React from 'react';
import Details from '../../components/CenterDetails/Template/Content/ViewCenterDetails';

describe('View center details Component', () => {
  const onApprove = jest.fn();
  const showHiddenDiv = jest.fn();

  const centerState = {
    centerName: '',
    location: '',
    facilities: '',
    description: '',
    imageUrl: '',
    capacity: '',
    cost: ''
  };
  const wrapper = shallow(<Details
        showHiddenDiv={showHiddenDiv}
        onApprove={onApprove}
        centerState={centerState}
      />)
    ;
  it('should render component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('check the length of the containing div in the component', () => {
    expect(wrapper.find('#centerDetails').length).toEqual(1);
  });
});
