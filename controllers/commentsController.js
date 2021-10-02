const bodyParser = require("body-parser");
const mysql = require("mysql");
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

const getComment = async(req,res,next) => {
     const { id } = req.params;
     try {
       const comments = await knex
         .from("comments")
         .select("*")
         .where({ post_id: id });
       return res.status(200).send(comments);
     } catch (err) {
       return res.status(400).send(err);
     }
}

const postComment = async(req,res,next) => {
     const { comment, username, post_id } = req.body;
     knex("comments")
       .insert({ comment, username, post_id })
       .then((data) => {
         res.status(200).json({ message: "Comment posted successfully!" });
       })
       .catch((err) => {
         console.log(err);
         res.status(400).send("Something went wrong!");
       })
       .finally(() => knex.destroy());
}

const postLike = async(req,res,next) => {
    const { post_id, username } = req.body;
    try {
      const response = await knex("likes").insert({ post_id, username });
      const response2 = await knex("posts")
        .where({ post_id })
        .update({ is_liked: true });
      return res.status(200).send("Likes updated");
    } catch (err) {
      return res.status(400).send("Likes couldn't be updated");
    }
}

const getLike = async(req,res,next) => {
     const { postId } = req.params;
     try {
       const LIKES = await knex.from("likes").where({ post_id: postId });
       return res.status(200).send(LIKES);
     } catch (err) {
       return res.status(400).send(err);
     }
}

module.exports = {
    getComment,
    postComment,
    postLike,
    getLike
}