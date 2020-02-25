import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        { id: 1, name: 'Hi. How are you?', likesCount: 10 },
        { id: 2, name: 'It`s my first post', likesCount: 8 }
    ]
}

it('length of posts should be incremented', () => {
    // 1. start data
    let action = addPostActionCreator('New Post')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. result, which we want to see
    // newState.posts.length === 3;
    expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
    let action = addPostActionCreator('New Post')
    let newState = profileReducer(state, action)
    expect(newState.posts[2].name).toBe('New Post');
});

it('after deleting length of messages should be decremented', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1);
});

it('after deleting length of messages shouldn`t be decremented if id is incorrect', () => {
    let action = deletePost(1000)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2);
});