/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { USERS_COLLECTION } from "../../hooks/DbCollectionName";
import { UserSchema } from "../../schema/userSchema";
import {
    endAt,
    get,
    orderByChild,
    query,
    ref,
    startAt,
} from "firebase/database";
import { db } from "../../firebase.init";

interface SearchUserSchema {
    open: boolean;
}

const SearchUser = ({ open }: SearchUserSchema) => {
    const [user, setUser] = useState<UserSchema[]>([]);
    const [search, setSearch] = useState("");
    const SearchTime_Ref: MutableRefObject<NodeJS.Timeout | undefined> =
        useRef();
    const usersRef = ref(db, USERS_COLLECTION);

    useEffect(() => {
        if (search) {
            if (SearchTime_Ref.current) {
                clearTimeout(SearchTime_Ref.current);
                SearchTime_Ref.current = undefined;
            }
            if (!SearchTime_Ref.current) {
                SearchTime_Ref.current = setTimeout(() => {
                    // write user search functionality here
                    const q = query(
                        usersRef,
                        orderByChild("nameLowerCase"),
                        startAt(search),
                        endAt(search + "\uf8ff")
                    );

                    get(q).then((snapshot) => {
                        const users = snapshot.val();
                        console.log(users);
                        // const results = users ? Object.values(users) : [];
                        // setUser(results);
                    });

                    // console.log(search);

                    SearchTime_Ref.current = undefined;
                }, 2000);
            }
        }
    }, [search]);

    return (
        <label className="flex flex-col items-center px-1 relative">
            <input
                onBlur={() => {
                    setSearch("");
                    setUser([]);
                }}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className={`min-w-0 w-full p-1 font-bold text-slate-600 rounded focus:outline-rose-500 focus:outline-2 ${
                    !open && "invisible"
                }`}
                placeholder="Search People..."
                value={search}
            />
            <div
                className={`max-h-[15rem] w-full p-1.5 bg-slate-800 z-10 absolute top-9 overflow-y-auto whitespace-pre-wrap ${
                    (!open || !search || !user.length) && "hidden"
                }`}
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Repellat,
                quos?
            </div>
        </label>
    );
};

export default SearchUser;
