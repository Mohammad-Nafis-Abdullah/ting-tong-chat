import { QuestionAnswer } from "@mui/icons-material";

const Profile = () => {
    return (
        <div className="border-4 border-black grow justify-center flex flex-col py-10 px-3 gap-y-8 m-3">
            <section className="self-center rounded-full relative">
                <img
                    className="h-24 w-24 rounded-full"
                    src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
                    alt=""
                />

                <button className="w-10 h-10 bg-rose-500 text-white font-bold rounded-full flex justify-center items-center gap-x-2 capitalize active:scale-[0.98] absolute border-4 -bottom-1 -right-1">
                    <QuestionAnswer color="inherit" />
                </button>
            </section>

            <article className="max-w-xs w-full mx-auto p-3 space-y-3">
                {/* <section className="flex justify-between">
                    <button className="px-3 py-1.5 bg-rose-500 text-white font-bold rounded inline-flex items-center gap-x-2">
                        Add <PersonAdd color="inherit" />
                    </button>

                    <button className="px-3 py-1.5 bg-sky-500 text-white font-bold rounded inline-flex items-center gap-x-2">
                        Remove <PersonRemove color="inherit" />
                    </button>
                </section> */}

                <p className="font-bold text-slate-950">
                    Name :{" "}
                    <span className="text-rose-500">name of current user</span>
                </p>

                <p className="font-bold text-slate-950">
                    Email : <span className="text-rose-500">email address</span>
                </p>

                <p className="font-bold text-slate-950">
                    Connections :{" "}
                    <span className="text-rose-500">number of connections</span>
                </p>
            </article>
        </div>
    );
};

export default Profile;
