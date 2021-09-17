import React from "react";
import "./Userstats.scss";

const Userstats = ({ username, totalPosts, followers, followings, fullName, isAdmin, isFollowing }) => {

  return (
    <div className="user-stats">
      <div className="user-stats__left">
        <img
          className="user-stats__img"
          src="https://images.pexels.com/photos/4100748/pexels-photo-4100748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
            <button className="user-stats__btn user-stats__btn--unfollow">
              Unfollow
            </button>
          ) : (
            <button className="user-stats__btn user-stats__btn--follow">
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