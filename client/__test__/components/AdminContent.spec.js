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
  it('should redirect user from the page when unauthenticated', () => {
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
  it('should redirect user from the page when not admin', () => {
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

  it('nextCenters function', () => {
    wrapper.instance().nextCenters('', 1);
    expect(props.getNextCenters).toHaveBeenCalledTimes(1);
  });

  it('set state when the target event id is next and previous', () => {
    const spy = sinon.spy(wrapper.instance(), 'nextCenters');
    wrapper.instance().nextCenters({ target: { id: 'next' } });
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().counter).toEqual(1);

    wrapper.instance().nextCenters({ target: { id: 'previous' } });
    expect(spy.calledTwice).toBeTruthy();
    expect(wrapper.state().counter).toEqual(0);
  });

  it('set the counter for calling the next centers', () => {
    const spy = sinon.spy(wrapper.instance(), 'showCenter');
    wrapper.instance().showCenter({ target: { id: 1 } });
    expect(spy.calledOnce).toBeTruthy();
  });

  it('search function', () => {
    const spy = sinon.spy(wrapper.instance(), 'search');
    wrapper.instance().search(event);
    expect(spy.calledOnce).toBeTruthy();
  });

  it('set component state on change', () => {
    const spy = sinon.spy(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().next).toEqual(2);
  });

  it('thorw error if the input contains invalid characters', () => {
    const spy = sinon.spy(wrapper.instance(), 'isValid');
    wrapper.instance().setState({
      errors: "String is expected"
    });
    wrapper.instance().isValid();
    expect(spy.calledOnce).toBeTruthy();
  });
});
