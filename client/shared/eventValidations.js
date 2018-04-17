import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function modifyEventValidation(data) {
  const {
    eventTitle,
    bookedDate,
    description,
    centerId,
  } = data;

  const errors = {};
  // validations for eventTitle
  if (!validator.isEmpty(eventTitle)) {
    if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
      errors.eventTitle = 'The event Name must be more than 5 characters but less than 20';
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
      errors.eventTitle = 'Event Name can only contain numbers and letters';
    }
  }

  // validations for bookedDate
  if (!validator.isEmpty(bookedDate)) {
    if (!validator.toDate(bookedDate)) {
      errors.bookedDate = bookedDate;
    }
  }

  // validations for description
  if (!validator.isEmpty(description)) {
    if (!validator.isLength(description, { min: 5, max: 1000 })) {
      errors.description = 'description must be greater than 5 but less than 1000 words';
    }
    if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
      errors.description = 'description can not include symbols except comma and full stop';
    }
  }

  return { errors, isValid: isEmpty(errors) };
}

export function addEventValidation(data) {
  const {
    eventTitle,
    bookedDate,
    description,
    centerId,
  } = data;
  const errors = {};
  if (eventTitle === undefined || bookedDate === undefined || description === undefined
      || centerId === undefined) {
    return res.status(400).send({
      message: 'All or Some Field are Undefined',
    });
  }
  // validations for eventTitle

  if (!validator.isEmpty(eventTitle)) {
    if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
      errors.eventTitle = 'The event Name must be more than 5 characters but less than 20';
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
      errors.eventTitle = 'Event Name can only contain numbers and letters';
    }
  } else {
    errors.eventTitle = 'event Name cannot be blank';
  }

  // validations for bookedDate
  if (!validator.isEmpty(bookedDate)) {
    if (!validator.toDate(bookedDate)) {
      errors.bookedDate = bookedDate;
    }
  } else {
    errors.bookedDate = 'please select a date for your event';
  }

  // validations for description
  if (!validator.isEmpty(description)) {
    if (!validator.isLength(description, { min: 5, max: 1000 })) {
      errors.description = 'description must be greater than 5 but less than 1000 words';
    }
    if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
      errors.description = 'description can not include symbols except comma and full stop';
    }
  } else {
    errors.description = 'Event should have a description';
  }

  // validations for centerId
  if (!validator.isEmpty(centerId)) {
    if (!validator.isInt(centerId)) {
      errors.centerId = 'center must be a number';
    }
  } else {
    errors.centerId = 'Please select a Center';
  }

  return { errors, isValid: isEmpty(errors) };
}
