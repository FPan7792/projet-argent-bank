import { Link } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import "../styles/index.css";
import { Outlet } from "react-router-dom";

const Root = () => {
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
          <Link className="main-nav-item" to={"signin"}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
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
