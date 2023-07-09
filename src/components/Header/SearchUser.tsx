/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { UserSchema } from "../../schema/schema";
import { collection, getDocs, query, where } from "firebase/firestore";
import { cloudDb } from "../../firebase.init";
import { USERS_COLLECTION } from "../../hooks/DbCollectionName";
import { useNavigate } from "react-router-dom";

interface SearchUserSchema {
    open: boolean;
}

const SearchUser = ({ open }: SearchUserSchema) => {
    const navigate = useNavigate();
    const [users, setUser] = useState<UserSchema[]>([]);
    const [search, setSearch] = useState("");
    const SearchTime_Ref: MutableRefObject<NodeJS.Timeout | undefined> =
        useRef();

    useEffect(() => {
        if (search) {
            if (SearchTime_Ref.current) {
                clearTimeout(SearchTime_Ref.current);
                SearchTime_Ref.current = undefined;
            }
            if (!SearchTime_Ref.current) {
                SearchTime_Ref.current = setTimeout(() => {
                    // write users search functionality here

                    (async () => {
                        const q = query(
                            collection(cloudDb, USERS_COLLECTION),
                            where("nameLowerCase", "array-contains", search)
                        );

                        const querySnapshot = await getDocs(q);
                        // console.log(querySnapshot.docs);

                        const searchedUsers: UserSchema[] = [];
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            // console.log(doc.id, " => ", doc.data());
                            searchedUsers.push(doc.data() as UserSchema);
                        });
                        setUser(searchedUsers);
                    })();

                    // console.log(search);

                    SearchTime_Ref.current = undefined;
                }, 2000);
            }
        }
    }, [search]);

    return (
        <label className="flex flex-col items-center px-1 relative">
            <input
                // onBlur={() => {
                //     setSearch("");
                //     setUser([]);
                // }}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className={`min-w-0 w-full p-1 font-bold text-slate-600 rounded focus:outline-rose-500 focus:outline-2 ${
                    !open && "invisible"
                }`}
                placeholder="Search People..."
                value={search}
            />
            <div
                className={`max-h-[17rem] w-full p-1.5 space-y-2 bg-slate-800 z-10 absolute top-9 overflow-y-auto whitespace-pre-wrap ${
                    (!open || !search || !users.length) && "hidden"
                }`}
            >
                {users.map((user) => (
                    <section
                        key={user.id}
                        onClick={() => navigate(`/account/${user.id}`)}
                        className="h-20 p-3 border-2 rounded flex gap-2 items-center cursor-pointer"
                    >
                        <img
                            src={user.image}
                            className="h-full rounded-full"
                            alt="profile"
                        />
                        <h3 className="whitespace-pre-wrap font-bold">
                            {user.name}
                        </h3>
                    </section>
                ))}
            </div>
        </label>
    );
};

export default SearchUser;
