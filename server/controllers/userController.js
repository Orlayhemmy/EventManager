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

    return Users.findOne({
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
            const payload = { id: user.id, eventBookedCount: 0, isAdmin: user.isAdmin };
            const token = generateToken(payload);
            req.body.token = token;
            sendMail(req);
            return res.status(201).send({
              message: 'You are now Signed Up',
              token,
            });
          });
      });
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
    return Users.findOne({
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
      });
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

    return Users.findOne({
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
      });
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
    const { oldPassword } = req.body;
    return Users.findOne({
      where: {
        id: req.decoded.id
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
      });
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
    return Users.findOne({
      where: {
        email
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
            .then(updatedUser =>
              res.status(202).send({
                user: updatedUser,
                message: 'Changes Applied Successfully'
              }));
        } else {
          return res.status(400).send({
            err: 'Error',
            message: 'User not found'
          });
        }
      });
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
    return Users.findOne({
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
      });
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
    return Users.findOne({
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
      });
  }
}
