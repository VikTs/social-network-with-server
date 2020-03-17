import { notificationAPI } from "../../api/api";

const CREATE_LIKE_NOTIFICATION = 'CREATE-LIKE-NOTIFICATION';

let initialState = {
    likesNotification: [],
    addToFriendNotification: [],
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

export const createLikeNotification = (myId, userId, postId, isLiked) => async (dispatch) => {
    //console.log(myId, userId, postId)
   // console.log(myId, userId, postId, isLiked)
    let response = await notificationAPI.createLikeNotification(myId, userId, postId, isLiked);
    dispatch(createLikeNotificationAC(userId, postId, isLiked));
    // console.log(response.data.updatedPost);
}

export default notificationReducer