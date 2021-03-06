import { addPost, setPosts, deletePost, likePost } from '../../redux/profile-reducer';
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
    deletePost: (postId) => {
      dispatch(deletePost(postId));
    },
    likePost: (userId, postId) => {
      dispatch(likePost(userId, postId));
    }
  }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;