import bcrypt from 'bcryptjs';
import models from '../models';
import passwordHash from '../helper/passwordHash';
import generateToken from '../helper/generateToken';
import sendMail from '../helper/sendMail';

const { Users } = models;

/**
 * @class UserController
 */
export default class UserController {
  /**
   * Users details are captured and persisted on the database
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof UserController
   */
  static signup(req, res) {
    const { fullname, email, password } = req.body;

    Users.findOne({
      where: {
        email
      }
    })
      .then((foundUser) => {
        let error;
        if (foundUser) {
          error = foundUser.email;
          return res.status(409).send({
            message: `${error} already exist`
          });
        }
        const userPassword = passwordHash(password);
        const fname = fullname.toLowerCase();
        const mail = email.toLowerCase();
        Users.create({
          fullname: fname,
          email: mail,
          password: userPassword
        })
          .then((user) => {
            const payload = { userId: user.id };
            const token = generateToken(payload);
            req.body.token = token;
            sendMail(req);
            return res.status(201).send({
              message: 'You are now Signed Up',
              token
            });
          })
          .catch(err =>
            res.status(500).send({
              err: 'Error',
              message: err.message
            }));
      })
      .catch(err =>
        res.status(500).send({
          err: 'Error',
          message: err.message
        }));
  }
  /**
   * User details are captured and authenticated against database data
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with database data
   * @memberof UserController
   */
  static signin(req, res) {
    const { loginEmail, loginPassword } = req.body;
    const userEmail = loginEmail.toLowerCase();
    Users.findOne({
      where: {
        email: userEmail
      }
    })
      .then((user) => {
        if (user) {
          const check = bcrypt.compareSync(loginPassword, user.password);
          if (check) {
            const payload = { id: user.id, isAdmin: user.isAdmin };
            const token = generateToken(payload);
            req.body.token = token;
            return res.status(200).send({
              message: 'You are now logged In',
              token
            });
          }
          return res.status(400).send({
            err: 'Error',
            message: 'Invalid email or password'
          });
        }
        return res.status(404).send({
          err: 'Error',
          message: 'User not found, Please sign up if you are a new user'
        });
      })
      .catch(error =>
        res.status(500).send({
          status: 'Failed',
          message: error.message
        }));
  }
  /**
   * Check user email for validity
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message
   * @memberof UserController
   */
  static recoverPassword(req, res) {
    const { email } = req.body;

    Users.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (user) {
          return res.status(200).send({
            message: 'User found!'
          });
        }
        return res.status(404).send({
          err: 'Error',
          message: 'Email is incorrect or not registered'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }

  /**
   * Compare user password
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message
   * @memberof UserController
   */
  static PasswordCheck(req, res) {
    const { id, oldPassword } = req.body;
    Users.findOne({
      where: {
        id
      }
    })
      .then((user) => {
        if (user) {
          const check = bcrypt.compareSync(oldPassword, user.password);
          if (check) {
            return res.status(200).send({
              message: 'Password Match'
            });
          }
          return res.status(400).send({
            err: 'Error',
            message: 'Wrong Password'
          });
        }
      })
      .catch(error =>
        res.status(500).send({
          message: error.message
        }));
  }

  /**
   * Users details are captured and persisted on the database
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof UserController
   */
  static updateUser(req, res) {
    const {
      email, newPassword, fullname, imageUrl
    } = req.body;
    Users.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((user) => {
        if (user) {
          let hash;
          if (newPassword) {
            hash = passwordHash(newPassword);
          }
          user
            .update({
              fullname: fullname || user.fullname,
              password: hash || user.password,
              email: email || user.email,
              imageUrl: imageUrl || user.imageUrl
            })
            .then((updatedUser) => {
              const token = generateToken(updatedUser);
              req.body.token = token;
              return res.status(202).send({
                token,
                message: 'Changes Applied Successfully'
              });
            })
            .catch(err =>
              res.status(500).send({
                err: 'Error',
                message: err.message
              }));
        } else {
          return res.status(400).send({
            err: 'Error',
            message: 'User not found'
          });
        }
      })
      .catch(err =>
        res.status(500).send({
          err: 'Error',
          message: err.message
        }));
  }

  /**
   * Check user email for validity
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message
   * @memberof UserController
   */
  static getUserEmail(req, res) {
    Users.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((user) => {
        if (user) {
          return res.status(200).send({
            message: 'Email Found',
            email: user.email
          });
        }
        return res.status(400).send({
          err: 'Error',
          message: 'No user Found'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }

  /**
   * Get user details
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Failure message or Success message with the database data
   * @memberof UserController
   */
  static getUser(req, res) {
    Users.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((userDetails) => {
        if (userDetails) {
          return res.status(200).send({
            message: 'User Details Found',
            userDetails
          });
        }
        return res.status(400).send({
          err: 'Error',
          message: 'No user Found'
        });
      })
      .catch(error =>
        res.status(500).send({
          err: 'Error',
          message: error.message
        }));
  }
}
