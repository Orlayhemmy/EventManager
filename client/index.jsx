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
import HomePage from './components/homePage';
import CentersPage from './components/centersPage';
import AboutPage from './components/aboutPage';
import AdminPanelPage from './components/adminPanelPage';
import AddCenterPage from './components/addCenterPage';
import AddEvent from './components/addEventPage';
import ModifyEvent from './components/modifyEventPage';
import ViewCenter from './components/viewCenterPage';
import UserPanel from './components/userPanelPage';
import setAuthToken from './utils/setAuthorizationToken';
import PasswordRecovery from './components/passwordRecoveryPage';
import Profile from './components/profile';
import { setCurrentUser } from './actions/userActions';
import { setCurrentEvent } from './actions/eventActions';
import { setCurrentCenter } from './actions/centerActions';
import style from './sass/style.scss';
import Image from './components/imageUpload';

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
