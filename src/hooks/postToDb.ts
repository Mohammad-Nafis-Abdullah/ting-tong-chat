import { ref, set } from "firebase/database";
import { db } from "../firebase.init";

const postToDb = async <T extends object>(url:string,key:string, data:T) => {
  const postRef = ref(db,`${url}/${key}`);
  const result = await set(postRef,data);
  return result;
};

export default postToDb;