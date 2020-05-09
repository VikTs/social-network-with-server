import { messagesAPI } from "../../api/api";

const SEND_MESSAGE = 'SEND-MESSAGE';
const CREATE_CHAT = 'CREATE_CHAT';
const ADD_NEW_CHAT_MEMBER = 'ADD_NEW_CHAT_MEMBER';
const GET_CHATS = 'GET_CHATS';
const GET_MESSAGES = 'GET_MESSAGES';
const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
const SET_CURRENT_MESSAGES = 'SET_CURRENT_MESSAGES';
const DELETE_CHAT = 'DELETE_CHAT';

let initialState = {
    currentChat: null,
    currentMessages: null,
    chats: null,
    messages: null,
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
            console.log(chatId);
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

        case GET_MESSAGES:
            return {
                ...state,
                messages: payload.messages,
            }

        case SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload.currentChat,
            }
        case SET_CURRENT_MESSAGES:
            return {
                ...state,
                currentMessages: payload.currentMessages,
            }
        case DELETE_CHAT:
            return {
                ...state,
                chats: state.chats.filter(chat => chat._id !== payload.chatId),
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

const getMessagesAC = (messages) => ({
    type: GET_MESSAGES,
    payload: { messages },
});

const deleteChatAC = (chatId) => ({
    type: DELETE_CHAT,
    payload: { chatId },
});

export const setCurrentMessages = (currentMessages) => ({
    type: SET_CURRENT_MESSAGES,
    payload: { currentMessages },
});

export const setCurrentChat = (currentChat) => ({
    type: SET_CURRENT_CHAT,
    payload: { currentChat },
});

export const addNewChatMemberAC = (newMember, chatId) => {
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

export const getMessages = () => async (dispatch) => {
    const response = await messagesAPI.getMessages();
    dispatch(getMessagesAC(response.data.messages));
}

export const addNewChatMember = (newMember, chatId) => async (dispatch) => {
    await messagesAPI.addNewChatMember(newMember, chatId);
    dispatch(addNewChatMemberAC(newMember, chatId));
}

export const deleteChat = (chatId) => async (dispatch) => {
    await messagesAPI.deleteChat(chatId);
    dispatch(deleteChatAC(chatId));
}


export default dialogsReducer