import { messagesAPI } from "../../api/api";

const SEND_MESSAGE = 'SEND-MESSAGE';
const CREATE_CHAT = 'CREATE_CHAT';
const ADD_NEW_CHAT_MEMBER = 'ADD_NEW_CHAT_MEMBER';
const GET_CHATS = 'GET_CHATS';

let initialState = {
    chats: [],
    messages: [],
    // messages: [
    //     {
    //         chat_id: '1',
    //         user_id: '9',
    //         context: 'Hello',
    //         date_create: new Date(),
    //     },
    //     {
    //         chat_id: '1',
    //         user_id: '9',
    //         context: 'How are you?',
    //         date_create: new Date(),
    //     },
    //     {
    //         chat_id: '1',
    //         user_id: '2',
    //         context: 'I`m fine',
    //         date_create: new Date(),
    //     },
    //     {
    //         chat_id: '2',
    //         user_id: '5e97566137513a21d8e72649',
    //         context: 'This is our new chat',
    //         date_create: new Date(),
    //     },
    //     {
    //         chat_id: '2',
    //         user_id: '7',
    //         context: 'Thanks',
    //         date_create: new Date(),
    //     },
    //     {
    //         chat_id: '2',
    //         user_id: '5e97566137513a21d8e72649',
    //         context: 'Let`s start',
    //         date_create: new Date(),
    //     },
    // ],
}

const dialogsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload.newMessage]
            };
        case CREATE_CHAT:
            return {
                ...state,
                chats: [...state.chats, payload.newChat]
            }
        case ADD_NEW_CHAT_MEMBER:
            const { newMember, chatId } = payload;
            const newChats = [];
            state.chats.forEach(chat => {
                if (chatId === chat.id) chat.members = [...chat.members, ...newMember]
                newChats.push(chat);
            });
            return {
                ...state,
                chats: newChats,
            }

        case GET_CHATS:
            return {
                ...state,
                chats: payload.chats,
            }

        default: return state;
    }
}

const sendMessage = (newMessage) => ({
    type: SEND_MESSAGE,
    payload: { newMessage },
});

const createChatAC = (newChat) => ({
    type: CREATE_CHAT,
    payload: { newChat },
});

const getChatsAC = (chats) => ({
    type: GET_CHATS,
    payload: { chats },
});

export const addNewChatMember = (newMember, chatId) => {
    return {
        type: ADD_NEW_CHAT_MEMBER,
        payload: { newMember, chatId },
    }
}

export const sendMessageCreator = (newMessage) => async (dispatch) => {
    const response = await messagesAPI.sendMessage(newMessage);
    dispatch(sendMessage(response.data.newMessage));
}

export const createChat = (newChat) => async (dispatch) => {
    const response = await messagesAPI.createChat(newChat);
    dispatch(createChatAC(response.data.newChat));
    return response.data.newChat;
}

export const getChats = () => async (dispatch) => {
    const response = await messagesAPI.getChats();
    dispatch(getChatsAC(response.data.chats));
    return response.data.chats;
}

export default dialogsReducer