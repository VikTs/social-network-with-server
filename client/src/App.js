import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import socketIOClient from "socket.io-client";

import store from '../src/components/redux/redux-store';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/NewsContainer';
import Settings from './components/Settings/SettingsContainer';
import Requests from './components/Requests/RequestsContainer';
import SignIn from './components/Login/SignIn/SignInContainer';
import SignUp from './components/Login/SignUp/SignUpContainer';
import { initializeApp } from './components/redux/app-reducer';
import { Spinner } from '../src/components/common/Spinner/Spinner';
import { withSuspense } from './hoc/withSuspense';

import './styles/general.scss';
import './styles/scroll.scss';
import './App.scss';

var socket = socketIOClient("http://localhost:5000/");

//lazy-подгружаем компоненту в момент перехода по вкладке
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const NotificationContainer = React.lazy(() => import('./components/Notification/NotificationContainer'));

class App extends React.Component {
  // state = {
  //   endpoint: "http://localhost:5000/" 
  // };
  // socket = socketIOClient(this.state.endpoint);

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Spinner />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="app-wrapper-content">
          <Navbar />
          <div className="main-content">
            <Route path='/profiles/:userId?' render={withSuspense(ProfileContainer)} />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
            <Route path='/users' render={withSuspense(UsersContainer)} />
            <Route path='/friends' render={withSuspense(UsersContainer)} />
            <Route path='/requests' component={Requests} />
            <Route path='/notification' render={withSuspense(NotificationContainer)} />
            <Route path='/login' component={SignIn} />
            <Route path='/signUp' component={SignUp} />
            <Route path='/news' component={News} />
            <Route path='/settings' component={Settings} />
            {!this.props.isAuth ?
              <Route exact path='/'> <Redirect to="login" /></Route> :
              <Route exact path='/' render={withSuspense(ProfileContainer)} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
})

const AppContainer = compose(
  withRouter, //withRouter - так как коннектим App компонент, сбиваются Route
  connect(mapStateToProps, { initializeApp }))(App);

const SocialApp = (props) => {
  return (
    //<BrowserRouter basename={process.env.PUBLIC_URL}>
    //process.env.PUBLIC_URL - берет данные для среды, в которой запускается проект,
    //в данном случае нужен, чтобы в гитхабе не затирался URL

    // <HashRouter>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
    //  </HashRouter > 
  )
}

export { SocialApp, socket };
