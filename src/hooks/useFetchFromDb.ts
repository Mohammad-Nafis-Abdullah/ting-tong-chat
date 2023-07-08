/* eslint-disable react-hooks/exhaustive-deps */
import { DataSnapshot, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase.init";

const useFetchFromDb = <T>(url:string,callback ?:(snapShot: DataSnapshot)=>T | void) => {
  const [data, setData] = useState({} as T);

  useEffect(()=> {
      const dataRef = ref(db,url);
      onValue(dataRef,(snapShot)=> {
          setData(snapShot.val());
          if (callback) {
            callback(snapShot)
          }
      })
  },[url]);

  return data;
};

export default useFetchFromDb;