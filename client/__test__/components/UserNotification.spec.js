import React from 'react';
import renderer from 'react-test-renderer';
import Notifications from '../../components/Dashboard/Template/Content/UserNotifications';
import { onClick, activity } from './defaultProps';

describe('Home Component', () => {
  const props = {
    activities: activity,
    onClick
  };
  it('should render without throwing error', () => {
    const wrapper = shallow(<Notifications {...props} />);
    console.log(wrapper.instance())
    expect(wrapper).toMatchSnapshot();
  });
  // it('should carousel when value is true', () => {
  //   const wrapper = renderer.create(<Notifications isAuth={props.isAuth} centerState={props.centerState}/>).toJSON();
  //   expect(wrapper).toMatchSnapshot();
  // });
});
