import { notificationAPI } from "../../api/api";

// const CREATE_LIKE_NOTIFICATION = "CREATE-LIKE-NOTIFICATION";
const GET_NOTIFICATION_LIST = "GET-NOTIFICATION-LIST";
const ZEROING_NOTIFICATION_COUNT = "ZEROING-NOTIFICATION-COUNT";
const GET_NOTIFICATION_COUNT = "GET-NOTIFICATION-COUNT";
const CLEAN_ALL_NOTIFICATIONS = "CLEAN-ALL-NOTIFICATIONS";

let initialState = {
  likesNotification: [],
  friendNotification: [],
  newNotificationsCount: 0
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    // case CREATE_LIKE_NOTIFICATION:
    //   //newNotificationInfo
    //   return {
    //     ...state,
    //     likesNotification: [
    //       ...state.likesNotification,
    //       action.newNotificationInfo
    //     ],
    //   };
    case GET_NOTIFICATION_LIST:
      return {
        ...state,
        likesNotification: action.likesNotification
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
        friendNotification: [],
        newNotificationsCount: 0
      };
    default:
      return state;
  }
  //return state
};

// const createLikeNotificationAC = newNotificationInfo => {
//   return {
//     type: CREATE_LIKE_NOTIFICATION,
//     newNotificationInfo
//   };
// };

const zeroingNotificationsCountAC = () => {
  return {
    type: ZEROING_NOTIFICATION_COUNT
  };
};

const getNotificationListAC = (likesNotification, newCount) => {
  return {
    type: GET_NOTIFICATION_LIST,
    likesNotification,
    newCount
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
  await notificationAPI.createLikeNotification( userId, postId, isLiked );
  //dispatch(createLikeNotificationAC(response.data.newNotificationInfo));
};

export const zeroingNotificationsCount = () => async dispatch => {
  await notificationAPI.zeroingNewCount();
  dispatch(zeroingNotificationsCountAC());
};

export const getNotificationList = () => async dispatch => {
  let response = await notificationAPI.getNotificationList();
  dispatch(getNotificationListAC(response.data.likesNotification));
};

export const getNewNotificationCount = () => async dispatch => {
  let response = await notificationAPI.getNewNotificationCount();
  dispatch(getNotificationCountAC(response.data.newCount));
};

export const cleanAllNotifications = () => async dispatch => {
  let response = await notificationAPI.cleanAllNotifications();
  dispatch(cleanAllNotificationsAC());
};

export default notificationReducer;