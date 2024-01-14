import { ChangeEvent, useRef } from "react";
import { useSubmit } from "react-router-dom";
import {
  getUserData,
  getAccountTypeString,
  saveUserData,
} from "../util/Methods";
import { ProfilePictureRequest } from "../remote/request-types";
import noProfilePicture from "../util/images/no_profile_picture.jpg";
import classes from '../components/Profile.module.css';
function AccountDetailsPage() {
  const imgKey = useRef(0);
  const userData = getUserData()!;
  const triggerAction = useSubmit();
  let profilePicture: string | null = null;

  console.log(imgKey.current);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    const eventImage = fileList?.item(0);
    if (eventImage) {
      loadEventPhoto(eventImage);
    }
  }

  function loadEventPhoto(image: File) {
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64ProfilePic = (reader.result as string).split(",")[1];
      profilePicture = base64ProfilePic;
    };

    reader.readAsDataURL(image);
  }

  function handlePhotoSave() {
    if (!profilePicture) {
      return;
    }

    imgKey.current++;
    triggerAction(
      { accountId: userData.id, base64Photo: profilePicture },
      { method: "POST" }
    );
  }

  let profileSrc = noProfilePicture;
  if (userData.hasProfilePicture) {
    profileSrc = `http://localhost:3000/profile/${userData.id}.jpg`;
  }

  return (
    <div className={classes.bigDiv}>
      
    <div>
      <div>
        <h2> {userData.username}</h2>
      </div>
      <div className={classes.secondDiv}>
        
      <div className={classes.labelDiv}>
       <p className={classes.labelP}>Oras</p>
       <p className={classes.labelText}>{userData.city}</p>
      </div>

      <div className={classes.labelDiv}>
        <p className={classes.labelP}>Tip utilizator</p>
        <p className={classes.labelText}> {getAccountTypeString(userData.accountType)}</p>
      </div>

      </div>
      <div>
        <label>Email: {userData.email}</label>
      </div>
      </div>
      <div>
        <img
          key={imgKey.current}
          src={profileSrc}
          style={{ height: 150, width: 150 }}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handlePhotoChange}
        />

        <button onClick={handlePhotoSave}>Save photo</button>
      </div>

    </div>
  );
}

export default AccountDetailsPage;

export const accountDetailsAction = async ({ request }) => {
  const data = await request.formData();

  const profilePicRequest: ProfilePictureRequest = {
    accountId: data.get("accountId"),
    base64Photo: data.get("base64Photo"),
  };

  const response = await fetch("http://localhost:3000/changeProfilePicture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profilePicRequest),
  });

  if (response.ok) {
    const userData = getUserData()!;
    userData.hasProfilePicture = true;

    saveUserData(userData);
  }

  return response;
};
