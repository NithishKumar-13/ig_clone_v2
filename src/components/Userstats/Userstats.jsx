import React from "react";
import axios from 'axios'
import { useAuth } from "../../context/AuthContext";
import "./Userstats.scss";

const Userstats = ({ username, img, totalPosts, followers, followings, fullName, isAdmin, userId, isFollowing }) => {
  const { user } = useAuth()
 
  const handleFollowUser = async(receiver_username, receiver_fullName, receiver_id) => {
      await axios.post(`http://localhost:8080/request/follow`, { sender_username: user.username, sender_fullName: user.full_name, sender_id: user.id, receiver_username, receiver_fullName, receiver_id })
  }

  const handleUnfollowUser = async(receiver_username, receiver_fullName, receiver_id) => {
    await axios.post(`http://localhost:8080/request/unfollow`, { sender_username: user.username, sender_fullName: user.full_name, sender_id: user.id, receiver_username, receiver_fullName, receiver_id })
  }

  return (
    <div className="user-stats">
      <div className="user-stats__left">
        <img
          className="user-stats__img"
          src={img}
          alt="user profile"
        />
      </div>
      <div className="user-stats__right">
        <div className="user-stats__header">
          <p className="user-stats__username">{username}</p>
          {isAdmin.username === username ? (
            <button className="user-stats__btn user-stats__btn--unfollow">
              Edit Profile
            </button>
          ) : isFollowing ? (
            <button className="user-stats__btn user-stats__btn--unfollow" onClick={() => handleUnfollowUser(username,fullName,userId)}>
              Unfollow
            </button>
          ) : (
            <button className="user-stats__btn user-stats__btn--follow" onClick={() => handleFollowUser(username,fullName, userId)}>
              Follow
            </button>
          )}
        </div>
        <div className="user-stats__data">
          <p>
            <span className="user-stats__data--count">{totalPosts}</span>
            <span className="user-stats__data--description">posts </span>
          </p>
          <p>
            <span className="user-stats__data--count">{followers}</span>
            <span className="user-stats__data--description">followers</span>
          </p>
          <p>
            <span className="user-stats__data--count">{followings}</span>
            <span className="user-stats__data--description">following</span>
          </p>
        </div>
        <p className="user-stats__fullname">{fullName}</p>
      </div>
    </div>
  );
};

export default Userstats;