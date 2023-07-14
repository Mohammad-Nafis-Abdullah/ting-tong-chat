import { QuestionAnswer } from "@mui/icons-material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserSchema } from "../../schema/schema";
import useGlobal from "../../hooks/useGlobal";
import {use_Target_User_Store} from "../../store/localStorage";

const Profile = () => {
    const {state,setState} = useGlobal();
    const navigate = useNavigate();
    const user = useLoaderData() as UserSchema;

    return (
        <div className="grow justify-center flex flex-col py-10 px-3 gap-y-8">
            <section className="self-center rounded-full relative">
                <img
                    className="h-24 w-24 rounded-full"
                    src={user?.image}
                    alt={user?.name}
                />

                <button
                    onClick={() =>{
                        navigate(`/inbox/${state.current_user?.id}-${user.id}`);
                        setState('current_friend',use_Target_User_Store(user)());
                    }
                    }
                    className={`${
                        state.current_user?.id === user.id && "hidden"
                    } w-10 h-10 bg-rose-500 text-white font-bold rounded-full flex justify-center items-center gap-x-2 capitalize active:scale-[0.98] absolute border-4 -bottom-1 -right-1`}
                >
                    <QuestionAnswer color="inherit" />
                </button>
            </section>

            <article className="max-w-sm w-full mx-auto p-3 space-y-3">
                {/* <section className="flex justify-between">
                    <button className="px-3 py-1.5 bg-rose-500 text-white font-bold rounded inline-flex items-center gap-x-2">
                        Add <PersonAdd color="inherit" />
                    </button>

                    <button className="px-3 py-1.5 bg-sky-500 text-white font-bold rounded inline-flex items-center gap-x-2">
                        Remove <PersonRemove color="inherit" />
                    </button>
                </section> */}

                <p className="text-rose-500 font-bold text-center">
                    {user?.name}
                </p>

                <p className="text-rose-500 font-bold text-center">
                    {user?.email}
                </p>

                <p className="font-bold text-slate-950 text-center">
                    Connections :{" "}
                    <span className="text-rose-500">
                        {user?.inbox ? Object.values(user.inbox).length : 0}
                    </span>
                </p>
            </article>
        </div>
    );
};

export default Profile;
