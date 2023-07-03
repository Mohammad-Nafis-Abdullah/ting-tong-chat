import { Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

const ChatArea = () => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleTextareaInput();
  }, [value]);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.shiftKey) {
        const textarea = event.currentTarget;
        const cursorPosition = textarea.selectionStart || 0;
        const valueWithNewLine = value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);
        setValue(valueWithNewLine);
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
      } else if(value.split('\n').join('').length) {
        console.log({value});
        setValue('');
        // console.log({textLength:value.split('\n').join('').length});
      }
    }
  };


  const handleSendBtn = ()=> {
      console.log({value});
      setValue('');
  }

    return (
        <div className="grow flex flex-col">
            <article className="grow"></article>

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
