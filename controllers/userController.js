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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await knex("users").select("*");
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserDetails = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await knex.from("users").select("*").where({ username });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).json({ message: "Unknown user" });
  }
};

const getFollowingsUsers = async (req, res, next) => {
  const { username } = req.params;
  try {
    const FOLLOWING_USERS = await knex
      .from("user_following")
      .select("id", "following_id", "following_username", "following_fullName")
      .where({ username });
    return res.status(200).send(FOLLOWING_USERS);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getFollowersUsers = async (req, res, next) => {
  const { username } = req.params;
  try {
    const FOLLOWERS = await knex
      .from("user_followers")
      .select("*")
      .where({ username });
    return res.status(200).send(FOLLOWERS);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getUserImage = async (req, res, next) => {
  const { user } = req.params;
  try {
    const userImg = await knex
      .from("users")
      .select("user_img")
      .where({ username: user });
    res.status(200).send(userImg[0].user_img);
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
};

const getAdminFollowings = async (req, res, next) => {
  const { username } = req.params;
  try {
    const RESPONSE = await knex
      .from("user_following")
      .select("*")
      .where({ username });
    return res.status(200).send(RESPONSE);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const userSignup = async (req, res, next) => {
  const { username, email, password, full_name } = req.body;
  const EXISTING_USER = await knex("users")
    .select("username")
    .where({ username });
  if (EXISTING_USER.length) {
    return res.status(200).json({ message: "Username already taken!" });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT);
      await knex("users").insert({
        username,
        email,
        password: hashedPassword,
        full_name,
      });
      return res
        .status(200)
        .json({ message: "User registeration successful!" });
    } catch (err) {
      return res
        .status(200)
        .json({ message: "Error while registering user data!" });
    }
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const USER = await knex("users").select("*").where({ username });
  if (USER[0] !== undefined) {
    const match = await bcrypt.compare(password, USER[0].password);
    if (match) {
      res.json({ auth: true, user: USER[0] });
    } else {
      res.json({
        auth: false,
        message: `Sorry, your password was incorrect. Please double-check your password.`,
      });
    }
  } else {
    res.json({
      auth: false,
      message: `The username that you've entered doesn't belong to an account.Please check your username and try again.`,
    });
  }
};

const requestFollow = async (req, res, next) => {
  const {
    sender_username,
    sender_fullName,
    sender_id,
    receiver_username,
    receiver_fullName,
    receiver_id,
  } = req.body;
  knex("user_following")
    .insert({
      user_id: sender_id,
      username: sender_username,
      full_name: sender_fullName,
      following_id: receiver_id,
      following_username: receiver_username,
      following_fullName: receiver_fullName,
    })
    .then((data1) => {
      res.send("Data1 inserted successfully");
      knex("user_followers")
        .insert({
          user_id: receiver_id,
          username: receiver_username,
          follower_id: sender_id,
          follower_username: sender_username,
        })
        .then((response) => {
          return res.send("Data2 inserted successfully");
        })
        .catch((err) => {
          return res.send("Error while inserting Data2");
        });
    })
    .catch((err) => {
      return res.send("Error while inserting Data1");
    });
};

const requestUnfollow = async (req, res, next) => {
  const {
    sender_username,
    sender_fullName,
    sender_id,
    receiver_username,
    receiver_fullName,
    receiver_id,
  } = req.body;
  knex("user_following")
    .where({
      user_id: sender_id,
      username: sender_username,
      full_name: sender_fullName,
      following_id: receiver_id,
      following_username: receiver_username,
      following_fullName: receiver_fullName,
    })
    .del()
    .then(() => {
      res.send("Data deleted from the user_following successfully!!");
      knex("user_followers")
        .where({
          user_id: receiver_id,
          username: receiver_username,
          follower_id: sender_id,
          follower_username: sender_username,
        })
        .del()
        .then(() => {
          res.send("Data deleted from the user_followers successfully!!");
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getAllUsers,
  getUserDetails,
  getFollowingsUsers,
  getFollowersUsers,
  getUserImage,
  getAdminFollowings,
  userSignup,
  userLogin,
  requestFollow,
  requestUnfollow,
};
