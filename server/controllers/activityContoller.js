import models from '../models';

const { Activities } = models;

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
    Activities.findAll({
      where: {
        userId: req.decoded.id,
      },
      order: [['createdAt', 'DESC']],
    }).then((activities) => {
      // if activities are available
      if (activities) {
        // show activities
        return res.status(200).send({
          activities,
        });
      }
      // No activity found
      return res.status(404).send({
        message: 'There is no new activity',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  /**
   * Set activity when user performs an action
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message
   * @memberof ActivityController
   */
  static setActivity(req, res) {
    const {
      eventTitle,
      eventId,
      text,
      userId,
    } = req.body;
    let info;
    if (text) {
      info = `${eventTitle} has been ${text}`;
    } else {
      info = `${eventTitle} is added and awaiting approval`;
    }
    Activities.create({
      description: info,
      eventId,
      userId: userId || req.decoded.id,
    }).then(() => res.status(200).send({
      message: 'Activity added successfully',
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
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
        eventId: req.params.id,
      },
    }).then(() => res.status(200).send({
      message: 'Activity Deleted',
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
}

