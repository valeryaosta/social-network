import dialoguesReducer from "./dialogues-reducer";
import {DialoguesType, MessageType} from "./store";


type InitialSidebarType = {};

export const InitialSidebarState = {};

const sidebarReducer = (state: InitialSidebarType = InitialSidebarState, action: ActionsSidebarType) => {

    return state;
}
export default sidebarReducer;

export type ActionsSidebarType = any;


