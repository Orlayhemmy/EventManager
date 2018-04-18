// Dependencies
import express from 'express';
import userController from '../controllers/userController';
import centerController from '../controllers/centerController';
import eventController from '../controllers/eventController';
import activityController from '../controllers/activityContoller';
import adminActivityController from '../controllers/adminActivitiesController';
import authToken from '../middleware/authenticateToken';
import authAdminToken from '../middleware/authAdminToken';
import userValidate from '../middleware/userValidate';
import centerValidate from '../middleware/centerValidate';
import eventValidate from '../middleware/eventValidate';
import sendMail from '../helper/sendMail';
import shortCode from '../helper/generateCode';

const router = express.Router();
// Routes
router.route('/users')
  .post(userValidate.signup, userController.signup)
  .put(authToken, userValidate.updateUser, userController.updateUser)
  .get(authToken, userController.getUser);

router.route('/users/login')
  .post(userValidate.signin, userController.signin);

router.route('/passrecovery')
  .post(userValidate.recoverPassword, userController.recoverPassword);

router.route('/centers')
  .post(authAdminToken, centerValidate.postCenter, centerController.postCenter)
  .get(centerController.getAllCenters);

router.route('/centers/:id')
  .get(authToken, centerController.getSingleCenter)
  .put(authAdminToken, centerValidate.updateCenter, centerController.updateCenter)
  .delete(authAdminToken, centerController.deleteCenter);

router.route('/events')
  .post(authToken, eventValidate.postEvent, eventController.postEvent)
  .get(authToken, eventController.getAllEvents);

router.route('/centerEvents/:id')
  .get(authAdminToken, eventController.getCenterEvents);

router.route('/approveEvent/:id')
  .put(authAdminToken, eventController.approveEvent);

router.route('/userEvents')
  .get(authToken, eventController.getUserEvents);

router.route('/events/:id')
  .get(authToken, eventController.getSingleEvent)
  .put(authToken, eventValidate.updateEvent, eventController.updateEvent)
  .delete(authToken, eventController.deleteEvent);

router.route('/sendmail')
  .post(sendMail);

router.route('/userEmail/:id')
  .get(authToken, userController.getUserEmail);

router.route('/centerStatus/:id')
  .put(centerController.centerStatus);

router.route('/activity')
  .post(authToken, activityController.setActivity)
  .get(authToken, activityController.getActivity);

router.route('/activity/:id')
  .delete(authToken, activityController.deleteActivity);

router.route('/adminactivity')
  .post(authToken, adminActivityController.setActivity)
  .get(authAdminToken, adminActivityController.getActivity);

router.route('/passwordcheck')
  .post(authToken, userController.PasswordCheck);

router.route('/eventsbookedcount/:id')
  .get(authToken, eventController.getEventBookedCount);

router.route('/shortcode')
  .get(shortCode);
  
// Return router
export default router;
