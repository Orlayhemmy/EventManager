import React from 'react';
import { AdminPanelPage } from '../../components/AdminDashboard/Template/Content/AdminContent';

describe.only('Admin content', () => {
  const props = {
    auth: {
      user: {
        isAdmin: true
      },
      isAuth: true
    },
    getNextCenters: jest.fn(),
    viewCenterSelected: jest.fn(),
    getCenters: jest.fn(),
    searchValidation: jest.fn(),
    centerSelected: jest.fn()
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      id: 'next',
      value: 2
    }
  };

  const wrapper = shallow(<AdminPanelPage {...props} />);
  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the component without error', () => {
    wrapper.setProps({
      auth: {
        user: {
          isAdmin: true
        },
        isAuth: false
      }
    });
    expect(wrapper.find('#admin-content').length).toEqual(0);
  });
  it('should render the component without error', () => {
    wrapper.setProps({
      auth: {
        user: {
          isAdmin: false
        },
        isAuth: true
      }
    });
    expect(wrapper.find('#admin-content').length).toEqual(0);
  });

  it('should render the component without error', () => {
    wrapper.instance().nextCenters('', 1);
    expect(props.getNextCenters).toHaveBeenCalledTimes(1);
  });

  it('set state when id is next and prevous', () => {
    const spy = sinon.spy(wrapper.instance(), 'nextCenters');
    wrapper.instance().nextCenters({ target: { id: 'next' } });
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().counter).toEqual(1);

    wrapper.instance().nextCenters({ target: { id: 'previous' } });
    expect(spy.calledTwice).toBeTruthy();
    expect(wrapper.state().counter).toEqual(0);
  });

  it('call the showcenter function with the target value', () => {
    const spy = sinon.spy(wrapper.instance(), 'showCenter');
    wrapper.instance().showCenter({ target: { id: 1 } });
    expect(spy.calledOnce).toBeTruthy();
  });

  it('call the search function with the target value', () => {
    const spy = sinon.spy(wrapper.instance(), 'search');
    wrapper.instance().search(event);
    expect(spy.calledOnce).toBeTruthy();
  });

  it('call the onchange function and set state', () => {
    const spy = sinon.spy(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().next).toEqual(2);
  });

  it('call the isValid function and set state', () => {
    const spy = sinon.spy(wrapper.instance(), 'isValid');
    wrapper.instance().setState({
      errors: "String is expected"
    });
    wrapper.instance().isValid();
    expect(spy.calledOnce).toBeTruthy();
  });
});
