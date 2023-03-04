import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    auth && navigate("/");
  }, []);

  const authData = async () => {
    let data = await fetch("http://localhost:8000/api/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
        authentication: JSON.parse(localStorage.getItem("token")),
      },
    });
    data = await data.json();
    if (data.authentication) {
      localStorage.setItem("users", JSON.stringify(data.result));
      localStorage.setItem("token", JSON.stringify(data.authentication));
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <input
        className='inputBox'
        type='text'
        placeholder='Enter Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='inputBox'
        type='text'
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='inputBox'
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='appButton' type='submit' onClick={authData}>
        Sign up
      </button>
    </div>
  );
};

export default Signup;
