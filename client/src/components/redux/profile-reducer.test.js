const {
    profileReducer,
    addPostAC,
    deletePostAC,
    likePostAC,
    setPostAC,
    setUserProfile,
    setStatus,
    savePhotoSuccess,
} = require('./profile-reducer');

const state = {
    profile: null,
    status: null,
    posts: [
        { _id: 1, name: 'Hi. How are you?', likesCount: 10 },
        { _id: 2, name: 'It`s my first post', likesCount: 8 }
    ]
};

const profile = {
    _id: 1,
    name: 'Ivan',
    age: 20,
    city: 'Kyiv',
    contacts: null,
};

const posts = [
    { _id: 1, name: 'Hello', likesCount: 1 },
    { _id: 2, name: 'World', likesCount: 0 },
    { _id: 3, name: '!', likesCount: 0 },
];

const status = "It`s my new status";
const photo = "http://SomePhoto.jpg";
const addNewPost = { _id: 3, name: 'Hi', likesCount: 2 };

describe('Reducer (profile): ', () => {
    describe('Handle Add post: ', () => {
        test('Should return array with new post ', () => {
            const action = addPostAC(addNewPost);

            expect(profileReducer(state, action)).toEqual({
                ...state,
                posts: [...state.posts, addNewPost]
            });
        });

        test('Posts length must be 3', () => {
            const action = addPostAC(addNewPost);
            expect(profileReducer(state, action).posts.length).toEqual(3);
        });
    });

    describe('Handle Delete post: ', () => {
        test('Should return array without deleted post ', () => {
            const id = 1;
            const action = deletePostAC(id);

            expect(profileReducer(state, action)).toEqual({
                ...state,
                posts: state.posts.filter(post => post._id !== id)
            });
        });

        test('Should delete nothing', () => {
            const id = 1000;
            const action = deletePostAC(id);

            expect(profileReducer(state, action).posts).toEqual(state.posts);
        });


        test('Should return 1 post', () => {
            const action = deletePostAC(2);
            expect(profileReducer(state, action).posts.length).toBe(1);
        });
    });

    describe('Handle Like post: ', () => {
        test('Should return post with incremented like', () => {
            const updatedPost = { _id: 1, name: 'Hi. How are you?', likesCount: 11 };

            const action = likePostAC(updatedPost);

            expect(profileReducer(state, action)).toEqual({
                ...state,
                posts: state.posts.map(post =>
                    post._id === updatedPost._id ? updatedPost : post)
            });
        });
    });

    describe('Handle Set post list: ', () => {
        test('Should replace posts by new post list', () => {
            const action = setPostAC(posts);
            expect(profileReducer(state, action)).toEqual({ ...state, posts });
        });

        test('Should return null', () => {
            const action = setPostAC(null);
            expect(profileReducer(state, action).posts).toBeNull();
        });

        test('Should return 3 posts', () => {
            const action = setPostAC(posts);
            expect(profileReducer(state, action).posts.length).toBe(3);
        });
    });

    describe('Handle Set user profile: ', () => {
        test('Should return profile data', () => {
            const action = setUserProfile(profile);
            expect(profileReducer(state, action)).toEqual({ ...state, profile });
        });

        test('Should return null', () => {
            const action = setUserProfile(null);
            expect(profileReducer(state, action).profile).toBeNull();
        });

        test('Profile should be object', () => {
            const action = setUserProfile(profile);
            expect(profileReducer(state, action).profile).toEqual(expect.any(Object));
        });
    });

    describe('Handle Set status: ', () => {
        test('Should return status', () => {
            const action = setStatus(status);
            expect(profileReducer(state, action)).toEqual({ ...state, status });
        });

        test('Should return null', () => {
            const action = setStatus(null);
            expect(profileReducer(state, action).status).toBeNull();
        });

        test('Status should be string', () => {
            const action = setStatus(status);
            expect(profileReducer(state, action).status).toEqual(expect.any(String));
        });
    });

    describe('Handle Set profile photo: ', () => {
        test('Should return profile photo', () => {
            const action = savePhotoSuccess(photo);

            expect(profileReducer(state, action)).toEqual({
                ...state,
                profile: {
                    photos: { small: photo }
                }
            });

        });

        test('Should return null', () => {
            const action = savePhotoSuccess(null);
            expect(profileReducer(state, action).profile.photos.small).toBeNull();
        });

        test('Photo link should be string', () => {
            const action = savePhotoSuccess(photo);
            expect(profileReducer(state, action).profile.photos.small).toEqual(expect.any(String));
        });
    });
})
