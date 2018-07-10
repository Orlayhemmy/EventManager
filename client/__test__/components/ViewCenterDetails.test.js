import React from 'react';
import Details from '../../components/CenterDetails/Template/Content/ViewCenterDetails';

describe('Approve Event Component', () => {
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
  it('should render component without error', () => {
    const wrapper = renderer
      .create(<Details
          showHiddenDiv={showHiddenDiv}
          onApprove={onApprove}
          centerState={centerState}
        />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
