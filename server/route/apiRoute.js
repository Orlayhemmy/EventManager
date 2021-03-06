// Dependencies
import express from 'express';
import userController from '../controllers/userController';
import centerController from '../controllers/centerController';
import eventController from '../controllers/eventController';
import activityController from '../controllers/activityContoller';
import authToken from '../middleware/authenticateToken';
import authAdminToken from '../middleware/authAdminToken';
import userValidate from '../middleware/userValidate';
import centerValidate from '../middleware/centerValidate';
import eventValidate from '../middleware/eventValidate';
import sendMail from '../helper/sendMail';

const router = express.Router();
// Routes
router
  .route('/users')
  .post(userValidate.signup, userController.signup)
  .put(authToken, userValidate.updateUser, userController.updateUser)
  .get(authToken, userController.getUser);

router
  .route('/newpassword')
  .put(userValidate.updateUser, userController.updateUser);

router.route('/users/login').post(userValidate.signin, userController.signin);

router
  .route('/passrecovery')
  .post(userValidate.recoverPassword, userController.recoverPassword);

router
  .route('/centers')
  .post(authAdminToken, centerValidate.postCenter, centerController.postCenter)
  .get(centerController.getAllCenters);

router
  .route('/centers/:id')
  .get(centerController.getSingleCenter)
  .put(
    authAdminToken,
    centerValidate.updateCenter,
    centerController.updateCenter
  )
  .delete(authAdminToken, centerController.deleteCenter);

router
  .route('/events')
  .post(authToken, eventValidate.postEvent, eventController.postEvent);

router
  .route('/centerEvents/:id')
  .get(authAdminToken, eventController.getCenterEvents);

router
  .route('/approveEvent/:id')
  .put(authAdminToken, eventController.approveEvent);

router.route('/userEvents').get(authToken, eventController.getUserEvents);

router
  .route('/events/:id')
  .get(authToken, eventController.getSingleEvent)
  .put(authToken, eventValidate.updateEvent, eventController.updateEvent)
  .delete(authToken, eventController.deleteEvent);

router.route('/userEmail/:id').get(authToken, userController.getUserEmail);

router.route('/activity').get(authToken, activityController.getActivity);

router
  .route('/adminactivity')
  .get(authToken, activityController.getAdminActivity);

router.route('/passwordcheck').post(authToken, userController.PasswordCheck);

router
  .route('/eventsbookedcount')
  .get(authToken, eventController.getEventBookedCount);

router.route('/sendmail').post(sendMail);
router.route('/checkDate').post(authToken, eventController.checkEventDate);
// Return router
export default router;
