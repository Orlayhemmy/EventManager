import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Validates all requests for centers route
 * @class centersValidation
 */
export default class Validation {
  /**
   * Validates all centers details before allowing access to controller class
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Validation error messages or content of req.body passed to controller
   * @memberof centersValidation
   */
  static postCenter(req, res, next) {
    const {
      centerName,
      facilities,
      description,
      location,
      capacity,
      imageUrl
    } = req.body;

    const errors = {};
    if (
      centerName === undefined ||
      facilities === undefined ||
      description === undefined ||
      location === undefined
    ) {
      return res.status(400).send({
        message: 'All or Some Fields are Undefined'
      });
    }
    // validations for centername

    if (!validator.isEmpty(centerName)) {
      if (!/^[a-zA-Z0-9 ]+$/.test(centerName)) {
        errors.centerName = 'Center Name can only contain numbers and letters';
      }
      if (!validator.isLength(centerName, { min: 5, max: 20 })) {
        errors.centerName =
          'The Center Name must be more than 5 characters but less than 20';
      }
    } else {
      errors.centerName = 'Center Name cannot be blank';
    }

    // validations for capacity

    if (!validator.isEmpty(capacity)) {
      if (!/^[0-9]+$/.test(capacity)) {
        errors.capacity = 'Center capacity can only contain numbers';
      }
    } else {
      errors.capacity = 'Center capacity cannot be blank';
    }

    // validations for url

    if (!validator.isURL(imageUrl)) {
      errors.imageUrl = 'The url is not valid';
    }

    // validations for facilities

    if (!validator.isEmpty(facilities)) {
      if (!/^[a-zA-Z0-9,.& ]+$/.test(facilities)) {
        errors.facilities =
          'Facilities can not include symbols except comma which you should use to separate the faciities'; // eslint-disable-line
      }
      if (!validator.isLength(facilities, { min: 5, max: 1000 })) {
        errors.facilities =
          'facilities must be greater than 5 but less than 1000 words';
      }
    } else {
      errors.facilities = 'Center should have at least one facility';
    }

    // validations for description
    if (!validator.isEmpty(description)) {
      if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
        errors.description =
          'description can not include symbols except comma and full stop';
      }
      if (!validator.isLength(description, { min: 5, max: 1000 })) {
        errors.description =
          'description must be greater than 5 but less than 1000 words';
      }
    } else {
      errors.description = 'Center should have a description';
    }

    // validations for location
    if (!validator.isEmpty(location)) {
      if (!/^[a-zA-Z0-9, ]+$/.test(location)) {
        errors.location = 'location can not include symbols except comma';
      }
      if (!validator.isLength(location, { min: 5, max: 1000 })) {
        errors.location =
          'location must be greater than 5 but less than 100 words';
      }
    } else {
      errors.location = 'Center should have an Address';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).send(errors);
    }
    next();
  }

  /**
   * Validates all centers details before allowing access to controller class
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Validation error messages or content of req.body passed to controller
   * @memberof centersValidation
   */
  static updateCenter(req, res, next) {
    const {
      centerName,
      facilities,
      description,
      location,
      capacity,
      imageUrl
    } = req.body;
    const errors = {};
    Object.entries(req.body).forEach((entry) => {
      if (isEmpty(entry[1])) {
        entry[1] = null;
      }

      if (entry[0] === 'capacity') {
        if (entry[1] !== null) {
          if (!/^[0-9]+$/.test(capacity)) {
            errors.capacity = 'Center capacity can only contain numbers';
          }
        }
      }

      // validations for url
      if (entry[0] === 'capacity') {
        if (entry[1] !== null) {
          if (!validator.isURL(imageUrl)) {
            errors.imageUrl = 'The url is not valid';
          }
        }
      }

      // validations for centername
      if (entry[0] === 'centerName') {
        if (entry[1] !== null) {
          if (!/^[a-zA-Z0-9 ]+$/.test(centerName)) {
            errors.centerName =
              'Center Name can only contain numbers and letters';
          }
          if (!validator.isLength(centerName, { min: 5, max: 20 })) {
            errors.centerName =
              'The Center Name must be more than 5 characters but less than 20';
          }
        }
      }

      // validations for facilities
      if (entry[0] === 'facilities') {
        if (entry[1] !== null) {
          if (!validator.isLength(facilities, { min: 5, max: 1000 })) {
            errors.facilities =
              'facilities must be greater than 5 but less than 1000 words';
          }
          if (!/^[a-zA-Z0-9,.& ]+$/.test(facilities)) {
            errors.facilities =
              'Facilities can not include symbols except comma which you should use to separate the faciities'; // eslint-disable-line
          }
        }
      }

      // validations for description
      if (entry[0] === 'description') {
        if (entry[1] !== null) {
          if (!validator.isLength(description, { min: 5, max: 1000 })) {
            errors.description =
              'description must be greater than 5 but less than 1000 words';
          }
          if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
            errors.description =
              'description can not include symbols except comma and full stop';
          }
        }
      }

      // validations for location
      if (entry[0] === 'location') {
        if (entry[1] !== null) {
          if (!validator.isLength(location, { min: 5, max: 1000 })) {
            errors.location =
              'location must be greater than 5 but less than 100 words';
          }
          if (!/^[a-zA-Z0-9, ]+$/.test(location)) {
            errors.location = 'location can not include symbols except comma';
          }
        }
      }

      return errors;
    });
    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
  }
}
