import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
      <div className="view-post">
        <div className="post-container">
          <div className="post-container__left">
            <img src={""} className="post-container__img" alt="user post" />
          </div>
          <div className="post-container__right"></div>
        </div>
      </div>
    );
}

export default ViewPost