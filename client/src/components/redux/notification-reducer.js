import { notificationAPI } from "../../api/api";

const CREATE_LIKE_NOTIFICATION = 'CREATE-LIKE-NOTIFICATION';
const GET_NOTIFICATION_LIST = 'GET-NOTIFICATION-LIST';
const ZEROING_NOTIFICATION_COUNT = 'ZEROING-NOTIFICATION-COUNT';

let initialState = {
    likesNotification: [],
    friendNotification: [],
    newNotificationsCount: 0
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIKE_NOTIFICATION:
            //userName, userSurname, postId, isLiked
            // console.log(action.userName)
            return {
                ...state,
                likesNotification: [...state.likesNotification,
                {
                    postId: action.postId,
                    userName: action.userName,
                    userSurname: action.userSurname,                     
                    isLiked: action.isLiked
                }],
                newNotificationsCount: ++state.newNotificationsCount
            };
            case GET_NOTIFICATION_LIST: 
            return {
                ...state,
                likesNotification: action.likesNotification
            };
            case ZEROING_NOTIFICATION_COUNT: 
            return {
                ...state,
                //likesNotification: [],
                //friendNotification: [],
                newNotificationsCount: 0
            }
        default: return state;
    }
    //return state
}

const createLikeNotificationAC = (userName, userSurname, postId, isLiked) => {
    return {
        type: CREATE_LIKE_NOTIFICATION,
        userName, userSurname, postId, isLiked
    }
}

export const zeroingNotificationsCount = () => {
    return {
        type: ZEROING_NOTIFICATION_COUNT
    }
}

export const createLikeNotification = (userId, postId, isLiked) => async (dispatch) => {
   // console.log(myId, userId, postId, isLiked)
    let response = await notificationAPI.createLikeNotification( userId, postId, isLiked);
    //console.log(response.data.newNotification);
    dispatch(createLikeNotificationAC(
        response.data.newNotification.userName, response.data.newNotification.userSurname, postId, isLiked));
    // console.log(response.data.updatedPost);
}

const getNotificationListAC = (likesNotification) => {
    return {
        type: GET_NOTIFICATION_LIST,
        likesNotification
    }
}

export const getNotificationList = () => async (dispatch) => {
     let response = await notificationAPI.getNotificationList();
     dispatch(getNotificationListAC(response.likesNotification));
 }



export default notificationReducer