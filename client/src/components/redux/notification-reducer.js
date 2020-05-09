import { notificationAPI } from "../../api/api";

// const CREATE_LIKE_NOTIFICATION = "CREATE-LIKE-NOTIFICATION";
const GET_NOTIFICATION_LIST = "GET-NOTIFICATION-LIST";
const ZEROING_NOTIFICATION_COUNT = "ZEROING-NOTIFICATION-COUNT";
const GET_NOTIFICATION_COUNT = "GET-NOTIFICATION-COUNT";
const CLEAN_ALL_NOTIFICATIONS = "CLEAN-ALL-NOTIFICATIONS";

let initialState = {
  likesNotification: [],
  friendNotificationRequest: [],
  friendNotificationResponse: [],
  friendNotificationDeleteRequest: [],
  newNotificationsCount: 0
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_LIST:
      return {
        ...state,
        likesNotification: action.likesNotification,
        friendNotificationRequest: action.friendNotificationRequest,
        friendNotificationResponse: action.friendNotificationResponse,
        friendNotificationDeleteRequest: action.friendNotificationDeleteRequest,
        newNotificationsCount: action.newNotificationsCount,
      };
    case ZEROING_NOTIFICATION_COUNT:
      return {
        ...state,
        newNotificationsCount: 0
      };
    case GET_NOTIFICATION_COUNT:
      return {
        ...state,
        newNotificationsCount: action.newCount
      };
    case CLEAN_ALL_NOTIFICATIONS:
      return {
        ...state,
        likesNotification: [],
        friendNotificationRequest: [],
        friendNotificationResponse: [],
        friendNotificationDeleteRequest: [],
        newNotificationsCount: 0
      };
    default:
      return state;
  }
};

const zeroingNotificationsCountAC = () => {
  return {
    type: ZEROING_NOTIFICATION_COUNT
  };
};

const getNotificationListAC = (
  likesNotification,
  friendNotificationRequest,
  friendNotificationResponse,
  friendNotificationDeleteRequest,
  newNotificationsCount
) => {
  return {
    type: GET_NOTIFICATION_LIST,
    likesNotification,
    friendNotificationRequest,
    friendNotificationResponse,
    friendNotificationDeleteRequest,
    newNotificationsCount
  };
};

const getNotificationCountAC = newCount => {
  return {
    type: GET_NOTIFICATION_COUNT,
    newCount
  };
};

const cleanAllNotificationsAC = () => {
  return {
    type: CLEAN_ALL_NOTIFICATIONS
  };
};

export const createLikeNotification = (userId, postId, isLiked) => async dispatch => {
  await notificationAPI.createLikeNotification(userId, postId, isLiked);
  //dispatch(createLikeNotificationAC(response.data.newNotificationInfo));
};

export const zeroingNotificationsCount = () => async dispatch => {
  await notificationAPI.zeroingNewCount();
  dispatch(zeroingNotificationsCountAC());
};

export const getNotificationList = () => async dispatch => {
  let response = await notificationAPI.getNotificationList();
  dispatch(getNotificationListAC(
    response.data.likesNotification,
    response.data.friendNotificationRequest,
    response.data.friendNotificationResponse,
    response.data.friendNotificationDeleteRequest,    
    response.data.newNotificationsCount
  ));
};

export const getNewNotificationCount = () => async dispatch => {
  let response = await notificationAPI.getNewNotificationCount();
  dispatch(getNotificationCountAC(response.data.newCount));
};

export const cleanAllNotifications = () => async dispatch => {
  await notificationAPI.cleanAllNotifications();
  dispatch(cleanAllNotificationsAC());
};

export const removeFriendNotification = (userId) => async dispatch => {
  await notificationAPI.removeReqFriendNotification(userId);
  // dispatch(removeReqFriendNotification(userId)); //user id
};

export const addFriendNotification = (userId) => async dispatch => {
  await notificationAPI.addReqFriendNotification(userId);
  // dispatch(addReqFriendNotification(response.data));//user id,name,surname
};


export default notificationReducer;