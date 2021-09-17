import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Post from "../Post/Post";

const TimeLine = () => {
  const [posts, setPosts] = useState([]);
  const {
    user: { id },
  } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8080/following-users/posts/${id}`
      );
      setPosts(response.data);
    }
    fetchData();
  }, [id]);

  return <div>{posts.length && posts.map((post) => <Post {...post} />)}</div>;
};

export default TimeLine;
