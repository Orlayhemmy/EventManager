import React from 'react';
import { SearchForm } from '../../components/Common/Search';

describe('Search Form Component', () => {
  const getCenters = jest.fn();
  const criteria = {
    location: '',
    facilities: '',
    capacity: '',
    btwValue: '',
    errors: '',
    capacityType: ''
  };
  const criteria2 = {
    location: '',
    facilities: '',
    capacity: '',
    btwValue: '',
    errors: '',
    capacityType: 'between'
  };
  const search = jest.fn();
  const onChange = jest.fn();

  it('should render component without error', () => {
    const wrapper = renderer
      .create(<SearchForm criteria={criteria} search={search} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component without error', () => {
    const wrapper = shallow(<SearchForm criteria={criteria2} search={search} onChange={onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should reset state ', () => {
    const wrapper = shallow(<SearchForm criteria={criteria2} search={search} onChange={onChange} getCenters={getCenters}/>);
    const button = (wrapper).find('#reset');
    button.simulate('click', {
      preventDefault: () => {}
    });
  });
});
