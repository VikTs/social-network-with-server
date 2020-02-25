import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'


let reducers = combineReducers ({
    profileState: profileReducer,
    messagesState: dialogsReducer,
    sidebar: sidebarReducer,
    userPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer //для formReducer обязательно писать form - это значение по умолчанию, название стейта форм в глобальном стейте
})

//for chrome devTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;