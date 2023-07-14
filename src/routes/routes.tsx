import { Params, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../components/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";
import Inbox from "../components/Inbox/Inbox";
import RequireAuth from "../components/HOC/RequireAuth";
import { USERS_COLLECTION } from "../hooks/DbCollectionName";
import { getCloudStoreSingleData } from "../hooks/cloudFireStore";
import { UserSchema } from "../schema/schema";

export const GetRoutes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: (
                <RequireAuth>
                    <App />
                </RequireAuth>
            ),
            children: [
                {
                    path: "inbox/:id",
                    element: <Inbox />,
                    loader: async ({ params }) => {
                        const { id }: Params<string> = params;
                        const [id1, id2] = (id as string).split("-");
                        return { id1, id2 };
                    },
                },
                {
                    path: "chat/:id",
                    element: <Inbox />,
                    loader: async ({ params }) => {
                        const { id }: Params<string> = params;
                        return { id1: id };
                    },
                },
                {
                    path: "account/:id",
                    element: <Profile />,
                    loader: async ({ params }) => {
                        // console.log(params.id);
                        const user: UserSchema = (await getCloudStoreSingleData(
                            USERS_COLLECTION,
                            params.id as string
                        )) as UserSchema;
                        return user;
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
