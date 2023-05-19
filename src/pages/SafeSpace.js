import React, { useState, useEffect } from 'react';
import EditProfile from '../components/EditProfile';
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function SafeSpace() {
    const { id } = useParams();
    const [user,setUser] = useState({})

    // function getTiitle() {
    //     if(){

    //     }
    // }

    useEffect(() => {
        axios
        .get(`${API}/user/${1}`)
        .then((res) => {
            setUser(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id]);
console.log(user)
    return (
        <div>
            <div>
                <h1>{user.username}</h1>
                {/* <img></img> */}
                <h3>{user.title}</h3>
                <p><strong>My Name Is:</strong>{user.name}</p>
                <p><strong>My Pronouns Are:</strong>{user.pronouns}</p>
                <p><strong>About Me:</strong>{user.about_me}</p>
            </div>
            <EditProfile />
        </div>
    );
}

export default SafeSpace;