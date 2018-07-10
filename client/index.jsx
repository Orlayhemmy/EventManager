/* eslint-disable */
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
import HomePage from './components/HomePage/Container/HomePage';
import CentersPage from './components/GuestCenters/Container/CentersPage';
import AboutPage from './components/AboutPage/Container/AboutPage';
import AdminDashboardPage from './components/AdminDashboard/Container/AdminDashboardPage';
import AddCenterPage from './components/CenterDetails/Container/AddCenterPage';
import AddEvent from './components/EventPage/Container/AddEventPage';
import ModifyEvent from './components/EventPage/Container/ModifyEventPage';
import ViewCenter from './components/CenterDetails/Container/ViewCenterPage';
import UserPanel from './components/Dashboard/Container/UserPanelPage';
import PasswordRecovery from './components/PasswordRecovery/Container/PasswordRecoveryPage';
import Profile from './components/Profile/Container/Profile';
import { setCurrentUser } from './actions/userActions';
import SetAuthToken from './utils/setAuthorizationToken';
import style from './sass/style.scss';

if (localStorage.jwtToken) {
  SetAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/view-centers" component={CentersPage} />
        <Route exact path="/add-center" component={AddCenterPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/admin-centers" component={AdminDashboardPage} />
        <Route exact path="/dashboard" component={UserPanel} />
        <Route exact path="/add-event" component={AddEvent} />
        <Route exact path="/modify-event" component={ModifyEvent} />
        <Route exact path="/view-center-event" component={ViewCenter} />
        <Route exact path="/recover-password" component={PasswordRecovery} />
        <Route exact path="/profile" component={Profile} />
        <Route component={AboutPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('page-wrapper')
);
