import { useLoaderData } from "react-router-dom";
import ChatArea from "./ChatArea";
import { useEffect, useState } from "react";
import { CHATS_COLLECTION } from "../../hooks/DbCollectionName";
import { ChatSchema, UserSchema } from "../../schema/schema";
import { createChat } from "../../schema/createChats";
import useGlobal from "../../hooks/useGlobal";
import { doc, onSnapshot } from "firebase/firestore";
import { cloudDb } from "../../firebase.init";
import { getChatCollection } from "./getChatCollection";

const Inbox = () => {
    const { state } = useGlobal();
    const { id1, id2 } = useLoaderData() as {
        [id: string]: string | undefined;
    };
    const [chat, setChat] = useState<ChatSchema | undefined>();

    useEffect(() => {
        let snap_ref: () => void = () => {
            return;
        };
        (async () => {
            const res = await getChatCollection(id1 as string, id2);
            if (res) {
                // query(collection(cloudDb, CHATS_COLLECTION, res))
                snap_ref = onSnapshot(
                    doc(cloudDb, CHATS_COLLECTION, res),
                    (doc) => {
                        setChat(doc.data() as ChatSchema);
                    },
                    (err) => console.log(err)
                );
            } else {
                if (state.current_user && state.current_friend) {
                    const newChat: ChatSchema = createChat(
                        state.current_user as UserSchema,
                        state.current_friend as UserSchema
                    );
                    setChat(newChat);
                }
            }
        })();

        return snap_ref();
    }, [id1, id2, state]);

    /* const otherUser = useCallback(():ChatUserSchema=> {
        const user = chat?.chatUsers.find(user=>user.id !== state.current_user?.id) as ChatUserSchema;
        return user;
    },[state.current_user,chat]) */

    // console.log(otherUser());

    return (
        <div className="flex grow ">
            <ChatArea chat={chat as ChatSchema} />

            <section className="hidden md:flex bg-slate-900 basis-[15rem] pt-8 p-3 flex-col items-center gap-y-3">
                <img
                    className="h-20 w-20 rounded-full"
                    src={state.current_friend?.image}
                    alt="User Profile Picture"
                />
                <article className="text-center space-y-2">
                    <p className="font-bold text-rose-500 text-sm">
                        {state.current_friend?.name}
                    </p>

                    <p className="font-bold text-rose-500 text-xs">
                        {state.current_friend?.email}
                    </p>
                </article>
            </section>
        </div>
    );
};

export default Inbox;
