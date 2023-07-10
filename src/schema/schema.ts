// user's schema
export interface UserSchema {
    id: string;
    name: string;
    nameLowerCase: string;
    email: string;
    image: string;
    inbox?: {
        [chatId: string]: {
            chatId: string;
            chatUsers: {
                uid: string;
                name: string;
                image: string;
            }[];
        };
    };
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
    id: string;
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
