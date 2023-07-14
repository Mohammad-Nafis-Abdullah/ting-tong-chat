import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { ChatInfoSchema, UserSchema } from "../../schema/schema";
import { cloudDb } from "../../firebase.init";
import { USERS_COLLECTION } from "../../hooks/DbCollectionName";
import useGlobal from "../../hooks/useGlobal";
import { use_Target_User_Store } from "../../store/localStorage";

interface ChatListSchema {
    open: boolean;
}

const ChatList = ({ open }: ChatListSchema) => {
    const navigate = useNavigate();
    const { state, setState } = useGlobal();
    const [chatList, setChatList] = useState<ChatInfoSchema[]>([]);

    useEffect(() => {
        // let snap_ref : ()=>void = ()=>{return};

            if (state.current_user) {
                // console.log(currentUser.uid);
                const docRef = collection(
                    cloudDb,
                    `${USERS_COLLECTION}/${state.current_user.id}/inbox`
                );
                onSnapshot(
                    docRef,
                    (docs) => {
                        const arr: ChatInfoSchema[] = [];
                        docs.forEach((doc) => {
                            arr.push(doc.data() as ChatInfoSchema);
                        });
                        setChatList(arr);
                    },
                    (err) => console.log(err)
                );
            }
        // return snap_ref && snap_ref();
    }, [state.current_user]);

    const getChatList = (u: ChatInfoSchema[]) => {
        const result = u.sort((a, b) => {
            return b.time - a.time;
        });
        return result;
    };

    const getFriend = (
        u: ChatInfoSchema["chatUsers"],
        current_user_id: string
    ) => {
        const result = u.find((user) => user.id !== current_user_id);
        return result;
    };

    return (
        <List className="grow overflow-y-auto overflow-x-hidden">
            {getChatList(chatList).map((chat) => (
                <ListItem
                    key={chat.id}
                    disablePadding
                    sx={{ display: "block" }}
                    className="bg-sky-300/30"
                >
                    <ListItemButton
                        onClick={() => {
                            navigate(`chat/${chat.id}`);
                            setState(
                                "current_friend",
                                use_Target_User_Store(getFriend(
                                    chat.chatUsers,
                                    state.current_user?.id as string
                                ) as UserSchema)()
                            );
                        }}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 0.5 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={
                                    getFriend(
                                        chat.chatUsers,
                                        state.current_user?.id as string
                                    )?.image
                                }
                                alt={
                                    getFriend(
                                        chat.chatUsers,
                                        state.current_user?.id as string
                                    )?.name
                                }
                                className="w-10 rounded-full"
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <p className="text-xs font-bold uppercase overflow-hidden text-ellipsis">
                                    {
                                        getFriend(
                                            chat.chatUsers,
                                            state.current_user?.id as string
                                        )?.name
                                    }
                                </p>
                            }
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default ChatList;
