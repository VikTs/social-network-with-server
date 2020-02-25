import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profileState: {
            posts: [
                { id: 1, name: 'Hi. How are you?', likesCount: 10 },
                { id: 2, name: 'It`s my first post', likesCount: 8 }
            ],
            newPostText: '12345'
        },
        messagesState: {
            messages: [
                { id: 1, message: 'Hey' },
                { id: 2, message: 'Hello' },
                { id: 3, message: 'How are you?' }
            ],
            dialogs: [
                { id: 1, name: 'First' },
                { id: 2, name: 'Second' },
                { id: 3, name: 'Third' },
                { id: 4, name: 'Forth' },
                { id: 5, name: 'Fifth' }
            ],
            newMessageBody: 'NewMessage'
        },
        sidebar: {}
    },
    _callSubscriber() { },

    getState() { return this._state },
    subscribe(observe) {
        this._callSubscriber = observe;
    },

    dispatch(action) { 
        this._state.profileState = profileReducer(this._state.profileState, action);
        this._state.messagesState = dialogsReducer(this._state.messagesState, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
    
}


export default store