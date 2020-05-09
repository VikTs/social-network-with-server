import { authAPI, securityAPI } from "../../api/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';
const REGISTER_USER = 'social-network/auth/REGISTER_USER';
const DELETE_USER_PAGE = 'social-network/auth/DELETE_USER_PAGE'
const GET_MY_DATA = 'social-network/auth/GET_MY_DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    myFullData: null,
    myFriends: null,
    captchaUrl: null //if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
        case REGISTER_USER:
            return { ...state, ...payload }

        case DELETE_USER_PAGE:
            return { ...state, userId: null, email: null, login: null, isAuth: false }

        case GET_MY_DATA:
            return {
                ...state,
                myFullData: payload.myFullData,
                myFriends: payload.myFriends
            }

        default: return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth }, //передача данных об авторизации
});

const getMyDataAC = (myFullData, myFriends) => ({
    type: GET_MY_DATA,
    payload: { myFullData, myFriends },
});

export const registerUser = (formData) => ({
    type: REGISTER_USER,
    payload: { ...formData },
});

export const deleteUserPage = () => ({
    type: DELETE_USER_PAGE,
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const { id, login, email } = response.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const getMyData = () => async (dispatch) => {
    const response = await authAPI.getMyData();
    const { myData, friends } = response.data;
    dispatch(getMyDataAC(myData, friends));
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    await authAPI.login(email, password, rememberMe, captcha)
    dispatch(getAuthUserData())
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) { //если вылогинились, удаляются куки
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const registration = (formData) => async (dispatch) => {
    const response = await authAPI.registration(formData)
    if (response.data.resultCode === 0) {
        dispatch(registerUser(formData))
        dispatch(getAuthUserData())
    }
}

export const deletePage = (userId) => async (dispatch) => {
    await authAPI.deletePage(userId)
    dispatch(deleteUserPage())
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer