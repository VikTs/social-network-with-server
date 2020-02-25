import React from 'react';
import { addPostActionCreator } from '../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return { 
    posts: state.profileState.posts,
    newPostText: state.profileState.newPostText }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (addNewPost) => {       
      dispatch(addPostActionCreator(addNewPost)); 
    },
  }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;