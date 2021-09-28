import React from "react";
import { Link } from 'react-router-dom'
import "./Sidebar.scss";

const AdminProfile = ({ user_img, username, full_name }) => {
  return (
    <div className="sidebar__header">
      <Link to={`/profile/${username}`}>
        <img
          className="sidebar__img--admin"
          src={user_img}
          alt="user profile"
        />
      </Link>
      <div className="sidebar__profile-info">
        <p className="sidebar__profile--username">{username}</p>
        <p className="sidebar__profile--name">{full_name}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
