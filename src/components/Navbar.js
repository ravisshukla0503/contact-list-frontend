/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      {auth ? (
        <ul className='nav-ul'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/addContact'>Add Contact</Link>
          </li>
          <li>
            <Link to='/updateContact'>Update Contact</Link>
          </li>
          <li>
            <Link onClick={logout} to='/logout'>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className='nav-ul nav-right'>
          <li>
            <Link to='/signup'>Sign-up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;
