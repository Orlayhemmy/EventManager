import React from 'react';
import SignIn from '../../components/Navbar/Template/Form/SignIn';

describe('Signin', () => {
  const navbarProps = {
    signinError: '',
    signinSubmit: () => {},
    loginEmail: '',
    loginPassword: '',
    errorEmail: '',
    errorPass: '',
    onChange: () => {},
    auth: { signinError: '' },
    password: ''
  };
  const wrapper = shallow(<SignIn navbarProps={navbarProps} />);
  it('should render the component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
