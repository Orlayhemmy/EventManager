import models from '../models';

const { Users, Activities } = models;

/**
 * @class ActivityController
 */
export default class ActivityController {
  /**
   * Get all user activities
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof ActivityController
   */
  static getActivity(req, res) {
    return Activities.findAll({
      where: {
        userId: req.decoded.id,
        centerId: {
          $eq: null
        }
      },
      order: [['createdAt', 'DESC']]
    }).then(activities =>
      res.status(200).send({
        activities,
        message: 'success'
      }));
  }

  /**
   * Get all user activities
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof ActivityController
   */
  static getAdminActivity(req, res) {
    return Activities.findAll({
      where: {
        centerId: {
          $ne: null
        }
      },
      order: [['createdAt', 'DESC']]
    }).then(activities =>
      // if activities are available
      // show activities
      res.status(200).send({
        activities,
        message: 'success'
      }));
  }

  /**
   * Set activity when user performs an action
   * @static
   * @param {object} req
   * @param {object} res
   * @param {string} id
   * @returns {object} Failure message or Success message
   * @memberof ActivityController
   */
  static setCenterActivity(req) {
    const { centerName, id } = req.body;
    return Activities.create({
      description: `A new center "${centerName}" has been added`,
      centerId: id
    }).then(() => 'Success');
  }
  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} message
   */
  static notifyAdmin(req) {
    const { centerId } = req.body;
    return Users.findOne({
      where: {
        id: req.decoded.id
      }
    }).then(user => {
      return Activities.create({
        description: `${user.fullname} booked a center`,
        centerId
      }).then(() => 'success');
    });
  }

  /**
   * Set activity when user performs an action
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message
   * @memberof ActivityController
   */
  static setEventActivity(req) {
    const { eventTitle } = req.body;
    return Activities.create({
      description: `${eventTitle} is added and awaiting approval`,
      userId: req.decoded.id
    }).then(() => 'success');
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {string} userId
   * @returns {object} message
   */
  static notifyUser(req) {
    const { eventTitle, isApproved, userId } = req.body;
    let info;
    if (isApproved) {
      info = `${eventTitle} has been approved`;
    } else {
      info = `Your center booking for ${eventTitle} is declined`;
    }
    return Activities.create({
      description: info,
      userId
    }).then(() => 'success');
  }

  /**
   * delete user activity
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message
   * @memberof ActivityController
   */
  static deleteActivity(req, res) {
    return Activities.destroy({
      where: {
        eventId: req.params.id
      }
    }).then(() =>
      res.status(200).send({
        message: 'Activity Deleted'
      }));
  }
}
