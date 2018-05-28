import { combineReducers } from 'redux';
import auth from './auth';
import center from './center';
import event from './event';
import activity from './activity';
import adminActivity from './adminActivity';

export default combineReducers({
  auth,
  center,
  event,
  activity,
  adminActivity
});
