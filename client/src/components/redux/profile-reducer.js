import { usersAPI, profileAPI } from "../../api/api";

const ADD_POST = 'ADD-POST';
const SET_POSTS = 'SET-POSTS';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const LIKE_POST = 'LIKE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.addNewPost],
                newPostText: ''
            };

        case SET_POSTS: {
            return {
                ...state,
                posts: action.postsFromDB
            };
        }

        case LIKE_POST: {
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.updatedPost._id) { return action.updatedPost }
                    return post
                })
            };
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(e => e._id != action.postId)
            };
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            };
        }

        default: return state;

    }
}

const addPostAC = (addNewPost) => {
    return { type: ADD_POST, addNewPost }
}

export const addPost = (newPostText) => async (dispatch) => {
    const response = await profileAPI.addPost(newPostText)
    dispatch(addPostAC(response.data.newPost));
}

const deletePostAC = (postId) => {
    return { type: DELETE_POST, postId }
}

export const deletePost = (postId) => async (dispatch) => {
    let response = await profileAPI.deletePost(postId)
    dispatch(deletePostAC(postId));
}


const likePostAC = (updatedPost) => {
    return { type: LIKE_POST, updatedPost }
}

export const likePost = (userId, postId) => async (dispatch) => {
    //console.log(myId, userId, postId)
    let response = await profileAPI.likePost(userId, postId);
    dispatch(likePostAC(response.data.updatedPost));
   // console.log(response.data.updatedPost);
}






const setPostAC = (postsFromDB) => {
    return { type: SET_POSTS, postsFromDB }
}

export const setPosts = (userId) => async (dispatch) => {
    const response = await profileAPI.getPosts(userId)
    //console.log(response.data.posts, 'profile-reducer')
    dispatch(setPostAC(response.data.posts));
}






export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}

export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}

export const savePhotoSuccess = (photos) => {
    return { type: SAVE_PHOTO_SUCCESS, photos }
}

//thunk - ф-я, которая принимает dispatch и диспатчит мелкие action 
//(до или после асинхронной операции или вообще без неё)

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

//thunk for status
export const getUserStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) { //из документации (если =1 - ошибка, =0 - все ок)
        dispatch(setStatus(status));
    }
}

//thunk for choose main photo
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) { //из документации (если =1 - ошибка, =0 - все ок)
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export default profileReducer