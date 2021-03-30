const ADD_MESSAGE = 'ADD-MESSAGE'


type DialogType = {
    id: string
    name: string
}

type MessagesType = {
    id: string
    message: string
}

let initialState = {

    dialogs: [
        {id: '1', name: 'Andrew',},
        {id: '2', name: 'Aik',},
        {id: '3', name: 'Stasyan',},
        {id: '4', name: 'Dimas',},
        {id: '5', name: 'Musa',},
        {id: '6', name: 'Colbasa',},
    ] as Array<DialogType>,


    messages: [
        {id: '1', message: 'Hi',},
        {id: '2', message: 'How are you?',},
        {id: '3', message: 'Good luck',},
        {id: '4', message: 'bye',},
        {id: '5', message: 'i learn react',},
        {id: '6', message: 'Sochnaya',},

    ] as Array<MessagesType>,

    newMessageText: 'ss'
}

type InitialStateType = typeof initialState

 const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return  {
                ...state, messages: [...state.messages, {id: '1', message: action.newMessageBody,}]

            }
        }

        default:
            return state

    }

}



type ActionType = ReturnType<typeof addMessageActionCreator>

export const addMessageActionCreator = (newMessageBody: string) => ({type: ADD_MESSAGE, newMessageBody})

export default dialogsReducer