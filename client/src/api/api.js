import * as axios from 'axios'
import { Result } from 'express-validator';

const instance = axios.create({
    withCredentials: true, //сервер должен поддерж
    baseURL: '/api',
    headers: {//'API-KEY': '916a03f6-7b8e-4743-b877-221854dab6ae'
    }
});

const getDataFromLocalStorage = () => {
    if (localStorage.getItem('userData')) {
        return localStorage.getItem('userData')
    }
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 2) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            { withCredentials: true })
            .then(response => { return response.data });
    },
    follow(userId) {
        return instance.post(`follow/${userId.id}`)

    },
    unfollow(userId) {
        return instance.delete(`follow/${userId.id}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Use profileAPI')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        const userData = getDataFromLocalStorage();
        return instance.put(`profile/status`, { status, userData });
        //в put вторым свойством передаем json-объект, его тип смотрим в документации
    },
    savePhoto(photoFile) {
        //console.log(photoFile)
        const formData = new FormData();
        formData.append("image", photoFile) //image - из документации
        //console.log(formData)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        //в put вторым свойством передаем json-объект, его тип смотрим в документации
    }
}

//методы запросов, связанных с авторизацией
export const authAPI = {
    me() {
        //get/delete - чтобы отправить данные - .get(`auth/me?var=10`), 
        //GET/DELETE - БЕЗ ЗАПЯТОЙ, через ?
        const userData = getDataFromLocalStorage();
        return instance.post(`auth/me`, { userData })
    },
    // в auth/login есть post и delete
    //мы создаем новую сессию
    //auth/login - из документации
    login(email, password, rememberMe = false, captcha = null) { //email,password - required
        //данные - через запятую
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
            .then(result => { localStorage.setItem('userData', result.data.token) })
    },
    logout() {
        return instance.delete(`auth/login`) //отправляем delete запрос на тот же endpoint
            .then((result) => { localStorage.removeItem('userData'); return result })
    },
    registration(formData) {
        return instance.post(`auth/register`, { formData })
            .then(result => {
                localStorage.setItem('userData', result.data.token);
                return result
            })
    },
    deletePage(userId) {
        return instance.delete(`auth/deletePage/${userId}`)
            .then((result) => { localStorage.removeItem('userData'); return result })
    }
}

//captcha
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }

}
