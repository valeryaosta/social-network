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
    newMessageBody: string
}

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
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
    ],
    newMessageBody: "",
}

const dialogsReducer = (state = InitialDialogState, action: DialogsActionsTypes) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}],
            }
        default:
            return state;
    }
}

export type DialogsActionsTypes =
    | ReturnType<typeof SendMessageCreator>
    | ReturnType<typeof UpdateNewMessageBodyCreator>

export const SendMessageCreator = () => ({
    type: 'SEND-MESSAGE'
} as const)

export const UpdateNewMessageBodyCreator = (body: string): any => ({
    type: 'UPDATE-NEW-MESSAGE-BODY',
    body: body,
} as const)

export default dialogsReducer;
