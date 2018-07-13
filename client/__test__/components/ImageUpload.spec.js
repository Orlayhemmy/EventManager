import React from 'react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

describe('Image upload', () => {
  const props = {
    showImage: jest.fn(),
    uploadedImage: 'www.webimage.com/images',
    path: '/add-center'
  };
  const wrapper = shallow(<ImageUpload {...props} />);

  it('should render the component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('change the image placeholder with the default want', () => {
    wrapper.setProps({
      ...wrapper.props,
      uploadedImage: '',
    });
    expect(wrapper.find('.imageUpload').length).toEqual(2);
  });
});
