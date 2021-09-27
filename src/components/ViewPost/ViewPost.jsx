import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Comments from '../Comments/Comments'
import AddComment from '../AddComment/AddComment'
import { useParams } from 'react-router-dom'
import './ViewPost.scss'

const ViewPost = () => {
    const { postId } = useParams()
    const [postInfo, setPostInfo] = useState([])

    useEffect(() => {
        const fetch_post = async() => {
            const response = await axios.get(`http://localhost:8080/p/${postId}`)
            setPostInfo(response.data[0])
        }
        fetch_post()
    },[postId])

    return (
      <>
        <Navbar />
        <div className="view-post">
          <div className="post-container">
            <div className="post-container__left">
              <img
                src={postInfo.img_url}
                className="post-container__img"
                alt="user post"
              />
            </div>
            <div className="post-container__right">
              <div className="user">
                <img
                  className="user__profile"
                  src={
                    "https://images.pexels.com/photos/4100748/pexels-photo-4100748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  }
                  alt="user profile"
                />
                <p className="user__username">{postInfo.author}</p>
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
              </div>
              <Comments commentFor={postInfo.post_id} />
              <AddComment />
            </div>
          </div>
        </div>
      </>
    );
}

export default ViewPost