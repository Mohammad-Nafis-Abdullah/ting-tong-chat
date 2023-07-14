import { Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { ChatInfoSchema, ChatSchema, MessageSchema } from "../../schema/schema";
import { setCloudStoreData, updateChatList } from "../../hooks/cloudFireStore";
import { CHATS_COLLECTION } from "../../hooks/DbCollectionName";
import useGlobal from "../../hooks/useGlobal";

interface props {
    chat: ChatSchema;
}

const ChatArea = ({ chat }: props) => {
    const {state} = useGlobal();
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTextareaInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(()=> {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    },[chat])

    useEffect(() => {
        handleTextareaInput();
    }, [value]);

    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValue(event.target.value);
    };

    const handleTextareaKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (event.shiftKey) {
                const textarea = event.currentTarget;
                const cursorPosition = textarea.selectionStart || 0;
                const valueWithNewLine =
                    value.slice(0, cursorPosition) +
                    "\n" +
                    value.slice(cursorPosition);
                setValue(valueWithNewLine);
                textarea.selectionStart = textarea.selectionEnd =
                    cursorPosition + 1;
            } else if (value.split("\n").join("").length) {
                handleSendBtn();
            } else {
                setValue("");
            }
        }
    };

    const handleSendBtn = async () => {
        if (!value || !value.split("\n").join("").length) {
            setValue("");
            return;
        }
        const newChat: ChatSchema = JSON.parse(JSON.stringify(chat));

        const newMessage: MessageSchema = {
            id: Date.now(),
            time: new Date().toLocaleString(),
            sender: state.current_user?.email as string,
            text: value,
            // timestamp: firebase.firestore.FieldValue.serverTimestamp() ,
        };
        setValue("");

        newChat.message[newMessage.id] = newMessage;
        // console.log(newChat);
        await setCloudStoreData(CHATS_COLLECTION, newChat);
        
        const chatInfo:ChatInfoSchema = {
            id:chat.id,
            chatUsers:chat.chatUsers,
            time: newMessage.id,
        }

        await updateChatList(state.current_friend?.id as string,chatInfo);
        await updateChatList(state.current_user?.id as string,chatInfo);
    };

    const displayMssg = (messageObj: ChatSchema["message"]) => {
        if (messageObj) {
            const array = Object.values(messageObj);
            return array.sort((a,b)=> {
                return a.id - b.id;
            });
        }
        return [];
    };

    return (
        <div className="grow flex flex-col max-h-[calc(100vh-65px)]">
            {/* message body */}
            <article
                ref={containerRef}
                className="grow flex flex-col px-3 py-5 overflow-y-auto gap-y-3"
            >
                {displayMssg(chat?.message).map((mssg) => {
                    return state.current_user?.email === mssg.sender ? (
                        <section
                            key={mssg.id}
                            className="self-end flex flex-col items-end"
                        >
                            <div className="inline-block text-sm leading-[0.80rem] bg-red-400 p-3 max-w-sm rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl whitespace-pre-wrap">
                                {mssg.text}
                            </div>
                            <p className="text-right text-xs font-bold text-gray-500">
                                {mssg.sender}
                                <br />
                                {mssg.time}
                            </p>
                        </section>
                    ) : (
                        <section
                            key={mssg.id}
                            className="self-start flex flex-col items-start"
                        >
                            <div className="inline-block text-sm leading-[0.80rem] bg-sky-400 p-3 max-w-sm rounded-tl-3xl rounded-tr-3xl rounded-br-3xl whitespace-pre-wrap">
                                {mssg.text}
                            </div>
                            <p className="text-left text-xs font-bold text-gray-500">
                                {mssg.sender}
                                <br />
                                {mssg.time}
                            </p>
                        </section>
                    );
                })}

                {/* {[0, 1, 2, 3, 4].map((value,i) => {
                    return (
                        <div key={i}>
                            <section className="self-start flex flex-col items-start">
                                <div className="inline-block text-sm leading-[0.80rem] bg-sky-400 p-3 max-w-sm rounded-tl-3xl rounded-tr-3xl rounded-br-3xl whitespace-pre-wrap">{`${value}\ntext\nmessage asdfasfd asdf safdsaf`}</div>
                                <p className="text-left text-xs font-bold text-gray-500">
                                    {"sender mail"}
                                    <br />
                                    {"send time"}
                                </p>
                            </section>

                            <section className="self-end flex flex-col items-end">
                                <div className="inline-block text-sm leading-[0.80rem] bg-red-400 p-3 max-w-sm rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl whitespace-pre-wrap">{`${value}\ntext\nmessage asdfasfd asdf safdsaf`}</div>
                                <p className="text-right text-xs font-bold text-gray-500">
                                    {"sender mail loremsfdasdflajsfdj"}
                                    <br />
                                    {"send time"}
                                </p>
                            </section>
                        </div>
                    );
                })} */}
            </article>

            {/* message writing field */}
            <div className="flex px-1 gap-x-2 items-center">
                <textarea
                    ref={textareaRef}
                    className="grow bg-transparent border-4 border-gray-400 rounded-md whitespace-pre-wrap h-12 max-h-[10rem] resize-none"
                    value={value}
                    onChange={handleTextareaChange}
                    onKeyDown={handleTextareaKeyDown}
                    onInput={handleTextareaInput}
                ></textarea>
                <button onClick={handleSendBtn}>
                    <Send className="text-rose-600" />
                </button>
            </div>
        </div>
    );
};

export default ChatArea;
