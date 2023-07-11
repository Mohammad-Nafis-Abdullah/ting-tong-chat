import { UserSchema } from "../schema/schema";

const Storage_name = 'target_user';

export default function use_Target_User_Store(data?:UserSchema):UserSchema {
  if (data) {
    localStorage.setItem(Storage_name,JSON.stringify(data));
  }
  const target = localStorage.getItem(Storage_name) || "{}";
  return JSON.parse(target);
}