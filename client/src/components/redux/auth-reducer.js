import { authAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';
const REGISTER_USER = 'social-network/auth/REGISTER_USER';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null //if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
        case REGISTER_USER:
            return {
                ...state,
                ...action.payload
            }

        default: return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth } //передача данных об авторизации
    }
}

export const registerUser = (email, password, name, surname, age, city, facebook, youtube) => {
    return {
        type: REGISTER_USER,
        payload: { email, password, name, surname, age, city, facebook, youtube }
    }
}

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
}

//THUNK - внутренняя ф-я, которая возвращает внешнюю ф-ю
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    // console.log('response.data.resultCode',response.data.resultCode);
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

//THUNKcreator = () => THUNK()
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    dispatch(getAuthUserData())
    // if (response.data.resultCode === 0) { //если залогинены
    //     dispatch(getAuthUserData()) //запрашиваем авторизацию у auth/me
    // } else {

    //     if (response.data.resultCode === 10) {
    //         dispatch(getCaptchaUrl())
    //     }

    //     // stopSubmit:
    //     // - action creator из redux-form, 
    //     // - если произошла ошибка (resultCode=0), то сообщает форме эту информацию (для отображения для пользователя)
    //     // - стопает форму
    //     // 1) название нашей формы "login", там где оборачиваем ReduxForm
    //     // 2) поле, где была ошибка и сообщение о типе ошибки 
    //     let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Smth wrong'
    //     dispatch(stopSubmit("login", { _error: message }))
    // }


}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) { //если вылогинились, удаляются куки
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const registration = (email, password, name, surname, age, city, facebook, youtube) => async (dispatch) => {
    let response = await authAPI.registration(email, password, name, surname, age, city, facebook, youtube)
    if (response.data.resultCode === 0) {
        dispatch(registerUser(email, password, name, surname, age, city, facebook, youtube))
        dispatch(getAuthUserData())
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer