import React from "react";
import "./EditForm.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { asyncUpdateUserInfos } from "../../state/user/userSlice";

import { useEffect, useState } from "react";

export interface Props {
  setIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditForm = (props: Props) => {
  const { setIsDisplayed } = props;

  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  const [newUserName, setNewUserName] = useState<string>("");

  useEffect(() => {
    if (user && user.credentials?.userName) {
      setNewUserName(user.credentials.userName);
    }
  }, []);

  return (
    <div className="edit-form-container">
      <h2>Edit user info</h2>

      <div className="edit-form">
        <div className="">
          <label htmlFor="">User name : </label>
          <input
            type="text"
            value={newUserName}
            onChange={(v) => setNewUserName(v.target.value)}
          />
        </div>

        <div className="">
          <label htmlFor="">First name : </label>
          <input disabled type="text" value={user.credentials?.firstName} />
        </div>

        <div className="">
          <label htmlFor="">Last name : </label>
          <input disabled type="text" value={user.credentials?.lastName} />
        </div>
      </div>

      <div className="edit-form-btns">
        <button
          onClick={async () =>
            await dispatch(
              asyncUpdateUserInfos(
                JSON.stringify({
                  token: user.sessionToken,
                  updatedInfo: "userName",
                  newValue: newUserName,
                })
              )
            )
          }
        >
          Save
        </button>
        <button onClick={() => setIsDisplayed(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;
