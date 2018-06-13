import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import store from './store';
import allReducers from './reducers/reducersIndex';
import HomePage from './components/Homepage/Index';
import CentersPage from './components/GuestCenters/Container/centersPage';
import AboutPage from './components/AboutPage/Index';
import AdminPanelPage from './components/AdminDashboard/Container/Index';
import AddCenterPage from './components/CenterDetails/Container/addCenterPage';
import AddEvent from './components/EventPage/addEventPage';
import ModifyEvent from './components/EventPage/modifyEventPage';
import ViewCenter from './components/CenterDetails/Container/viewCenterPage';
import UserPanel from './components/Dashboard/Index';
import setAuthToken from './utils/setAuthorizationToken';
import PasswordRecovery from './components/PasswordRecovery/passwordRecoveryPage';
import Profile from './components/Profile/Index';
import { setCurrentUser } from './actions/userActions';
import { setCurrentEvent } from './actions/eventActions';
import { setCurrentCenter } from './actions/centerActions';
import style from './sass/style.scss';
import Image from './components/ImageUpload/imageUpload';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if (localStorage.event) {
  store.dispatch(setCurrentEvent(jwt.decode(localStorage.event)));
}
if (localStorage.center) {
  store.dispatch(setCurrentCenter(jwt.decode(localStorage.center)));
}
//put component into html page
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/imageupload" component={Image} />
        <Route exact path="/view-centers" component={CentersPage} />
        <Route exact path="/add-center" component={AddCenterPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/admin-centers" component={AdminPanelPage} />
        <Route exact path="/dashboard" component={UserPanel} />
        <Route exact path="/add-event" component={AddEvent} />
        <Route exact path="/modify-event" component={ModifyEvent} />
        <Route exact path="/view-center-event" component={ViewCenter} />
        <Route exact path="/recover-password" component={PasswordRecovery} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('page-wrapper')
);
