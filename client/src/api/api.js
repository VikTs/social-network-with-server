import * as axios from 'axios'
import { authCheck, getCurrentUserId } from '../middleware/auth.middleware'
// import { Result } from 'express-validator';

const instance = axios.create({
    withCredentials: true, //сервер должен поддерж
    baseURL: '/api',
    headers: { }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, isFriendsPage = false) {
        const myId = getCurrentUserId();
        return instance.get(`users?page=${currentPage}&count=${pageSize}&id=${myId}&friends=${isFriendsPage}`,
            { withCredentials: true })
            .then(response => { return response.data });
    },
    follow(userId) {
        const myId = getCurrentUserId();
        return instance.post(`users/follow`, { userId, myId })
    },
    unfollow(userId) {
        const myId = getCurrentUserId();
        return instance.delete(`users/follow?userid=${userId}&myid=${myId}`)
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
    updateProfile(updatedData) {
        const myId = getCurrentUserId();
        return instance.put(`profile`, { updatedData, myId });
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        const userId = getCurrentUserId()
        return instance.put(`profile/status`, { status, userId });
        //в put вторым свойством передаем json-объект, его тип смотрим в документации
    },
    savePhoto(photoLink) {
        const userId = getCurrentUserId();
        return instance.put(`profile/photo`, { photoLink, userId });
    },
    addPost(postText) {
        const userId = getCurrentUserId()
        return instance.put(`profile/posts`, { postText, userId });
    },
    // getPosts(userId, myId) {        
    //     return instance.get(`profile/posts/${userId}`);
    // },
    getPosts(userId) {
        const myId = getCurrentUserId()
        return instance.get(`profile/posts/${userId}/${myId}`);
    },
    deletePost(postId) {
        const userId = getCurrentUserId()
        return instance.delete(`profile/posts/?userId=${userId}&postId=${postId}`)
    },
    likePost(userId, postId) {
        const myId = getCurrentUserId()
        return instance.post(`profile/posts/likes`, { myId, userId, postId })
    }
}

//методы запросов, связанных с авторизацией
export const authAPI = {
    me() {
        //get/delete - чтобы отправить данные - .get(`auth/me?var=10`), 
        //GET/DELETE - БЕЗ ЗАПЯТОЙ, через ?
        const userData = authCheck();
        return instance.post(`auth/me`, { userData })
    },
    getMyData() {
        const myId = getCurrentUserId()
        return instance.get(`auth/myData/${myId}`)
    },
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

export const notificationAPI = {
    createLikeNotification(userId, postId, isLiked) {
        const myId = getCurrentUserId()
        return instance.post(`notification/newLike`, { myId, userId, postId, isLiked })
    },
    addReqFriendNotification(userId) {
        const myId = getCurrentUserId()
        return instance.post(`notification/friendreq`, { myId, userId })
    },
    removeReqFriendNotification(userId) {
        const myId = getCurrentUserId();
        return instance.delete(`notification/friendreq/${myId}/${userId}`);
    },
    getNotificationList() {
        const myId = getCurrentUserId();
        return instance.get(`notification/getList/${myId}`);
    },
    getNewNotificationCount() {
        const myId = getCurrentUserId();
        return instance.get(`notification/getNewCount/${myId}`);
    },
    zeroingNewCount() {
        const myId = getCurrentUserId();
        return instance.delete(`notification/zeroingNew/${myId}`);
    },
    cleanAllNotifications() {
        const myId = getCurrentUserId();
        return instance.delete(`notification/${myId}`);
    }
}

export const messagesAPI = {
    sendMessage(newMessage) {
        return instance.post(`messages/message`, {newMessage});
    },
    createChat(newChat) {
        return instance.post(`messages/chat`, {newChat});
    },
    getChats() {
        const myId = getCurrentUserId();
        return instance.get(`messages/chats/${myId}`);
    },
    getMessages() {
        const myId = getCurrentUserId();
        return instance.get(`messages/messages/${myId}`);
    },
    addNewChatMember(newMember, chatId) {
        return instance.put(`messages/chats/member`, {newMember, chatId});
    },
    deleteChat(chatId) {
        return instance.delete(`messages/chats/${chatId}`);
    },
    deleteMemberFromChat(memberId, chatId) {
        return instance.delete(`messages/chats/${chatId}/${memberId}`);
    }
}

