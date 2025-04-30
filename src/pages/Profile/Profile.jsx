import React, { useEffect, useState } from 'react';
import './Profile.css'; // <-- Import the CSS for styles

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserData(loggedInUser);
    }
  }, []);

  if (!userData) {
    return (
      <div className="container my-5">
        <h2 className="text-center">No Profile Data Available</h2>
      </div>
    );
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="profile-card glow-hover p-4 rounded shadow text-center">
        <img
          src="https://i.pinimg.com/736x/9f/3b/2d/9f3b2de2ef9fdaeeada5d925f70b8a93.jpg"
          alt="Profile"
          className="profile-img mb-3"
        />
        <h4 className="fw-bold">{userData.username}</h4>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Sex:</strong> {userData.sex}</p>
      </div>
    </div>
  );
};

export default Profile;
