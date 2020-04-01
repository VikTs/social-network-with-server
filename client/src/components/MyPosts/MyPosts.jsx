import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { Textarea } from '../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {

  // let onAddPost = (value) => { /////copyPaste!
  //   props.addPost('values.newPostText');
  // }

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name='newPostText'
          //onKeyPress={(e) => {if(e.key === 'Enter'){this.onSubmit();}}}
          validate={[required, maxLength10]}
          placeholder='Post message' />
      </div>
      <button>Add post</button>
      {/* <button>Remove</button> */}
    </form>
  )
}

const AddNewPostRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

//React.memo - hoc, который проверяет, стоит ли перерисовывать компонент
const MyPosts = React.memo((props) => {

  let postsElements = props.posts.map(p => (
    <Post
      key={p._id} postId={p._id} name={p.name} isOwner={props.isOwner} isLiked={p.isLiked}
      likesCount={p.likesCount} deletePost={props.deletePost} setPosts={props.deletePost}
      myId={props.myId} userId={props.currentPageUserId} likePost={props.likePost}
      createLikeNotification={props.createLikeNotification} myId={props.myId}/>
  ));
  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }
  return (
    <div className={classes.postsBlock}>
      <h3>My posts: </h3>
      {props.isOwner && <AddNewPostRedux onSubmit={onAddPost} isOwner={props.isOwner} />}
      <div className={classes.posts}>
        {postsElements.reverse()}
      </div>
    </div>
  );
})


// shouldComponentUpdate(nextProps, nextState) { //нужно ли отрисовать компоненту
//   return nextProps != this.props || nextState != this.state
// }
//PureComponent использовать



// class MyPosts extends React.PureComponent {
//   render() {
//     console.log('render')
//     let postsElements = this.props.posts.map(p => (<Post name={p.name} likesCount={p.likesCount} />));
//     let onAddPost = (values) => {
//       this.props.addPost(values.newPostText);
//     }

//     return (
//       <div className={classes.postsBlock}>
//         <h3>My posts</h3>

//         <AddNewPostRedux onSubmit={onAddPost} />

//         <div className={classes.posts}>
//           {postsElements}
//         </div>
//       </div>

//     );
//   }
// }

export default MyPosts;