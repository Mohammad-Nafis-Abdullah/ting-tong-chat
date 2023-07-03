import ChatArea from "./ChatArea";

const Inbox = () => {
    return (
        <div className="flex grow ">
            
            <ChatArea/>

            <section className="hidden md:flex bg-slate-900 basis-[15rem] pt-8 p-3 flex-col items-center gap-y-3">
                <img
                    className="h-20 w-20 rounded-full"
                    src={`https://cdn-icons-png.flaticon.com/256/149/149071.png`}
                    alt="User Profile Picture"
                />
                <article className="text-center space-y-2">
                    <p className="font-bold text-rose-500 text-sm">
                      {`name`}
                    </p>

                    <p className="font-bold text-rose-500 text-xs">
                      {`email address`}
                    </p>

                </article>
            </section>
        </div>
    );
};

export default Inbox;
