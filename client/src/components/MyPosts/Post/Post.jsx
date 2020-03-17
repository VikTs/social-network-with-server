import React from 'react';
import style from './Post.module.css'

class Post extends React.Component {    
    onLikePost(e){
        //console.log(this.props.myId, ' ', this.props.userId ,' ', this.props.postId)
        // console.log('this.props',this.props)
        this.props.likePost(this.props.userId, this.props.postId);
        //console.log('!this.props.isLiked',!this.props.isLiked)
        this.props.createLikeNotification(this.props.userId, this.props.postId, !this.props.isLiked);        
    }
    
    onDeletePost() {
        this.props.deletePost(this.props.postId);
    }
    render() {
        return (
            <div className={style.item}>
                <img src='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                {this.props.name}
                <button 
                className={this.props.isLiked ? style.isLiked : style.isNotLiked}
                onClick={this.onLikePost.bind(this)}>&#x2764; {this.props.likesCount}</button>
                {this.props.isOwner && <button onClick={this.onDeletePost.bind(this)}>🗑️</button>}
            </div>
        );
    }
}

export default Post;