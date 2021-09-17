import React from "react";
import "./Gallery.scss";

const Gallery = ({ posts }) => {
  return (
    <div className="gallery">
      {posts.map((post) => {
        return (
          <div className="gallery__post">
            <img className="gallery__img" src={post.img_url} alt="post" />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
