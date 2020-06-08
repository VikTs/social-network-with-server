import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, withRouter, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import socketIOClient from "socket.io-client";

import store from '../src/components/redux/redux-store';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import SignIn from './components/Login/SignIn/SignInContainer';
import SignUp from './components/Login/SignUp/SignUpContainer';
import { initializeApp } from './components/redux/app-reducer';
import { Spinner } from '../src/components/common/Spinner/Spinner';
import { withSuspense } from './hoc/withSuspense';
import { getMyData } from './components/redux/auth-reducer';
import PrivateRoute from './components/route/PrivateRoute';
import RedirectPage from './components/route/Redirect';

import './styles/general.scss';
import './styles/scroll.scss';
import './App.scss';

var socket = socketIOClient("http://localhost:5000/");

//lazy-подгружаем компоненту в момент перехода по вкладке
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'));
const Settings = React.lazy(() => import('./components/Settings/SettingsContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
    this.props.getMyData();
  }

  render() {
    if (!this.props.initialized) {
      return <Spinner />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="app-wrapper-content">
          <NavbarContainer />
          <div className="main-content">
            <Switch>
              <PrivateRoute path='/login' component={SignIn} />
              <PrivateRoute path='/signUp' component={SignUp} />

              <PrivateRoute path='/profiles/:userId?' render={withSuspense(ProfileContainer)} />
              <PrivateRoute path='/dialogs' render={withSuspense(DialogsContainer)} />
              <PrivateRoute path='/users' render={withSuspense(UsersContainer)} />
              <PrivateRoute path='/friends' render={withSuspense(FriendsContainer)} />
              <PrivateRoute path='/settings' render={withSuspense(Settings)} />

              <Route path='*' >
                <RedirectPage props={this.props} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

const AppContainer = compose(
  withRouter, //withRouter - так как коннектим App компонент, сбиваются Route
  connect(mapStateToProps, { initializeApp, getMyData }))(App);

const SocialApp = (props) => {
  return (
    //<BrowserRouter basename={process.env.PUBLIC_URL}>
    //process.env.PUBLIC_URL - берет данные для среды, в которой запускается проект,
    //в данном случае нужен, чтобы в гитхабе не затирался URL

    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export { SocialApp, socket };
