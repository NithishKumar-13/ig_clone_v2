const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

const getFollowingUsersPost = async(req,res,next) => {
     const { id } = req.params;
     try {
       const posts = await knex("posts")
         .join(
           "user_following",
           "posts.author",
           "user_following.following_username"
         )
         .select("*")
         .where({ user_id: id });
       return res.status(200).send(posts);
     } catch (err) {
       return res.status(400).send(err);
     }
}

const getUserPost = async(req,res,next) => {
     const { username } = req.params;
     try {
       const POSTS = await knex
         .from("posts")
         .select("*")
         .where({ author: username });
       return res.status(200).send(POSTS);
     } catch (err) {
       return res.status(400).send(err);
     }
}

const getPost = async(req,res,next) => {
      const { postId } = req.params;
      try {
        const POST = await knex
          .from("posts")
          .select("*")
          .where({ post_id: postId });
        res.status(200).send(POST);
      } catch (err) {
        return res.status(400).send(err);
      }
}

const deletePost = async(req,res,next) => {
      const { postId } = req.params;
      try {
        await knex("posts").where({ post_id: postId }).del();
        return res.status(200).json({ message: "Post deleted successfully!!" });
      } catch (err) {
        return res.status(400).send(err);
      }
}

module.exports = {
    getFollowingUsersPost,
    getUserPost,
    getPost,
    deletePost
}