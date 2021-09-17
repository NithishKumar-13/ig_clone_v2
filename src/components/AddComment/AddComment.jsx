import React, { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./AddComment.scss";

const AddComment = ({ addComment }) => {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(true);
  const [isEmojiShown, setIsEmojiShown] = useState(false);

  useEffect(() => {
    if (!comment.length) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [comment]);

  const toggleEmojiPicker = (evt) => {
    evt.preventDefault();
    setIsEmojiShown((prevSt) => !prevSt);
  };

  const add_comment = () => {
    addComment(comment);
    setComment("");
  };

  return (
    <>
      <div className="add-comment">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleEmojiPicker}
          className="add-comment__emoji"
          viewBox="0 0 512 512"
        >
          <title>Happy</title>
          <circle cx="184" cy="232" r="24" />
          <path d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 017.82-10.17h175.69a8 8 0 017.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83z" />
          <circle cx="328" cy="232" r="24" />
          <circle
            cx="256"
            cy="256"
            r="208"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
        </svg>
        <input
          value={comment}
          onKeyDown={(evt) => {
            if (evt.code === "Enter") {
              add_comment();
            }
          }}
          onChange={(evt) => setComment(evt.target.value)}
          className="add-comment__input"
          type="text"
          placeholder="Add comment"
        />
        <button
          onClick={add_comment}
          className={`add-comment__btn ${
            isError ? "add-comment__btn--disabled" : "add-comment__btn--active"
          }`}
        >
          Post
        </button>
      </div>
      {isEmojiShown && (
        <div className="emoji-picker">
          <Picker
            title="Pick your emoji..."
            emoji="point_up"
            onSelect={(emoji) => setComment(comment + emoji.native)}
          />
        </div>
      )}
    </>
  );
};

export default AddComment;