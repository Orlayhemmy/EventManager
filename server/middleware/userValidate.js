import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Validates users signup and signin operations
 * @class Validation
 */
export default class Validation {
  /**
   * Validates all User signup details
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Validation error messages or contents of req.body
   * @memberof UserValidations
   */
  static signup(req, res, next) {
    const { fullname, email, password } = req.body;
    const errors = {};

    if (
      fullname === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return res.status(400).send({
        message: 'All or some fields are not defined'
      });
    }

    if (!validator.isEmpty(fullname)) {
      if (!validator.isLength(fullname, { min: 5, max: 20 })) {
        errors.fullname =
          'Fullname must be more than 5 characters but less than 20';
      }
      if (!/^[a-zA-Z ]+$/.test(fullname)) {
        errors.fullname = 'Fullname can only contain numbers and letters';
      }
    } else {
      errors.fullname = 'Fullname cannot be blank';
    }

    if (!validator.isEmpty(email)) {
      if (!validator.isEmail(email)) {
        errors.email = 'Email is invalid';
      }
    } else {
      errors.email = 'Email is required';
    }

    if (!validator.isEmpty(password)) {
      if (!validator.isLength(password, { min: 5, max: 20 })) {
        errors.password = 'Password length must be between 5 and 20';
      }
    } else {
      errors.password = 'Password is required';
    }

    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    next();
  }

  /**
   * Validates signin form input fields
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Validation error messages or contents of req.body
   * @memberof UserValidations
   */
  static signin(req, res, next) {
    const { loginEmail, loginPassword } = req.body;

    const errors = {};
    if (loginEmail === undefined || loginPassword === undefined) {
      return res.status(400).send({
        message: 'Email or Password is undefined'
      });
    }

    if (validator.isEmpty(loginEmail)) {
      errors.loginEmail = 'email is required';
    }

    if (!validator.isEmail(loginEmail)) {
      errors.loginEmail = 'Type a valid email';
    }

    if (validator.isEmpty(loginPassword)) {
      errors.loginPassword = 'Password is required';
    }

    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
  }

  /**
   * Validates all User update details
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Validation error messages or contents of req.body
   * @memberof UserValidations
   */
  static recoverPassword(req, res, next) {
    const { email } = req.body;
    const error = {};

    if (email === undefined || validator.isEmpty(email)) {
      error.email = 'email is required';
    }

    if (!validator.isEmail(email)) {
      error.email = 'Type a valid email';
    }

    const isValid = Object.keys(error).length === 0;

    if (!isValid) {
      return res.status(400).send(error);
    }
    next();
  }

  /**
   * Validates all User update details
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Validation error messages or contents of req.body
   * @memberof UserValidations
   */
  static updateUser(req, res, next) {
    const {
      fullname, email, newPassword, retypePass
    } = req.body;

    const error = {};

    Object.entries(req.body).forEach((entry) => {
      if (isEmpty(entry[1])) {
        entry[1] = null;
      }

      if (entry[0] === 'fullname') {
        if (entry[1] !== null) {
          if (!/^[a-zA-Z ]+$/.test(fullname)) {
            error.fullname = 'Fullname can only contain numbers and letters';
          }
          if (!validator.isLength(fullname, { min: 5, max: 20 })) {
            error.fullname =
              'Fullname must be more than 5 characters but less than 20';
          }
        }
      }

      if (entry[0] === 'email') {
        if (entry[1] !== null) {
          if (!validator.isEmail(email)) {
            error.email = 'Email is invalid';
          }
        }
      }

      if (entry[0] === 'newPassword') {
        if (entry[1] !== null) {
          if (!validator.isLength(newPassword, { min: 5, max: 20 })) {
            error.newPassword = 'Password length must be between 5 and 20';
          }
        }
      }

      if (entry[0] === 'retypePass') {
        if (entry[1] !== null) {
          if (retypePass !== newPassword) {
            error.retypePass = 'Password must match';
          }
        }
      }
      return error;
    });
    const isValid = Object.keys(error).length === 0;

    if (!isValid) {
      return res.status(400).send(error);
    }
    next();
  }
}
