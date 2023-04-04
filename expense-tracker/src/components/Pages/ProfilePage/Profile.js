import React, { useContext, useState } from 'react';
import './Profile.css'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';

async function updateUserProfile(details){
const firebaseApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8`;

try {
  const response = await fetch(firebaseApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  const data = await response.json();
  console.log(data); // contains the updated user profile data
} catch (error) {
  console.error(error); // handle update error
}
}



function ProfilePage(props) {
    const ctx = useContext(AppContext)
    const params = useParams()

  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');

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
        idToken: ctx.idToken,
        returnSecureToken: true
      };
    updateUserProfile(details)  ;
    ctx.setDisplayName(newName);
    ctx.setDisplayImage(newImage);
    setNewImage('');
    setNewName('')
  };
  if(params.idToken !== ctx.idToken ){
    return <p>Page Not Found</p>
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={ctx.displayImage} alt="Profile" className="profile-image" />
        <h1 className="profile-name">{ctx.displayName}</h1>
        <p className="profile-email">{ctx.email}</p>
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
          />
          <label htmlFor="image-input">Profile Picture URL:</label>
          <input
            type="text"
            id="image-input"
            value={newImage}
            onChange={handleImageChange}
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
