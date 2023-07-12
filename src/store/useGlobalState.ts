import { useReducer } from "react";
import { ActionSchema, StateSchema, useGlobalStateReturn } from "./schema";

// state initial value
export const Initial_State: StateSchema = {
    current_friend: null,
    current_user: null,
};

// state handle reducer function
const reducer = (state: StateSchema, action: ActionSchema) => {
    return {...state, [action.type]:action.payload};
};

// global state handling function with useReducer
export default function useGlobalState(): useGlobalStateReturn {
    const [state, dispatch] = useReducer(reducer, Initial_State) as readonly [
        Readonly<StateSchema>,
        (action: ActionSchema) => void
    ];

    const setState = (
        key: ActionSchema["type"],
        value: ActionSchema["payload"]
    ) => {
        dispatch({ type: key, payload: value });
    };

    return {state, setState};
}
