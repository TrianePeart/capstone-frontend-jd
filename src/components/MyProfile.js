import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyProfile(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = window.localStorage.getItem('myUser');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div>
            <div>
                <h1>{user.data && user.data.username}</h1>
                <h3>{user.data && user.data.title}</h3>
                <p><strong>My Name Is:</strong> {user.data && user.data.first_name && user.data.last_name}</p>
                <p><strong>My Pronouns Are:</strong> {user.data && user.data.pronouns}</p>
                <p><strong>About Me:</strong> {user.data && user.data.about_me}</p>
            </div>
            <Link to='/editProfile'>
                <button>Edit Profile</button>
            </Link>
        </div>
    );
}

export default MyProfile;
