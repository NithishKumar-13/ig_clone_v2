import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Iphone from "../../assets/iphone-with-profile.jpg";
import Logo from "../../assets/logo.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, dispatch } = useAuth();
  const history = useHistory();
  const [isAllowed, setIsNotAllowed] = useState(true)

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  useEffect(() => {
    if(username.length && password.length) {
      setIsNotAllowed(false)
    } else {
      setIsNotAllowed(true)
    }
  },[username,password])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      await dispatch({ type: 'LOGIN_START' })
      setTimeout(async() => {
        const response = await axios.post(`http://localhost:8080/user/login`, {
          username,
          password,
        });
        
      if (!response.data.auth) {
        await dispatch({
          type: "LOGIN_FAILURE",
          payload: response.data.message,
        });
      } else {
        await dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.user,
        });
        history.push("/");
      }
      },3000)
  
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
              <button type="submit" disabled={isAllowed} className={!isAllowed ? 'login__cta login__cta--1' : 'login__cta login__cta--disabled'}>
                {isLoading ? <LoadingSpinner /> : 'Log In'}
              </button>
            </form>
          {error && <p className='login__error'>{error}</p>}
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
