import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();


/**
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @returns {obj} Error on
 */
const authToken = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(498);
        res.send({
          message: 'Token is Invalid or Expired',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403);
    res.send({
      message: 'Access denied. You are not logged in',
    });
  }
};

export default authToken;
