import { useSelector, useDispatch } from "react-redux";

import "../styles/index.css";
import { RootState, AppDispatch } from "../state/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const user = useSelector((state: RootState) => state.userState);
  //   const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log("USER", user);

  useEffect(() => {
    if (!user || !user.isConnected) {
      navigate("/signin");
    }
  });

  return (
    <div className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${user.credentials?.firstName} ${user.credentials?.lastName}`}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
};
export default User;
