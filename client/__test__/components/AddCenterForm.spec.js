import React from 'react';
import Connected, { CenterForm } from '../../components/CenterDetails/Template/Form/AddCenterForm';
import { center, userState } from './MockData';

describe('CenterForm component', () => {

  const props = {
    path: '/',
    center: {
      error: ''
    },
    uploadImage: jest.fn()
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      id: 'centerName',
      value: 'Balmoral',
      files: [{ data: 'picture.jpg', type: 'image/jpeg' }],
      result: ''
    }
  };

  const wrapper = shallow(<CenterForm {...props} />);
  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('set component state on change', () => {
    const spy = sinon.spy(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().centerName).toEqual('Balmoral');
  });
  it('thorw error if the input contains invalid characters', () => {
    wrapper.setState({
      location: 'Lekki',
      description: 'A center with emotions',
      facilities: 'car park',
      capacity: '500',
      image: 'picture.jpg',
      cost: '50000'
    });
    const spy = sinon.spy(wrapper.instance(), 'isValid');

    wrapper.instance().isValid(event);
    expect(spy.calledOnce).toBeTruthy();

    wrapper.setState({
      location: 'Lekki#',
      description: 'A center with emotions',
      facilities: 'car park',
      capacity: '500',
      image: 'picture.jpg',
      cost: '50000'
    });
    wrapper.instance().isValid(event);
    expect(spy.calledTwice).toBeTruthy();
    expect(wrapper.state().errors.location).toEqual('location can not include symbols except comma');
  });
  it('confirm the state contains the inputted data when submit is clicked', () => {
    const spy = sinon.spy(wrapper.instance(), 'onSubmit');
    wrapper.find('#add-event').simulate('click');
    wrapper.setState({
      location: 'Lekki',
      description: 'A center with emotions',
      facilities: 'car park',
      capacity: '500',
      image: 'picture.jpg',
      cost: '50000'
    });
    wrapper.instance().onSubmit(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().location).toEqual('Lekki');
    expect(wrapper.state().capacity).toEqual('500');
  });
  it('set image state to the file chosen by the user', () => {
    const spy = sinon.spy(wrapper.instance(), 'showImage');
    wrapper.instance().showImage(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().image).toEqual('picture.jpg');
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {

    const store = mockStore({ auth: { user: {}, center } });
    const wrapper = shallow(<Connected store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
