import React from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { registeredUserDtlsSelector } from "../../redux/selectors/userDtlsSelectors";

const Profile = () => {
  const user = {};
  const loggedInUserName = useSelector(registeredUserDtlsSelector);
  return (
    <div className="profile">
      <div className="profile-details">
        <h2>Name: {loggedInUserName["name"]}</h2>
        {/* <p>{user.bio}</p> */}
      </div>
    </div>
  );
};

export default Profile;
