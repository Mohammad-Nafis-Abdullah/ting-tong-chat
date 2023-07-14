import { UserSchema } from "../schema/schema";

const Storage_name = "target_user";

export function use_Target_User_Store(data?: UserSchema | null) {
    if (data !== undefined) {
      localStorage.setItem(Storage_name, JSON.stringify(data));
    }
    
    return () => {
        const target = localStorage.getItem(Storage_name);
        return target ? JSON.parse(target) : undefined;
    };
}

const Current_user_storage_name = "current_user";

export function use_Current_User_Store(data?: UserSchema | null) {
    if (data !== undefined) {
      localStorage.setItem(Current_user_storage_name, JSON.stringify(data));
    }

    return () => {
        const target = localStorage.getItem(Current_user_storage_name);
        return target ? JSON.parse(target) : undefined;
    };
}
