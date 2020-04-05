import React from 'react';
import style from './Post.module.css'

class Post extends React.Component {
    onLikePost(e) {
        const postId = this.props.postFullInfo._id;
        const userId = this.props.userId;
        const myId = this.props.myId;
        this.props.likePost(userId, postId);
        if (myId !== userId) {
            this.props.createLikeNotification(userId, postId, !this.props.isLiked);
        }
    }

    onDeletePost() {
        const postId = this.props.postFullInfo._id
        this.props.deletePost(postId);
    }
    render() {
        const postInfo = this.props.postFullInfo;
        let dateInfo = new Date(postInfo.date);
        window.currdate = new Date(this.props.postFullInfo.date);

        const postDate =
            `${dateInfo.getDate()} ${dateInfo.toLocaleString('en-US', { month: 'long' })} ${dateInfo.getFullYear()}`;
        const postTime =
            `${dateInfo.getHours()}:${dateInfo.getMinutes()}`;
        const postDayOfWeek = dateInfo.toLocaleDateString('en-US', { weekday: 'long' })

        return (
            <div className={style.item}>
                <div> {postDate} </div>
                <div> {postTime} </div>
                <div> {postDayOfWeek} </div>
                <img src='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                {postInfo.name}
                <button
                    className={postInfo.isLiked ? style.isLiked : style.isNotLiked}
                    onClick={this.onLikePost.bind(this)}>&#x2764; {postInfo.likesCount}</button>
                {this.props.isOwner && <button onClick={this.onDeletePost.bind(this)}>🗑️</button>}
            </div>
        );
    }
}

export default Post;