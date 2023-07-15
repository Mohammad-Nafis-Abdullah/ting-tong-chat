// user's schema
export interface UserSchema {
    id: string;
    name: string;
    nameLowerCase: string[];
    email: string;
    image: string;
    inbox?: {
        [chatId: string]: ChatInfoSchema;
    };
    connectios: number;
}

// chat info for chat list
export interface ChatInfoSchema{
    id: string;
    chatUsers: {
        id: string;
        name: string;
        image: string;
    }[];
    time:number;
}

// chat user's schema
export interface ChatUserSchema {
    id: string;
    name: string;
    email: string;
    image: string;
}

// message schema
export interface MessageSchema {
    id: number;
    text: string;
    sender: string;
    time:string,
}

// chat's schema
export interface ChatSchema {
    id: string;
    chatUsers: ChatUserSchema[];
    message: {
        [id:string]:MessageSchema
    };
}
