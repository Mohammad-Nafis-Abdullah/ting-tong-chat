import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../components/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";
import Inbox from "../components/Inbox/Inbox";

export const GetRoutes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "inbox/:id",
                    element: <Inbox />,
                    loader: async () => {
                        return "";
                    },
                },
                {
                    path: "account/:id",
                    element: <Profile />,
                    loader: async () => {
                        return "";
                    },
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ]);
};
