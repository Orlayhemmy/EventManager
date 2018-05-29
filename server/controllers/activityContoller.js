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
   * Get all user activities
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof ActivityController
   */
  static getAdminActivity(req, res) {
    Activities.findAll({
      where: {
        centerId: {
          $ne: null
        }
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
   * @param {string} id
   * @returns {object} Failure message or Success message
   * @memberof ActivityController
   */
  static setCenterActivity(req, res, id) {
    const {
      centerName,
    } = req.body;
    Activities.create({
      description: `A new center "${centerName}" has been added`,
      centerId: id,
    }).then(() => 'Activity added successfully')
      .catch(error => res.status(500).send({
        message: error.message,
      }));
  }
  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} message
   */
  static notifyAdmin(req, res) {
    const {
      centerId
    } = req.body;
    Users.findOne({
      where: {
        id: req.decoded.id,
      }
    })
      .then((user) => {
        Activities.create({
          description: `${user.fullname} booked a center`,
          centerId,
        })
          .then(() => 'Activity added successfully')
          .catch(error => res.status(500).send({
            message: error.message,
          }));
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
  static setEventActivity(req, res) {
    const {
      eventTitle,
    } = req.body;
    Activities.create({
      description: `${eventTitle} is added and awaiting approval`,
      userId: req.decoded.id,
    }).then(() => 'Activity added successfully')
      .catch(error => res.status(500).send({
        message: error.message,
      }));
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {string} userId
   * @returns {object} message
   */
  static notifyUser(req, res, userId) {
    const {
      eventTitle, isApproved
    } = req.body;
    let info;
    if (isApproved) {
      info = `${eventTitle} has been approved`;
    } else {
      info = `Your center booking for ${eventTitle} is declined`;
      Activities.create({
        description: info,
        userId,
      })
        .then(() => 'Activity added successfully')
        .catch(error => res.status(500).send({
          message: error.message,
        }));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} message
   */
  static approveEvent(req, res) {
    const {
      eventTitle
    } = req.body;
    Activities.findById(req.params.id)
      .then((activity) => {
        Activities.create({
          description: `${eventTitle} has been approved`,
          userId: activity.userId,
        })
          .then(() => res.status(200).send({
            message: 'Activity added successfully',
          })).catch(error => res.status(500).send({
            message: error.message,
          }));
      });
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

