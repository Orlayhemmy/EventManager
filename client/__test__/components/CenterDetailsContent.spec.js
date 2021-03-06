import React from 'react';
import Connected, { CenterDetailsContent } from '../../components/CenterDetails/Template/Content/CenterDetailsContent';

describe('center details component', () => {
  const props = {
    eventState: {
      event: {
        eventTitle: ''
      }
    },
    path: '/',
    getEventSelected: jest.fn(),
    modifyCenterEvent: jest.fn(),
    deleteCenterEvent: jest.fn(),
    getCenterEvents: jest.fn(),
    clearEventState: jest.fn(),
    getCenterSelected: jest.fn(),
    modifyCenter: jest.fn(),
    uploadImage: jest.fn(),
    showDiv: jest.fn(),
    centerData: {
      center: {
        id: 1,
        centerName: '',
        facilities: [],
        location: '',
        capacity: ''
      },
      status: 202
    }
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      id: 'approve',
      value: 'Epic',
      files: [{ data: 'picture.jpg', type: 'image/jpeg' }],
      result: '',
      parentNode: {
        id: 'approve'
      },
      dataset: {
        toggleId: ''
      }
    }
  };

  const wrapper = shallow(<CenterDetailsContent {...props} />);

  wrapper.setProps({
    centerData: {
      center: {
        centerName: 'Epic Center',
        location: 'Lekki',
        description: 'A center with emotions',
        facilities: 'car park',
        capacity: '500',
        imageUrl: 'picture.jpg',
        cost: '50000',
        image: 'newpicture.jpg'
      }
    }
  });
  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('thorw error if the input contains invalid characters', () => {
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
    wrapper.setState({
      ...wrapper.props,
      location: 'Lekki'
    });
    wrapper.instance().isValid(event);
    expect(wrapper.state().location).toEqual('Lekki');
  });
  it('set component state on change', () => {
    const spy = sinon.spy(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().centerName).toEqual('Epic Center');
  });
  it('confirm the state contains the inputted data when submit is clicked', () => {
    const spy = sinon.spy(wrapper.instance(), 'onSubmit');
    wrapper.setState({
      ...wrapper.props,
      errors: ''
    });
    wrapper.instance().onSubmit(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().location).toEqual('Lekki');
    expect(wrapper.state().capacity).toEqual('500');
    expect(props.uploadImage).toHaveBeenCalledTimes(2);
    wrapper.setState({
      ...wrapper.props,
      centerName: 'Andela',
      image: 'picture.jpg'
    });
  });
  it('set image state to the file chosen by the user', () => {
    const spy = sinon.spy(wrapper.instance(), 'showImage');
    wrapper.instance().showImage(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().image).toEqual('picture.jpg');
  });

  it('call onclick to set state', () => {
    const spy = sinon.spy(wrapper.instance(), 'onClick');
    wrapper.instance().onClick(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().decision).toEqual('approve');
  });

  it('call onApprove function to dispatch update action', () => {
    const spy = sinon.spy(wrapper.instance(), 'onApprove');
    wrapper.instance().onApprove(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(props.modifyCenterEvent).toHaveBeenCalledTimes(1);
    expect(wrapper.state().decision).toEqual('approve');
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    const store = mockStore({ centerData: {}, eventState: {} });
    const wrapper = shallow(<Connected store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
