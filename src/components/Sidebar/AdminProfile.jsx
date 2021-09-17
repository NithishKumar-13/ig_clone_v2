import React from "react";
import "./Sidebar.scss";

const AdminProfile = ({ img, username, full_name }) => {
  return (
    <div className="sidebar__header">
      <img
        className="sidebar__img--admin"
        src="https://images.pexels.com/photos/4100748/pexels-photo-4100748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
      <div className="sidebar__profile-info">
        <p className="sidebar__profile--username">{username}</p>
        <p className="sidebar__profile--name">{full_name}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
