import React from 'react';
import Post from './Post/Post';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';

import { validateNewPost } from '../../../utils/validators/validators';

import './MyPosts.scss';

const AddNewPostForm = ({ addPost, ...props }) => {
  const formik = useFormik({
    initialValues: {
      newPostText: '',
    },
    validate: validateNewPost,
    onSubmit: (values, { resetForm }) => {
      const { newPostText } = values;
      addPost(newPostText);
      resetForm();
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          id="newPostText"
          label="Post: "
          name="newPostText"
          placeholder="Enter post message"
          className="add-new-post"
          onChange={formik.handleChange}
          value={formik.values.newPostText}
          helperText={formik.errors.newPostText}
          error={!!formik.errors.newPostText}
          variant="outlined"
          multiline
          rows={1}
          rowsMax={4}
        />
      </div>
      <Button type="submit">Add post</Button>
    </form>
    // <Formik
    //   initialValues={{ newPostText: '' }}
    //   onSubmit={(values, actions) => {
    //     const { newPostText } = values;
    //     addPost(newPostText);
    //   }}>{(props) => (
    //     <Form>
    //       <Field
    //         component="textarea"
    //         type="text"
    //         name="newPostText"
    //         className="add-new-post"
    //         rows="2" 
    //         cols="20"
    //       />
    //       <Button type="submit">Add post</Button>
    //     </Form>
    //   )}
    // </Formik>
  )
}

//React.memo - hoc, который проверяет, стоит ли перерисовывать компонент
const MyPosts = React.memo(({
  myId,
  posts,
  addPost,
  isOwner,
  likePost,
  deletePost,
  currentPageUserId,
}) => {
  const postsElements = posts.map(p => (
    <Post
      key={p._id}
      postFullInfo={p}
      isOwner={isOwner}
      deletePost={deletePost}
      setPosts={deletePost}
      myId={myId}
      userId={currentPageUserId}
      likePost={likePost}
    />
  ));

  return (
    <div className="posts">
      {!!postsElements.length && <h3 className="posts-title">Publications: </h3>}
      {isOwner && <AddNewPostForm addPost={addPost} isOwner={isOwner} />}
      <div className="posts-container">
        {postsElements.reverse()}
      </div>
    </div>
  );
})

export default MyPosts;