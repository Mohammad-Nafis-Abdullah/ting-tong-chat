import { useLoaderData } from "react-router-dom";
import ChatArea from "./ChatArea";
import { useEffect, useState } from "react";
import { getCloudStoreSingleData } from "../../hooks/cloudFireStore";
import {
    CHATS_COLLECTION,
    USERS_COLLECTION,
} from "../../hooks/DbCollectionName";
import { ChatSchema, UserSchema } from "../../schema/schema";

const Inbox = () => {
    const { id1, id2 } = useLoaderData() as {[id:string]:string};
    const [result, setResult] = useState<ChatSchema | null>();
    const [user, setUser] = useState<UserSchema | null>(null);

    useEffect(() => {
        (async () => {
            const res =
                (await getCloudStoreSingleData(
                    CHATS_COLLECTION,
                    `${id1}-${id2}`
                )) ||
                (await getCloudStoreSingleData(
                    CHATS_COLLECTION,
                    `${id2}-${id1}`
                ));
            setResult(res as ChatSchema);

            if (!res) {
                const usr = await getCloudStoreSingleData(
                    USERS_COLLECTION,
                    id2 as string
                );
                // console.log(usr);
                setUser(usr as UserSchema);
            } else {
                console.log("else statement write here");
            }
        })();
    }, [id1, id2]);

    return (
        <div className="flex grow ">
            <ChatArea chat={result} />

            <section className="hidden md:flex bg-slate-900 basis-[15rem] pt-8 p-3 flex-col items-center gap-y-3">
                <img
                    className="h-20 w-20 rounded-full"
                    src={`${user?.image}`}
                    alt="User Profile Picture"
                />
                <article className="text-center space-y-2">
                    <p className="font-bold text-rose-500 text-sm">
                        {user?.name}
                    </p>

                    <p className="font-bold text-rose-500 text-xs">
                        {user?.email}
                    </p>
                </article>
            </section>
        </div>
    );
};

export default Inbox;
