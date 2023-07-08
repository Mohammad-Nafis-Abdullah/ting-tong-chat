export interface UserSchema {
    uid: string;
    name: string;
    nameLowerCase:string;
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
