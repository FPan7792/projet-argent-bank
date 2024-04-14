import "./EditForm.css";

export const EditForm = () => {
  return (
    <div>
      <h2>Edit user info</h2>

      <div className="edit-form">
        <div className="">
          <label htmlFor="">User name : </label>
          <input type="text" />
        </div>

        <div className="">
          <label htmlFor="">First name : </label>
          <input disabled type="text" />
        </div>

        <div className="">
          <label htmlFor="">Last name : </label>
          <input disabled type="text" />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
