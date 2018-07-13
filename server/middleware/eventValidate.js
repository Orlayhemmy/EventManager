import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Validates all requests for events route
 * @class eventsValidation
 */
export default class Validation {
  /**
   * Validates all events details
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @class postEvent
   * @returns {object} Validatio error
   * @memberof eventsValidation
   */
  static postEvent(req, res, next) {
    const {
      eventTitle,
      bookedDate,
      description,
      centerId,
      dateArray
    } = req.body;
    const errors = {};
    if (
      eventTitle === undefined ||
      bookedDate === undefined ||
      description === undefined ||
      centerId === undefined
    ) {
      return res.status(400).send({
        message: 'All or Some Fields are Undefined'
      });
    }
    // validations for eventTitle

    if (!validator.isEmpty(eventTitle)) {
      if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
        errors.eventTitle =
          'The event Name must be more than 5 characters but less than 20';
      }
      if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
        errors.eventTitle = 'Event Name can only contain numbers and letters';
      }
    } else {
      errors.eventTitle = 'Event Name cannot be blank';
    }
    // validations for bookedDate
    if (dateArray === undefined) {
      if (!validator.isEmpty(bookedDate)) {
        if (!validator.toDate(bookedDate)) {
          errors.bookedDate = 'Invalid Date';
        }
      } else {
        errors.bookedDate = 'Date must be selected';
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
    } else {
      errors.description = 'Event should have a description';
    }
    // validations for centerId
    if (!validator.isEmpty(centerId)) {
      if (!validator.isInt(centerId)) {
        errors.centerId = 'centerId must be a number';
      }
    } else {
      errors.centerId = 'Please select a Center';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).send(errors);
    }
    next();
  }

  /**
   * Validates all events details before allowing access to controller class
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @class updateEvent
   * @returns {object} error messages or content of req.body
   * @memberof eventsValidation
   */
  static updateEvent(req, res, next) {
    const {
      eventTitle,
      bookedDate,
      description,
      centerId,
      dateArray
    } = req.body;
    const errors = {};
    Object.entries(req.body).forEach(entry => {
      if (isEmpty(entry[1])) {
        entry[1] = null;
      }

      // validations for eventTitle
      if (entry[0] === 'eventTitle') {
        if (entry[1] !== null) {
          if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
            errors.eventTitle =
              'The event Name must be more than 5 characters but less than 20';
          }
          if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
            errors.eventTitle =
              'Event Name can only contain numbers and letters';
          }
        }
      }
      // validations for bookedDate
      if (dateArray === undefined) {
        if (entry[0] === 'bookedDate') {
          if (!validator.toDate(bookedDate)) {
            errors.bookedDate = 'Invalid Date';
          }
        }
      }
      // validations for description
      if (entry[0] === 'description') {
        if (!validator.isLength(description, { min: 5, max: 1000 })) {
          errors.description =
            'description must be greater than 5 but less than 1000 words';
        }
        if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
          errors.description =
            'description can not include symbols except comma and full stop';
        }
      }
      if (entry[0] === 'centerId') {
        if (!/^[0-9]+$/.test(centerId)) {
          errors.centerId = 'centerId must be a number';
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
