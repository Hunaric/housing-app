import { UserType } from "./user";

export interface Conversation {
    id: string,
    users: UserType[],
    modified_at: string,
}


export interface Conversations {
    data: Conversation[]; 
}


export interface Message {
    id?: string,
    name: string,
    body: string,
    conversationId: string,
    sent_to: UserType,
    created_by: UserType,
}