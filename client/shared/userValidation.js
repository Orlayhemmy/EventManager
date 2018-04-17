import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateSignupInput(data) {
  const errors = {};

  const {
    fullname,
    email,
    password,
    retypePass,
  } = data;

  if (!validator.isEmpty(fullname)) {
    if (!validator.isLength(fullname, { min: 5, max: 20 })) {
      errors.fullname = 'Fullname must be more than 5 characters but less than 20';
    }
  } else {
    errors.fullname = 'Fullname cannot be blank';
  }
  if (!/^[a-zA-Z0-9 ]+$/.test(fullname)) {
    errors.fullname = 'Fullname can only contain numbers and letters';
  }

  if (!validator.isEmpty(email)) {
    if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }
  } else { errors.email = 'Email is required'; }

  if (!validator.isEmpty(password)) {
    if (!validator.isLength(password, { min: 5, max: 20 })) {
      errors.password = 'Password length must be between 5 and 20';
    }
  } else { errors.password = 'Password is required'; }

  if (!validator.isEmpty(retypePass)) {
    if (retypePass !== password) {
      errors.retypePass = 'Password must match';
    }
  } else { errors.retypePass = 'Type Password Again'; }

  return { errors, isValid: isEmpty(errors) };
}

export function validateSigninInput(data) {
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

export function recoverPassword(data) {
  const { email } = data;
  const error = {};


  if (email === undefined || validator.isEmpty(email)) {
    errors.email = 'email is required';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Type a valid email';
  }
  return { error, isValid: isEmpty(error) };
}

export function updateUserValidation(data) {
  const {
    fullname,
    email,
    newPassword,
    retypePass,
  } = data;

  const errors = {};

  Object.entries(data).forEach((entry) => {

    if (isEmpty(entry[1])) {
      entry[1] = null;
    }

    if (entry[0] === 'fullname') {
      if (entry[1] !== null) {
        if (!/^[a-zA-Z0-9 ]+$/.test(fullname)) {
          errors.fullname = 'Fullname can only contain numbers and letters';
        }
        if (!validator.isLength(fullname, { min: 5, max: 20 })) {
          errors.fullname = 'Fullname must be more than 5 characters but less than 20';
        }
      }
    }

    if (entry[0] === 'email') {
      if (entry[1] !== null) {
        if (!validator.isEmail(email)) {
          errors.email = 'Email is invalid';
        }
      }
    }

    if (entry[0] === 'newPassword') {
      if (entry[1] !== null) {
        if (!validator.isLength(newPassword, { min: 5, max: 20 })) {
          errors.newPassword = 'Password length must be between 5 and 20';
        }
      }
    }

    if (entry[0] === 'retypePass') {
      if (entry[1] !== null) {
        if (retypePass !== newPassword) {
          errors.retypePass = 'Password must match';
        }
      }
    }
    return errors;
  });

  return { errors, isValid: isEmpty(errors) };
}
