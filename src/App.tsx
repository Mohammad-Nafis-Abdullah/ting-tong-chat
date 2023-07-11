import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { createContext } from "react";
import { useGlobalStateReturn } from "./store/schema";
import useGlobalState from "./store/useGlobalState";

const GlobalState = createContext({} as useGlobalStateReturn);

function App() {
    const { state, setState } = useGlobalState();

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
