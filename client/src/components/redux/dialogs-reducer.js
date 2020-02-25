const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: 'Hey' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'How are you?' }
    ],
    dialogs: [
        { id: 1, name: 'Sasha' },
        { id: 2, name: 'Liza' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Masha' },
        { id: 5, name: 'Petya' }
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return { 
                ...state,
                messages: [...state.messages, { id: 6, message: body }] 
            };
        default: return state;
    }
    //return state
}

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE, 
        newMessageBody
    }
}

export default dialogsReducer