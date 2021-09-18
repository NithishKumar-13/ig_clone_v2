import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminProfile from "./AdminProfile";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.scss";

const Sidebar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getSuggestion = async () => {
      const response = await axios.get(
        `http://localhost:8080/suggestions/${user.id}`
      );
      setSuggestions(
        response.data
          .filter((u) => u.id !== user.id)
          .map((data) => ({ ...data, is_following: false }))
      );
      console.log(response.data)
    };
    getSuggestion();
  }, [user.id]);

//   const handleFollowUser = async (followingid, followingusername) => {
//     await axios.post(`http://localhost:8080/follow`, {
//       user_id: user.id,
//       following_id: followingid,
//       following_username: followingusername,
//     });

//     const updatedSuggestions = [...suggestions].map((data) => {
//       if (data.username === followingusername) {
//         return { ...data, is_following: true };
//       }
//       return { ...data };
//     });
//     setSuggestions(updatedSuggestions);
//   };

  return (
    <aside className="sidebar">
      <AdminProfile {...user} />
      <div className="sidebar__suggestion-title">Suggestions for you</div>
      {suggestions.map((u) => {
        return (
          <div className="user">
            <div className="user__wrapper">
              <Link to={`/profile/${u.username}`}>
                <img
                  className="user__avatar"
                  src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="user profile "
                />
              </Link>
              <div className="user__info">
                <p className="user__info--username">{u.following_username}</p>
                <p className="user__info--name">{u.following_fullName}</p>
              </div>
            </div>
            <button
              className={`user__btn ${
                u.is_following ? "user__btn--following" : "user__btn--follow"
              }`}
            >
              {u.is_following ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
