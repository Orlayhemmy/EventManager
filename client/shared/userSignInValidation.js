import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const {
    loginEmail,
    loginPassword
  } = data;

  const errors = {};

  if (validator.isEmpty(loginEmail)) {
    errors.loginEmail = 'email is required';
  }

  if (!validator.isEmail(loginEmail)) {
    errors.loginEmail = 'Type a valid email';
  }

  if (validator.isEmpty(loginPassword)) {
    errors.loginPassword = 'password is required';
  }

  return { errors, isValid: isEmpty(errors) };
}

