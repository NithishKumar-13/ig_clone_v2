const express = require('express')
const router = express.Router()

const postsController = require('../controllers/postsController')

// GET FOLLOWING USERS POST
router.get('/following-users/posts/:id', postsController.getFollowingUsersPost)

// GET POSTS POSTED BY PARTICULAR USER
router.get('/posts/:username', postsController.getUserPost)

// GET POST BY POST_ID
router.get('/p/:postId', postsController.getPost)

// DELETE A POST
router.delete('/p/:postId', postsController.deletePost)


module.exports = router