/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateContact = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetch(`http://localhost:8000/api/updateContact/${params.id}`, {
      headers: { authentication: JSON.parse(localStorage.getItem("token")) },
    });
    data = await data.json();
    setName(data.name);
    setPhoneNo(data.phoneNo);
    setEmail(data.email);
    setCompany(data.company);
  };

  const updateContact = async () => {
    let data = await fetch(`http://localhost:8000/api/updateContact/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, phoneNo, email, company }),
      headers: {
        "Content-Type": "application/json",
        authentication: JSON.parse(localStorage.getItem("token")),
      },
    });
    data = await data.json();
    navigate("/");
  };

  return (
    <div className='contact'>
      <h1>Update Product</h1>
      <input
        type='text'
        placeholder='Enter Name'
        className='inputBox'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Phone No'
        className='inputBox'
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Email'
        className='inputBox'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Company'
        className='inputBox'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={updateContact} className='appButton'>
        Update Product
      </button>
    </div>
  );
};

export default UpdateContact;
