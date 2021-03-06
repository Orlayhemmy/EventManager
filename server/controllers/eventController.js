import models from '../models';
import ActivityController from './activityContoller';

const { setEventActivity, notifyAdmin, notifyUser } = ActivityController;

const { Events, Centers } = models;

/**
 * @class EventController
 */
export default class EventController {
  /**
   * Get center events details
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static getCenterEvents(req, res) {
    // get events
    return Events.all({
      where: {
        centerId: req.params.id
      },
      order: [['bookedDate', 'DESC']]
    }).then(events =>
      res.status(200).send({
        events,
        message: 'Center events found'
      }));
  }

  /**
   * user events details are fetched
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static getUserEvents(req, res) {
    const { id } = req.decoded;
    // get events
    return Events.findAll({
      where: {
        userId: id
      },
      include: [
        {
          model: Centers
        }
      ],
      order: [['createdAt', 'DESC']]
    }).then(events =>
      res.status(200).send({
        events,
        message: 'User events found'
      }));
  }

  /**
   * get single event details
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static getSingleEvent(req, res) {
    return Events.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Centers
        }
      ]
    }).then(event =>
      res.status(200).send({
        message: 'Event Found',
        event
      }));
  }

  /**
   * Insert new event details into database
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static postEvent(req, res) {
    const {
      eventTitle,
      centerId,
      description,
      dateArray,
      bookedDate
    } = req.body;
    const { id } = req.decoded;
    let dateBooked;
    if (bookedDate !== undefined && bookedDate !== '') {
      dateBooked = bookedDate.split(',');
    }
    return Events.create({
      eventTitle,
      description,
      bookedDate: dateArray || dateBooked,
      centerId,
      userId: id
    }).then(bookedEvent => {
      setEventActivity(req);
      notifyAdmin(req);
      res.status(201).send({
        message: 'Event booked Successfully',
        bookedEvent
      });
    });
  }

  /**
   * update exisiting user event details
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static updateEvent(req, res) {
    const {
      eventTitle,
      description,
      dateArray,
      centerId,
      bookedDate
    } = req.body;
    const { id } = req.params;
    let dateBooked;
    if (bookedDate !== undefined && bookedDate !== '') {
      dateBooked = bookedDate.split(',');
    }
    return Events.findById(id).then(event => {
      if (event) {
        return event
          .update({
            eventTitle: eventTitle || event.eventTitle,
            bookedDate: dateArray || dateBooked || event.bookedDate,
            description: description || event.description,
            centerId: centerId || event.centerId
          })
          .then(newEvent =>
            res.status(202).send({
              message: 'Changes Applied',
              newEvent
            }));
      }
      return res.status(404).send({
        err: 'Error',
        message: 'Event does not exist'
      });
    });
  }

  /**
   * Admin approve user event
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static approveEvent(req, res) {
    const { id } = req.params;
    return Events.findById(id).then(event =>
      event
        .update({
          isApproved: true
        })
        .then(newEvent => {
          req.body.userId = newEvent.userId;
          notifyUser(req);
          res.status(202).send({
            message: 'Event Approved',
            event: newEvent
          });
        }));
  }

  /**
   * user or admin delete event
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static deleteEvent(req, res) {
    const eventId = req.params.id;
    return Events.findById(eventId).then(event =>
      event.destroy().then(() =>
        res.status(200).send({
          message: 'Event Deleted'
        })));
  }

  /**
   * fetch the number of user events
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof EventController
   */
  static getEventBookedCount(req, res) {
    return Events.findAndCountAll({
      where: {
        userId: req.decoded.id
      }
    }).then(event => {
      const eventBookedCount = event.count;
      return res.status(200).send({
        message: 'Events found',
        eventBookedCount
      });
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} true or false
   * @memberof EventController
   */
  static checkEventDate(req, res) {
    const { bookedDate, centerId } = req.body;
    // query db
    return Events.findOne({
      where: {
        bookedDate: {
          $contains: [bookedDate]
        },
        centerId
      }
    }).then(event => {
      if (event) {
        return res.status(409).send({
          isAvailable: false,
          message:
            'The date chosen is booked, Please select another day or center'
        });
      }
      return res.status(200).send({
        isAvailable: true,
        message: 'Date is available'
      });
    });
  }
}
