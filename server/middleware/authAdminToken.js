import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

/**
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 */
const authAdminToken = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(498).send({
          message: 'Token is Invalid or Expired'
        });
      }
      req.decoded = decoded;
      const { isAdmin } = req.decoded;
      if (isAdmin) {
        return next();
      }
      res.status(403);
      res.send({
        message: 'You are not permitted to view this page'
      });
    });
  } else {
    res.status(403);
    res.send({
      message: 'Access denied. You are not logged in'
    });
  }
};

export default authAdminToken;
