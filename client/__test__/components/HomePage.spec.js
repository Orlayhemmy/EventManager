import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import Homepage from '../../components/HomePage';
import 

const initialState = {};
const mockStore = configureMockStore();


xdescribe('HomePage Component', () => {
  const mockStore = jest.fn();
  let wrapper;
  const props = {
    auth: {
      isAuth: false
    },
    location: {
      pathname: 'anything'
    }
  }
  beforeEach(() => {
    wrapper = shallow(<Homepage store={mockStore}  />)
  });
  describe('When page loads', () => {
    it('renders', () => {
      expect(wrapper.find('#homepage').exists()).toBeTruthy();
      expect(wrapper.find('#homepage').length).toBe(1);
    });
  });
});