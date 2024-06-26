import { useSelector, useDispatch } from "react-redux";
import {
  setAsyncConnection,
  setConnection,
  asyncGetUser,
} from "../state/user/userSlice";
import "../styles/index.css";
import { RootState, AppDispatch } from "../state/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getUserSession = async (e: React.ChangeEvent<HTMLFormElement>) => {
    // prevent reload
    e.preventDefault();

    try {
      if (email && password) {
        await dispatch(setAsyncConnection(JSON.stringify({ email, password })));
        dispatch(setConnection());
      } else throw new Error("missing credentials");
    } catch (error) {
      alert(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userCheckup = async () => {
        if (user?.sessionToken) {
          await dispatch(asyncGetUser(user.sessionToken));
          if (user.credentials) {
            return navigate("/user");
          } else return null;
        }
      };
      userCheckup();
    } catch (error) {
      alert(error);
    }
  }, [dispatch, user, navigate]);

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={getUserSession}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              value={email}
              onChange={(e) => getEmail(e)}
              type="text"
              id="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => getPassword(e)}
              type="password"
              id="password"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* submit btn */}
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </div>
  );
};
export default SignIn;
