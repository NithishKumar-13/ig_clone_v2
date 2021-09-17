import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comments.scss";

const Comments = ({ commentFor }) => {
  const [comments, setComments] = useState([]);
  const [isCommentsShown, setIsCommentsShown] = useState(false);

  useEffect(() => {
    const getComment = async () => {
      const response = await axios.get(
        `http://localhost:8080/comments/${commentFor}`
      );
      setComments(response.data);
    };
    getComment();
  }, [commentFor]);

  return (
    <div className="comments">
      <small onClick={() => setIsCommentsShown(true)}>
        View all {comments.length} comments
      </small>
      {isCommentsShown
        ? comments.map((comment) => {
            return (
              <div className="comments__user">
                <p className="comments__user--username">{comment.username}</p>
                <p className="comments__user--comment">{comment.comment}</p>
              </div>
            );
          })
        : comments
            .map((comment) => {
              return (
                <div className="comments__user">
                  <p className="comments__user--username">{comment.username}</p>
                  <p className="comments__user--comment">{comment.comment}</p>
                </div>
              );
            })
            .slice(0, 2)}
    </div>
  );
};

export default Comments;