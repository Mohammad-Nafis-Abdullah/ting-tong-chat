import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="min-h-screen pt-14 pl-[3.6rem] flex flex-col">
            <Header />
            <section className="grow flex flex-col">
                <Outlet />
            </section>
            <Footer />
        </div>
    );
}

export default App;
