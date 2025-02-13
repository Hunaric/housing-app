import { Landlord } from "./user";

export interface Conversation {
    id: string,
    users: Landlord[];
}


export interface Conversations {
    data: Conversation[]; 
}
