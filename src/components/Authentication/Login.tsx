import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import google from "../../assets/google.gif";
import { auth } from "../../firebase.init";
import Loading from "../Loading/Loading";
import { UserSchema } from "../../schema/schema";
import useGlobal from "../../hooks/useGlobal";
import { use_Current_User_Store } from "../../store/localStorage";

const Login = () => {
    const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
    const {setState} = useGlobal();

    const hanldeSignIn = async () => {
        const res = await signInWithGoogle();
        if (res) {
            const current_user: UserSchema = {
                id: res.user.uid,
                email: res.user.email as string,
                image: res.user.photoURL as string,
                name: res.user.displayName as string,
                nameLowerCase: res.user.displayName?.split(" ") as string[],
            };
            setState("current_user", use_Current_User_Store(current_user)());
        }
        return;
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-3">
            {loading && <Loading />}
            <h1 className="font-bold text-3xl pb-8 text-slate-800 text-center">
                Welcome to Ting Tong Chatting
            </h1>
            <button
                onClick={hanldeSignIn}
                className="border-4 rounded-xl inline-flex items-center gap-3 p-3 mx-3"
            >
                <h1 className="font-bold text-2xl text-slate-800">
                    Sign Up With{" "}
                </h1>
                <img src={google} alt="" className="h-20 w-20" />
            </button>
            {error && (
                <p className="font-bold text-red-600 px-8 py-3 bg-red-600/30 rounded border border-red-600/40">
                    {error.code
                        .split("/")[1]
                        .split("-")
                        .join(" ")
                        .toUpperCase()}
                </p>
            )}
        </div>
    );
};

export default Login;
