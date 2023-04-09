import React, { useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";

async function updateUserProfile(details) {
  const firebaseApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8`;

  try {
    const response = await fetch(firebaseApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    console.log(data); // contains the updated user profile data
  } catch (error) {
    console.error(error); // handle update error
  }
}

async function getUserProfile(idToken) {
  const firebaseApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8`;

  try {
    const response = await fetch(firebaseApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: idToken }),
    });
    const data = await response.json();
    // ctx.setIsEmailVerified(data.users[0].emailVerified)
    // ctx.setDisplayName(data.users[0].displayName);
    // ctx.setDisplayImage(data.users[0].photoUrl)
    // ctx.setEmail(data.users[0].email)
    // console.log(data.users[0].emailVerified)
    return data.users[0];

    // console.log(data); // contains the updated user profile data
  } catch (error) {
    console.error(error); // handle update error
  }
}

async function verifyEmail(idToken) {
  const firebaseApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8`;

  const requestData = {
    idToken: idToken,
    requestType: "VERIFY_EMAIL",
  };

  try {
    const response = await fetch(firebaseApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (response.ok) {
      alert("check your email to verify");
    }
    const data = await response.json();
    console.log(data); // contains the response data
  } catch (error) {
    console.error(error); // handle error
  }
}

function ProfilePage(props) {
  // const ctx = useContext(AppContext);
  const params = useParams();
  const idToken = useSelector((state) => state.auth.idToken);
  const [profile, setProfile] = useState({
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKo76YVrnnPieB27rFfO4k43aaWCgI0o4Dr3WC8TNVvU4wDS-s7c1vcXk6CpO5S9zOtuA&usqp=CAU",
    userName: "Yourname",
    email: "youremail@gmail.com",
    isEmailVerified: "false",
  });

  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  useEffect(()=>{
    getUserProfile(idToken).then((data) => {
      const profilDetails = {
        image: data.photoUrl,
        userName: data.displayName,
        email: data.email,
        isEmailVerified: data.emailVerified,
      };
      setProfile(profilDetails);
    });
  },[idToken])


 console.log(profile)
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleImageChange = (event) => {
    setNewImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const details = {
      displayName: newName,
      photoUrl: newImage,
      idToken: idToken,
      returnSecureToken: true,
    };
    updateUserProfile(details).then((data) => {
      const profilDetails = {
        image: newImage,
        userName: newName,
        email: profile.email,
        isEmailVerified: profile.isEmailVerified,
      };
      setProfile(profilDetails);
    });

    setNewImage("");
    setNewName("");
  };
  if (params.idToken !== idToken) {
    return <p>Page Not Found</p>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={profile.image} alt="Profile" className="profile-image" />
        <h1 className="profile-name">{profile.userName}</h1>
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <p className="profile-email">{profile.email}</p>
          {profile.isEmailVerified ? (
            <FaCheckCircle className="email-verified-icon" />
          ) : (
            <button
              className="verify-email-button"
              onClick={() => verifyEmail(idToken)}
            >
              {" "}
              verify email <FaEnvelope />
            </button>
          )}
        </div>
      </div>
      <div className="profile-form">
        <h2 className="form-header">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name-input">Name:</label>
          <input
            type="text"
            id="name-input"
            value={newName}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="image-input">Profile Picture URL:</label>
          <input
            type="text"
            id="image-input"
            value={newImage}
            onChange={handleImageChange}
            required
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
