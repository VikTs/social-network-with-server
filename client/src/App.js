import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom'
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import { initializeApp } from './components/redux/app-reducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from '../src/components/common/Preloader/Preloader';
import store from '../src/components/redux/redux-store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { withSuspense } from './hoc/withSuspense';
import LoginPage from './components/Login/Login';

//lazy-подгружаем компоненту в момент перехода по вкладке
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginOrRegistrationPage = React.lazy(() => import('./components/Login/LoginOrRegistration'));
//const LoginPage = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">

          <Route path='/profiles/:userId?' render={withSuspense(ProfileContainer)} />
          <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
          <Route path='/users' render={withSuspense(UsersContainer)} />
          {/* <Route path='/login' render={withSuspense(LoginPage)} /> */}
          <Route path='/login' render={withSuspense(LoginOrRegistrationPage)} />
          <Route path='/signIn' render={()=><LoginPage loginType="signIn"/>} />
          <Route path='/signUp' render={()=><LoginPage loginType="signUp"/>} />

          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
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

export default SocialApp