import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    let data = await fetch("http://localhost:8000/api/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
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
      alert(data.message);
    }
  };

  return (
    <div className='login'>
      <h1>Login Page</h1>
      <input
        type='text'
        placeholder='Enter Email'
        className='inputBox'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter Password'
        className='inputBox'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className='appButton' type='button'>
        Login
      </button>
    </div>
  );
};

export default Login;
