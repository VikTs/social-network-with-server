import React from 'react';
import { addPost, setPosts, deletePost, likePost } from '../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profileState.posts,
    newPostText: state.profileState.newPostText,
    myId: state.auth.userId
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (addNewPost) => {
      dispatch(addPost(addNewPost));
    },
    setPosts: (userId) => {
      dispatch(setPosts(userId));
    },
    deletePost: (userId, postId) => {
      dispatch(deletePost(userId, postId));
    },
    likePost: (myId,userId, postId) => {
      dispatch(likePost(myId, userId, postId));
    }
  }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;