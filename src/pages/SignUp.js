import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function SignUp({ setSignedIn }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    dob: "",
  });

  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/users`, user)
      .then((user) => {
      window.localStorage.setItem("myUser", JSON.stringify(user));
      setSignedIn(true)
      navigate('/profile')
    })
    .catch((error) => console.error(error))
  };


  return (
    <main className="signUp">
      <h1 className="SignUpTitle">Create an account</h1>
      <form className="" onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          required
          value={user.first_name}
          onChange={handleTextChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          required
          value={user.last_name}
          onChange={handleTextChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={user.email}
          onChange={handleTextChange}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          value={user.username}
          onChange={handleTextChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          required
          value={user.password}
          onChange={handleTextChange}
        />
        <label htmlFor="dob">DOB</label>
        <input
          type="text"
          name="dob"
          id="dob"
          required
          value={user.dob}
          onChange={handleTextChange}
        />
        <button className="submitButton">Submit</button>
        <p>
          Have an account?
          <Link to="/">Login here</Link>
        </p>
      </form>
    </main>
  );
}

export default SignUp;






