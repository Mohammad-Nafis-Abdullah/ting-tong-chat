import { Send } from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatSchema } from "../../schema/schema";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";

interface props {
    chat: ChatSchema;
}

const ChatArea = ({ chat }: props) => {
    const [currentUser] = useAuthState(auth);
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

    useEffect(() => {
        handleTextareaInput();
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
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
                console.log({ value });
                setValue("");
                // console.log({textLength:value.split('\n').join('').length});
            }
        }
    };

    const handleSendBtn = () => {
        console.log({ value });
        setValue("");
    };

    const displayMssg = (messageObj: ChatSchema["message"]) => {
        let messages = ``;
        for (const key in messageObj) {
            const mssg = messageObj[key];
            messages += `<section key={${mssg.id}} className="self-start flex flex-col items-start">
                        <div className="inline-block text-sm leading-[0.80rem] bg-sky-400 p-3 max-w-sm rounded-tl-3xl rounded-tr-3xl rounded-br-3xl whitespace-pre-wrap">${mssg.text}</div>
                        <p className="text-left text-xs font-bold text-gray-500">
                          send by: ${mssg.sender}
                          <br />
                          ${mssg.time}
                        </p>
                      </section>`;
        }
        return messages;
    };

    return (
        <div className="grow flex flex-col">
            {/* message body */}
            <article
                ref={containerRef}
                className="grow flex flex-col px-3 py-5 h-[calc(100vh-120px)] overflow-y-auto"
            >
              
                {/* {displayMssg(chat?.message)} */}

                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
                    return (
                        <>
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
                        </>
                    );
                })}
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
