/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContactList = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addContact = async () => {
    if (!name || !phoneNo || !email || !company) {
      setError(true);
      return false; 
    }
    const userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("http://localhost:8000/api/addContact", {
      method: "post",
      body: JSON.stringify({ name, phoneNo, userId, email, company }),
      headers: {
        "Content-Type": "application/json",
        authentication: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    navigate("/");
  };

  return (
    <div className='contact'>
      <h1>Add Contacts</h1>
      <input
        type='text'
        placeholder='Enter Name'
        className='inputBox'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      {error && !name && <span className='invalidInput'>Enter valid name</span>}
      <input
        type='text'
        placeholder='Enter PhoneNo'
        className='inputBox'
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />{" "}   
      {error && !phoneNo && (
        <span className='invalidInput'>Enter valid phoneNo</span>
      )}
      <input
        type='text'
        placeholder='Enter email'
        className='inputBox'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      {error && !email && (
        <span className='invalidInput'>Enter valid email</span>
      )}
      <input
        type='text'
        placeholder='Enter Company'
        className='inputBox'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />{" "}
      {error && !company && (
        <span className='invalidInput'>Enter valid company</span>
      )}
      <button onClick={addContact} className='appButton'>
        Add Contact
      </button>
    </div>
  );
};

export default AddContactList;
