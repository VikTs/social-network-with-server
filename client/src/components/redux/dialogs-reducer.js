const SEND_MESSAGE = 'SEND-MESSAGE';
const CREATE_CHAT = 'CREATE_CHAT';
const ADD_NEW_CHAT_MEMBER = 'ADD_NEW_CHAT_MEMBER';

let initialState = {
    chats: [
        {
            id: '1',
            members: [
                { id: '9', name: 'Sasha', surname: 'Ivanov' },
                { id: '2', name: 'Liza', surname: 'Petrova' },
            ],
            chat_name: 'Name chat 1',
            chat_description: 'description',
            owner_id: '9',
        },
        {
            id: '2',
            members: [
                { id: '7', name: 'Katya', surname: 'Sokolova' },
                { id: '5e97566137513a21d8e72649', name: 'Vika', surname: 'Tsukan' },
            ],
            chat_name: 'Name chat 2',
            chat_description: 'description',
            owner_id: '5e97566137513a21d8e72649',
        }
    ],
    messages: [
        {
            chat_id: '1',
            user_id: '9',
            context: 'Hello',
            date_create: new Date(),
        },
        {
            chat_id: '1',
            user_id: '9',
            context: 'How are you?',
            date_create: new Date(),
        },
        {
            chat_id: '1',
            user_id: '2',
            context: 'I`m fine',
            date_create: new Date(),
        },
        {
            chat_id: '2',
            user_id: '5e97566137513a21d8e72649',
            context: 'This is our new chat',
            date_create: new Date(),
        },
        {
            chat_id: '2',
            user_id: '7',
            context: 'Thanks',
            date_create: new Date(),
        },
        {
            chat_id: '2',
            user_id: '5e97566137513a21d8e72649',
            context: 'Let`s start',
            date_create: new Date(),
        },
    ],
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
            }
            );

            return {
                ...state,
                chats: newChats,
            }
        default: return state;
    }
}

export const sendMessageCreator = (newMessage) => {
    return {
        type: SEND_MESSAGE,
        payload: { newMessage },
    }
}

export const createChat = (newChat) => {
    return {
        type: CREATE_CHAT,
        payload: { newChat },
    }
}

export const addNewChatMember = (newMember, chatId) => {
    return {
        type: ADD_NEW_CHAT_MEMBER,
        payload: { newMember, chatId },
    }
}

export default dialogsReducer