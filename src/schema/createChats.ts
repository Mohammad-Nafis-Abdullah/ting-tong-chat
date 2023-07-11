// import { USERS_COLLECTION } from "../hooks/DbCollectionName";
// import { getCloudStoreSingleData } from "../hooks/cloudFireStore";
import { ChatSchema, ChatUserSchema, UserSchema } from "./schema";

const createChatObj = (
    user1: ChatUserSchema,
    user2: ChatUserSchema
): ChatSchema => {
    const newChat: ChatSchema = {
        id: `${user1.id}-${user2.id}`,
        chatUsers: [user1, user2],
        message: {},
    };

    return newChat;
};

/* const getUser = async (id:string)=> {
  const result = await getCloudStoreSingleData(USERS_COLLECTION,id as string) as UserSchema;
  return result;
} */

const createChatUserObj = (id:string,email:string,image:string,name:string):ChatUserSchema=> ({id,email,image,name})

export const createChat = (user1: UserSchema, user2: UserSchema):ChatSchema => {
  const chat_user_1 = createChatUserObj(user1.id,user1.email,user1.image,user1.name);
  const chat_user_2 = createChatUserObj(user2.id,user2.email,user2.image,user2.name);

  const chat_obj = createChatObj(chat_user_1,chat_user_2);
  console.log(chat_obj);
  return chat_obj;
};


