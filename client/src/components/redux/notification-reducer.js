import { notificationAPI } from "../../api/api";

const CREATE_LIKE_NOTIFICATION = 'CREATE-LIKE-NOTIFICATION';
const GET_NOTIFICATION_LIST = 'GET-NOTIFICATION-LIST';

let initialState = {
    likesNotification: [],
    friendNotification: [],
    newNotificationsCount: 0
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIKE_NOTIFICATION:
            //userId, postId, isLiked
            //console.log(action.isLiked)
            return {
                ...state,
                likesNotification: [...state.likesNotification,
                {
                    postId: action.postId,
                    userId: action.userId,                     
                    isLiked: action.isLiked
                }],
                newNotificationsCount: ++state.newNotificationsCount
            };
            case GET_NOTIFICATION_LIST: 
            return {
                ...state,
                likesNotification: action.likesNotification
            }
        default: return state;
    }
    //return state
}

const createLikeNotificationAC = (userId, postId, isLiked) => {
    return {
        type: CREATE_LIKE_NOTIFICATION,
        userId, postId, isLiked
    }
}

export const createLikeNotification = (userId, postId, isLiked) => async (dispatch) => {
   // console.log(myId, userId, postId, isLiked)
    let response = await notificationAPI.createLikeNotification( userId, postId, isLiked);
    dispatch(createLikeNotificationAC(userId, postId, isLiked));
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