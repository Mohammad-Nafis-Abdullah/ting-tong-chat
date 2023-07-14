/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { createContext, useEffect } from "react";
import { useGlobalStateReturn } from "./store/schema";
import useGlobalState from "./store/useGlobalState";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.init";
import { UserSchema } from "./schema/schema";
import use_Target_User_Store from "./store/localStorage";

export const GlobalState = createContext({} as useGlobalStateReturn);

function App() {
    const { state, setState } = useGlobalState();
    const [currentUser] = useAuthState(auth);

    useEffect(() => {
        console.log(state);
    }, [state]);

    useEffect(() => {
        if (currentUser) {
            const current_user: UserSchema = {
                id: currentUser.uid,
                email: currentUser.email as string,
                image: currentUser.photoURL as string,
                name: currentUser.displayName as string,
                nameLowerCase: currentUser.displayName?.split(" ") as string[],
            };
            setState("current_friend", use_Target_User_Store());
            setState("current_user", current_user);
        }
    }, [currentUser]);

    return (
        <GlobalState.Provider value={{ state, setState }}>
            <div className="min-h-screen pt-14 pl-[3.6rem] flex flex-col">
                <Header />
                <section className="grow flex flex-col">
                    <Outlet />
                </section>
                <Footer />
            </div>
        </GlobalState.Provider>
    );
}

export default App;
