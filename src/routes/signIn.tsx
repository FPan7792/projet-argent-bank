import { useSelector, useDispatch } from "react-redux";
import {} from "../state/user/userSlice";
import "../styles/index.css";
import { RootState, AppDispatch } from "../state/store";

export const SignIn = () => {
  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch();

  console.log(user, "user");

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
          {/* <a href="./user.html" className="sign-in-button">Sign In</a> */}
          {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </div>
  );
};
export default SignIn;

// export function Counter() {

//   return (
//     <div>
//       <div>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           Increment
//         </button>
//         <span>{count}</span>
//         <button
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           Decrement
//         </button>
//       </div>
//     </div>
//   )
// }
