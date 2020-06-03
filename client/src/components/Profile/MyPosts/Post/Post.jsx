import React, { useState } from 'react';
import './Post.scss'
import { Card, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

import ModalMain from '../../../common/Modal/Modal';

const Post = ({
    likePost,
    deletePost,
    isOwner,
    postFullInfo,
    userId,
    myId,
    isLiked,
}) => {
    const [isOpenDeletePostModal, toggleDeletePostModal] = useState(false);
    const openDeletePostModal = () => toggleDeletePostModal(true);
    const closeDeletePostModal = () => toggleDeletePostModal(false);

    function onLikePost(e) {
        const postId = postFullInfo._id;
        likePost(userId, postId);
    }

    function onDeletePost() {
        const postId = postFullInfo._id
        deletePost(postId);
    }

    const postInfo = postFullInfo;
    let dateInfo = new Date(postInfo.date);
    window.currdate = new Date(postFullInfo.date);

    const postDate =
        `${dateInfo.getDate()} ${dateInfo.toLocaleString('en-US', { month: 'long' })} ${dateInfo.getFullYear()}`;
    const postTime =
        `${dateInfo.toLocaleTimeString().slice(0, 5)}`;
    // const postDayOfWeek = dateInfo.toLocaleDateString('en-US', { weekday: 'long' })

    return (
        <>
            {isOpenDeletePostModal && (
                <ModalMain
                    title="Do you really want to delete this post?"
                    onSubmit={onDeletePost}
                    onCloseMethod={closeDeletePostModal}
                />)}
            <Card className="post-card">
                <CardContent className="post-card-content">
                    <Typography color="textSecondary" variant="body2">
                        {postDate}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                        {postTime}
                    </Typography>
                    {/* <Typography color="textSecondary">
                    {postDayOfWeek}
                </Typography> */}
                    <Typography variant="subtitle1" >
                        <p className="post-card-text">{postInfo.name}</p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <div>
                        <IconButton aria-label="create like" size="small" onClick={onLikePost}>
                            <FavoriteIcon
                                classes={{ root: postInfo.isLiked ? 'isLiked' : 'isNotLiked' }}
                            />
                        </IconButton>
                        {postInfo.likesCount}
                    </div>
                    {isOwner &&
                        <IconButton aria-label="delete post" size="small" onClick={openDeletePostModal}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </CardActions>
            </Card>
        </>
    );
}

export default Post;