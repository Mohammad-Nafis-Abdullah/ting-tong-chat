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

// chat's schema
export interface ChatSchema {
    chatId: string;
    chatUsers: {
        uid: string;
        name: string;
        email: string;
        image: string;
    }[];
    message: {
        [messageId: string]: {
            messageId: string;
            text: string;
            senderEmail: string;
        };
    };
}
