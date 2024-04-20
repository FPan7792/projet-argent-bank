import { Link } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import "../styles/index.css";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { logOut } from "../state/user/userSlice";

const Root = () => {
  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {/* header */}
      <nav className="main-nav">
        <Link className="main-nav-logo" to={"/"}>
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {!user.isConnected ? (
            <Link className="main-nav-item" to={"signin"}>
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          ) : (
            <div>
              <Link className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                {user.credentials?.userName}
              </Link>
              <span
                onClick={() => dispatch(logOut())}
                style={{ cursor: "pointer" }}
                className="main-nav-item"
              >
                <i className="fa fa-sign-out"></i>
                Sign Out
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* pages content */}
      <main className="page-content-container">
        <Outlet />
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Root;
