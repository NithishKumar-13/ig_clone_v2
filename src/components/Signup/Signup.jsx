import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.png";
import "./Signup.scss";

const initialState = {
  email: "",
  fullName: "",
  userName: "",
  password: "",
};

const Signup = () => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser((prevSt) => ({ ...prevSt, [name]: value }));
  };

  const handleSignup = async (evt) => {
    evt.preventDefault();
    const response = await axios.post("http://localhost:8080/user/signup", user);
    const data = await response.data;
    console.log(data);
    setUser(initialState);
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__box signup__box--1">
          <img src={Logo} alt="" className="signup__logo" />
          <p className="signup__title">
            Sign up to see photos and videos from your friends
          </p>
          <form onSubmit={handleSignup} className="signup__form">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="signup__input"
              placeholder="Email address"
            />
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="signup__input"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="signup__input"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="signup__input"
              placeholder="Password"
            />
            <button type="submit" className="signup__cta signup__cta--1">
              Sign up
            </button>
          </form>
        </div>
        <div className="signup__box signup__box--2">
          <p>
            Have an account?{" "}
            <Link className="signup__cta signup__cta--2" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
