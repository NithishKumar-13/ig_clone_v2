import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";
import "./Navbar.scss";

const Navbar = () => {
  const { user, dispatch } = useAuth();
  const history = useHistory()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/login')
    localStorage.removeItem('user')
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={Logo} alt="Instagram logo" className="header__logo" />
      </Link>
      {user && (
        <div className="header__profile">
          <p className="header__greetings">
            Welcome, <span className="header__user-name">{user.username}</span>
          </p>
          <img className='header__user-pic' src={user.user_img} alt='user profile' />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
            onClick={handleLogout}
          >
            <title>Log Out</title>
            <path
              d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            />
          </svg>
        </div>
      )}
    </header>
  );
};

export default Navbar;
