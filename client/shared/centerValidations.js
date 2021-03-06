import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @param  {object} data
 * @returns {object} errors
 */
export function modifyCenterValidation(data) {
  const {
    centerName,
    facilities,
    description,
    location,
    capacity,
    imageUrl,
    cost
  } = data;
  const errors = {};

  // validations for capacity
  if (!validator.isEmpty(imageUrl)) {
    if (!validator.isURL(imageUrl)) {
      errors.imageUrl = 'Wrong image path';
    }
  }

  if (cost) {
    if (!/^[0-9]+$/.test(cost)) {
      errors.cost = 'Center cost can only contain numbers';
    }
  }

  // validations for capacity
  if (capacity) {
    if (!/^[0-9]+$/.test(capacity)) {
      errors.capacity = 'Center capacity can only contain numbers';
    }
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
  }

  // validations for facilities
  if (facilities.length > 0) {
    if (!validator.isLength(facilities, { min: 5, max: 1000 })) {
      errors.facilities =
        'facilities must be greater than 5 but less than 1000 words';
    }
    if (!/^[a-zA-Z0-9,.& ]+$/.test(facilities)) {
      errors.facilities =
        'Facilities can not include symbols except comma which you should use to separate the faciities'; // eslint-disable-line
    }
  }

  // validations for description
  if (!validator.isEmpty(description)) {
    if (!validator.isLength(description, { min: 5, max: 1000 })) {
      errors.description =
        'description must be greater than 5 but less than 1000 words';
    }
    if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
      errors.description =
        'description can not include symbols except comma and full stop';
    }
  }

  // validations for location
  if (!validator.isEmpty(location)) {
    if (!validator.isLength(location, { min: 5, max: 1000 })) {
      errors.location =
        'location must be greater than 5 but less than 100 words';
    }
    if (!/^[a-zA-Z0-9, ]+$/.test(location)) {
      errors.location = 'location can not include symbols except comma';
    }
  }

  return { errors, isValid: isEmpty(errors) };
}

/**
 * @param  {object} data
 * @returns {object} errors
 */
export function addCenterValidation(data) {
  const {
    centerName,
    facilities,
    description,
    location,
    capacity,
    cost
  } = data;

  const errors = {};

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

  // validations for cost

  if (!validator.isEmpty(cost)) {
    if (!/^[0-9]+$/.test(cost)) {
      errors.cost = 'Center cost can only contain numbers';
    }
  } else {
    errors.cost = 'Center cost cannot be blank';
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
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

/**
 * @param  {object} data
 * @returns {object} errors
 */
export function searchValidation(data) {
  const { facilities, location, capacity } = data;
  const errors = {};
  Object.entries(data).forEach(entry => {
    if (isEmpty(entry[1])) {
      entry[1] = null;
    }
    if (entry[0] === 'location') {
      if (entry[1] !== null) {
        if (!/^[a-zA-Z0-9, ]+$/.test(location)) {
          errors.location = 'location can not include symbols except comma';
        }
      }
    }
    if (entry[0] === 'capacity' || entry[0] === 'btwValue') {
      if (entry[1] !== null) {
        if (!/^[0-9]+$/.test(capacity)) {
          errors.capacity = 'Center capacity can only contain numbers';
        }
      }
    }
    if (entry[0] === 'facilities') {
      if (entry[1] !== null) {
        if (!/^[a-zA-Z0-9,.& ]+$/.test(facilities)) {
          errors.facilities =
            'Facilities can not include symbols except comma which you should use to separate the faciities'; // eslint-disable-line
        }
      }
    }

    return errors;
  });

  return { errors, isValid: isEmpty(errors) };
}

/**
 * @param  {object} data
 * @param  {string} page
 * @returns {object} errors
 */
export function checkPaginationValue(data, page) {
  const error = {};
  const { goto } = data;

  if (!/^[1-9]+$/.test(goto)) {
    error.goto = 'Please type a number within the pages range';
  }
  if (goto > page) {
    error.goto = 'Page number is not valid';
  }
  return { error, isValid: isEmpty(error) };
}
