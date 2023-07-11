import { useLoaderData } from "react-router-dom";
import ChatArea from "./ChatArea";
import { useCallback, useEffect, useState } from "react";
import { getCloudStoreSingleData } from "../../hooks/cloudFireStore";
import {
    CHATS_COLLECTION,
} from "../../hooks/DbCollectionName";
import { ChatSchema, ChatUserSchema, UserSchema } from "../../schema/schema";
import { createChat } from "../../schema/createChats";
import useGlobal from "../../hooks/useGlobal";

const Inbox = () => {
    const {state} = useGlobal();
    const { id1, id2 } = useLoaderData() as { [id: string]: string };
    const [chat, setChat] = useState<ChatSchema | undefined>();

    useEffect(() => {
        (async () => {
            const res =
                ((await getCloudStoreSingleData(
                    CHATS_COLLECTION,
                    `${id1}-${id2}`
                )) as ChatSchema) ||
                ((await getCloudStoreSingleData(
                    CHATS_COLLECTION,
                    `${id2}-${id1}`
                )) as ChatSchema);
            
                if (res) {
                    setChat(res);
                } else {
                    if (state.current_user) {
                        const newChat:ChatSchema = createChat(state.current_user as UserSchema ,state.current_friend as UserSchema);
                        setChat(newChat);
                    }
                }
        })();
    }, [id1, id2, state.current_user, state.current_friend]);

    useEffect(()=> {
        console.log(chat);
    },[chat])

    const otherUser = useCallback(():ChatUserSchema=> {
        const user = chat?.chatUsers.find(user=>user.id !== state.current_user?.id) as ChatUserSchema;
        return user;
    },[state.current_user,chat])

    // console.log(otherUser());


    return (
        <div className="flex grow ">
            <ChatArea chat={chat as ChatSchema} />

            <section className="hidden md:flex bg-slate-900 basis-[15rem] pt-8 p-3 flex-col items-center gap-y-3">
                <img
                    className="h-20 w-20 rounded-full"
                    src={otherUser()?.image}
                    alt="User Profile Picture"
                />
                <article className="text-center space-y-2">
                    <p className="font-bold text-rose-500 text-sm">
                        {otherUser()?.name}
                    </p>

                    <p className="font-bold text-rose-500 text-xs">
                        {otherUser()?.email}
                    </p>
                </article>
            </section>
        </div>
    );
};

export default Inbox;
