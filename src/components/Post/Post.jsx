import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import ViewPost from "../ViewPost/ViewPost";
import Comments from "../Comments/Comments";
import AddComment from "../AddComment/AddComment";
import "./Post.scss";

const Post = ({ img_url, author, likes, post_id, is_liked }) => {
  const {
    user: { username },
  } = useAuth();
  const { isOpen, setIsOpen } = usePost()
  const history = useHistory()
  const [totalLikes,setTotalLikes] = useState(0)

  useEffect(() => {
    const get_likes = async() => {
      const response = await axios.get(`http://localhost:8080/likes/${post_id}`);
      setTotalLikes(response.data.length);
    }
    get_likes()
  },[post_id])

  const handleLike = async (postid) => {
    await axios.post(`http://localhost:8080/likes`, { username, post_id: postid });
  };

  const addComment = async (comment) => {
    await axios.post(`http://localhost:8080/comments`, {
      comment,
      username,
      post_id,
    });
  };
 
  const handleViewPost = () => {
    setIsOpen(prevSt => !prevSt)
    history.push(`/p/${post_id}`)
  }

  return (
    <>
      <div className="post">
        <header className="post__header">
          <Link to={`/profile/${author}`}>
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="user profile"
              className="post__avatar"
            />
          </Link>
          <p className="post__user-name">{author}</p>
          <svg
            className="post__action post__action--dots"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>Ellipsis Horizontal</title>
            <circle
              cx="256"
              cy="256"
              r="32"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <circle
              cx="416"
              cy="256"
              r="32"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <circle
              cx="96"
              cy="256"
              r="32"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="32"
            />
          </svg>
        </header>
        <img
          src={img_url}
          alt="post"
          className="post__img"
          onClick={handleViewPost}
        />
        <div className="post__actions">
          {!is_liked ? (
            <svg
              onClick={() => handleLike(post_id)}
              className="post__action post__action--likes"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <title>Heart</title>
              <path
                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
          ) : (
            <svg
              className="post__action post__action--likes"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <title>Heart Filled</title>
              <path
                fill="#ED4956"
                d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z"
              />
            </svg>
          )}

          <svg
            className="post__action post__action--comments"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>Chatbubble</title>
            <path
              d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="32"
            />
          </svg>
          <svg
            className="post__action post__action--share"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>Paper Plane</title>
            <path
              d="M53.12 199.94l400-151.39a8 8 0 0110.33 10.33l-151.39 400a8 8 0 01-15-.34l-67.4-166.09a16 16 0 00-10.11-10.11L53.46 215a8 8 0 01-.34-15.06zM460 52L227 285"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            />
          </svg>
        </div>
        <footer className="post__footer">
          <p className="post__like-counts">
            {totalLikes} likes {post_id}
          </p>
          <div className="post__caption">
            <p className="post__user-name">{author}</p>
            <p className="post__comment-title">
              This is an awesome post {is_liked ? "yes" : "no"}
            </p>
          </div>
        </footer>
        <Comments commentFor={post_id} />
        <AddComment addComment={addComment} />
      </div>
      {isOpen && <ViewPost />}
    </>
  );
};

export default Post;