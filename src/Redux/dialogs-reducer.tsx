type MessageType = {
    id: number,
    message: string
}
type DialogsType = {
    id: number,
    name: string
}
export type InitialDialogType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
}

const SEND_MESSAGE = 'SEND-MESSAGE';

export const InitialDialogState: InitialDialogType = {
    dialogs: [
        {id: 1, name: "Valery"},
        {id: 2, name: "Eugene"},
        {id: 3, name: "Kseniya"},
        {id: 4, name: "Vitaliy"},
        {id: 5, name: "Oksana"},
        {id: 6, name: "Ellina"}
    ],
    messages: [
        {id: 1, message: "Hey, cutiee"},
        {id: 2, message: "What's uuup?!"},
        {id: 3, message: "Yo bro!"},
        {id: 4, message: "God damn!!"},
        {id: 5, message: "That's nicee.."}
    ]
}

const dialogsReducer = (state = InitialDialogState, action: DialogsActionsTypes) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
            }
        default:
            return state;
    }
}

export type DialogsActionsTypes =
    | ReturnType<typeof SendMessageCreator>

export const SendMessageCreator = (newMessageBody: string) => ({
    type: 'SEND-MESSAGE',
    newMessageBody: newMessageBody
} as const)


export default dialogsReducer;
