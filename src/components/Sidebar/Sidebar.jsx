import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminProfile from "./AdminProfile";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.scss";

const Sidebar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([])
  const [users, setUsers] = useState([])
  const { user } = useAuth();

  useEffect(() => {
    const fetchFollowingUsers = async() => {
      try {
        const response = await axios.get(`http://localhost:8080/users/followings/${user.username}`)
        setFollowingUsers(response.data)
      } catch(err) {
         console.log('Error : ', err )
      }
    }

    const fetchUsers = async() => {
      try {
        const response = await axios.get(`http://localhost:8080/users`)
        setUsers(response.data)
      } catch(err) {
        console.log(`error ${err}`)
      }
    }

    fetchFollowingUsers()
    fetchUsers()

     const getSuggestedUsers = () => {
       const following_users = followingUsers.map((v) => {
         return {
           username: v.following_username,
           full_name: v.following_fullName,
         };
       });
       let res = [];
       res = users.filter((user) => {
         return !following_users.find((u) => {
           return u.username === user.username;
         });
       });
       return res;
     };
     setSuggestions(getSuggestedUsers())
  },[user.username, followingUsers, users])  
 
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
                  src={u.user_img}
                  alt="user profile "
                />
              </Link>
              <div className="user__info">
                <p className="user__info--username">{u.username}</p>
                <p className="user__info--name">{u.full_name}</p>
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
