import jwt from 'jsonwebtoken';
import models from '../models';
import {
  searchFacilities,
  searchLocation,
  searchCapacity
} from '../helper/centerSearchCriteria';

const { Centers, Events } = models;

/**
 * @class CenterController
 */
export default class CenterController {
  /**
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof CenterController
   */
  static getAllCenters(req, res) {
    const {
      location,
      facilities,
      capacity,
      capacityType,
      btwValue
    } = req.query;

    // get centers
    Centers.findAll({
      where: {
        location: searchLocation(location),
        capacity: searchCapacity(capacityType, btwValue, capacity),
        facilities: searchFacilities(facilities)
      }
    })
      .then((centers) => {
        // if centers are available
        if (centers) {
          // show centers
          return res.status(200).send({
            centers,
            message: 'Centers found'
          });
        }
        // No center found
        return res.status(404).send({
          err: 'Error',
          message: 'There are no available Centers'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }

  /**
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object}  return a single center
   * @memberof CenterController
   */
  static getSingleCenter(req, res) {
    Centers.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Events
        }
      ]
    })
      .then((center) => {
        if (center) {
          const payload = {
            center
          };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 60 * 60 * 12
          });
          req.body.token = token;
          return res.status(200).send({
            token,
            center,
            message: 'Center found'
          });
        }
        return res.status(400).send({
          err: 'Error',
          message: 'No Center Found'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }

  /**
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Success message
   * @memberof CenterController
   */
  static postCenter(req, res) {
    const {
      centerName,
      location,
      description,
      facilities,
      capacity,
      imageUrl
    } = req.body;
    const { id } = req.decoded;

    Centers.findOne({ where: { centerName } })
      .then((foundCenter) => {
        if (foundCenter) {
          return res.status(409).send({
            message: `${centerName} already exist`
          });
        }
        const place = location.toLowerCase();
        const fac = facilities.toLowerCase();
        const facilityArray = fac.split(',');
        Centers.create({
          centerName,
          location: place,
          description,
          facilities: facilityArray,
          capacity,
          imageUrl,
          userId: id
        })
          .then(center =>
            res.status(201).send({
              center,
              message: 'Successfully created a center'
            }))
          .catch(error =>
            res.status(500).send({
              err: 'Error',
              message: error.message
            }));
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }

  /**
   * Modify a center
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} update error messages or success messages
   * @memberof CenterController
   */
  static updateCenter(req, res) {
    const {
      centerName,
      location,
      description,
      facilities,
      capacity,
      imageUrl
    } = req.body;

    const { id } = req.params;
    return Centers.findById(id)
      .then((center) => {
        if (center) {
          let facilityArray;
          if (facilities) {
            const fac = facilities.toLowerCase();
            facilityArray = fac.split(',');
          }
          return center
            .update({
              centerName: centerName.toLowerCase() || center.centerName,
              location: location.toLowerCase() || center.location,
              description: description.toLowerCase() || center.description,
              facilities: facilityArray || center.facilities,
              capacity: capacity || center.capacity,
              imageUrl: imageUrl || center.imageUrl
            })
            .then(() =>
              res.status(200).send({
                message: 'Successfully updated center'
              }))
            .catch(error =>
              res.status(500).send({
                err: 'Error',
                message: error.message
              }));
        }
        return res.status(404).send({
          err: 'Error',
          message: 'Center not Found'
        });
      })
      .catch(err =>
        res.status(500).send({
          message: err.message
        }));
  }
  /**
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} success or failure message
   * @memberof CenterController
   */
  static deleteCenter(req, res) {
    const centerId = req.params.id;

    return Centers.findById(centerId)
      .then((center) => {
        if (center) {
          return center.destroy().then(() =>
            res.status(200).send({
              message: 'Center Deleted'
            }));
        }
        return res.status(400).send({
          err: 'Error',
          message: 'Center does not exist'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }

  /**
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} success or failure message
   * @memberof CenterController
   */
  static centerStatus(req, res) {
    const { id } = req.params;
    return Centers.findById(id)
      .then((center) => {
        if (center) {
          return center
            .update({
              status: false
            })
            .then(() =>
              res.status(200).send({
                message: 'ok'
              }));
        }
        return res.status(404).send({
          err: 'Error',
          message: 'not found'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }
}
