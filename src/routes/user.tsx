import { useSelector, useDispatch } from "react-redux";
import {
  setAsyncConnection,
  setConnection,
  getUser,
  asyncGetUser,
} from "../state/user/userSlice";
import "../styles/index.css";
import { RootState, AppDispatch } from "../state/store";
import { useEffect, useState } from "react";

export const User = () => {
  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  console.log("USER", user);

  return <p>Je suis un composant</p>;
};
export default User;
