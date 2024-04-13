import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import "../styles/index.css";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../state/store";
import { logOut } from "../state/user/userSlice";

const Root = () => {
  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isConnected) {
      navigate("/signin");
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      {/* header */}
      <nav className="main-nav">
        <Link className="main-nav-logo" to={"/"}>
          {/* TODO: tailwind ?? */}
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
            <div
              onClick={() => dispatch(logOut())}
              className="main-nav-item logout-btn"
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
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
