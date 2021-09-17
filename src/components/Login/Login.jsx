import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Iphone from "../../assets/iphone-with-profile.jpg";
import Logo from "../../assets/logo.png";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuth();
  const history = useHistory();

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/login`, {
        username,
        password,
      });
      const userData = await dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });
      console.log(userData);
      history.push("/");
    } catch (err) {
      console.log(err);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__picture">
          <img
            src={Iphone}
            alt="an iphone with user profile"
            className="login__img"
          />
        </div>
        <div className="login__text">
          <div className="login__box login__box--1">
            <img src={Logo} alt="instagram logo" className="login__logo" />
            <form onSubmit={handleLogin} className="login__form">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login__input"
                placeholder="Phone number, username or email address"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login__input"
                placeholder="Password"
              />
              <button type="submit" className="login__cta login__cta--1">
                Log In
              </button>
            </form>
          </div>
          <div className="login__box login__box--2">
            <p>
              Don't have an account?{" "}
              <Link className="login__cta login__cta--2" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
