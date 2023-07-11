import { useContext } from "react";
import { GlobalState } from "../App";

export default function useGlobal (){
  return useContext(GlobalState);
}