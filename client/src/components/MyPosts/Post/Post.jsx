import React from 'react';
import classes from './Post.module.css'

class Post extends React.Component {    
    onLikePost(){
        //console.log(this.props.myId, ' ', this.props.userId ,' ', this.props.postId)
        console.log(this.props)
        this.props.likePost(this.props.myId, this.props.userId, this.props.postId);

    }
    
    onDeletePost() {
        this.props.deletePost(this.props.myId, this.props.postId);
    }
    render() {
        return (
            <div className={classes.item}>
                <img src='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                {this.props.name}
                <button onClick={this.onLikePost.bind(this)}>&#x2764; {this.props.likesCount}</button>
                {this.props.isOwner && <button onClick={this.onDeletePost.bind(this)}>🗑️</button>}
            </div>
        );
    }
}

export default Post;