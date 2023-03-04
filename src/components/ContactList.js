/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    const userId = JSON.parse(localStorage.getItem("users"))._id;
    console.log(userId);
    let data = await fetch(`http://localhost:8000/api/contactList/${userId}`, {
      headers: { authentication: JSON.parse(localStorage.getItem("token")) },
    });
    data = await data.json();
    setContacts(data);
  };

  const deleteContact = async (id) => {
    let result = await fetch(
      `http://localhost:8000/api/contactList/delete/${id}`,
      {
        method: "Delete",
        headers: { authentication: JSON.parse(localStorage.getItem("token")) },
      }
    );
    result = await result.json();
    if (result) {
      getContact();
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      let data = await fetch(`http://localhost:8000/api/search/${key}`, {
        headers: { authentication: JSON.parse(localStorage.getItem("token")) },
      });
      data = await data.json();
      if (data) {
        setContacts(data);
      }
    } else {
      getContact();
    }
  };

  return (
    <div className='contactList'>
      <h1>Contact List</h1>
      <input
        type='text'
        placeholder='Search Contact'
        className='searchInput'
        onChange={searchHandle}
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Phone No</li>
        <li>Email</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <ul key={contact._id}>
            <li>{index + 1}</li>
            <li>{contact.name}</li>
            <li>{contact.phoneNo}</li>
            <li>{contact.email}</li>
            <li>{contact.company}</li>
            <li>
              <button onClick={() => deleteContact(contact._id)}>Delete</button>
              <Link to={"/updateContact/" + contact._id}>
                <button>Update</button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ContactList;
