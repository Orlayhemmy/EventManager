// Dependencies
import express from 'express';
import userController from '../controllers/userController';
import centerController from '../controllers/centerController';
import eventController from '../controllers/eventController';
import authToken from '../middleware/authenticateToken';
import authAdminToken from '../middleware/authAdminToken';
import userValidate from '../middleware/userValidate';
import centerValidate from '../middleware/centerValidate';
import eventValidate from '../middleware/eventValidate';

const router = express.Router();
// Routes
router.route('/users')
  .post(userValidate.signup, userController.signup);

router.route('/users/login')
  .post(userValidate.signin, userController.signin);

router.route('/centers')
  .post(authAdminToken, centerValidate.postCenter, centerController.postCenter)
  .get(centerController.getAllCenters);

router.route('/centers/:id')
  .get(authToken, centerController.getSingleCenter)
  .put(authAdminToken, centerValidate.updateCenter, centerController.updateCenter);

router.route('/events')
  .post(authToken, eventValidate.postEvent, eventController.postEvent)
  .get(eventController.getAllEvents);

router.route('/centerEvents/:id')
  .get(authAdminToken, eventController.getCenterEvents);

router.route('/userEvents')
  .get(authToken, eventController.getUserEvents);

router.route('/events/:id')
  .get(eventController.getSingleEvent)
  .put(authToken, eventValidate.updateEvent, eventController.updateEvent)
  .delete(authToken, eventController.deleteEvent);

// Return router
export default router;
