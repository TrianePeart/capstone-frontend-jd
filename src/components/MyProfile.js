import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


function MyProfile(props) {
  const [user, setUser] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Add selectedAvatar state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const avatar = searchParams.get('avatar');

  useEffect(() => {
    const userData = window.localStorage.getItem('myUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar'); // Retrieve selected avatar from local storage
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  return (
    <div>
      {avatar && (
        <div>
          <h3>TEST</h3>
          <img src={avatar} alt="Selected Avatar" />
        </div>
      )}
      <h1>{user.data && user.data.username}</h1>
      <h3>{user.data && user.data.title}</h3>
      <p>
        <strong>My Name Is:</strong> {user.data && user.data.first_name && user.data.last_name}
      </p>
      <p>
        <strong>My Pronouns Are:</strong> {user.data && user.data.pronouns}
      </p>
      <p>
        <strong>About Me:</strong> {user.data && user.data.about_me}
      </p>
      <Link to="/editProfile">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}

export default MyProfile;