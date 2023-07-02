import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../components/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";

export const GetRoutes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "account/:id",
                    element: <Profile />,
                    loader: async () => {
                        return "";
                    },
                },
                {
                  path:'*',
                  element: <NotFound />
                }
            ],
        },
    ]);
};
