const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// GET ALL USERS
router.get('/users', userController.getAllUsers)

// GET USER DETAILS FOR A SINGLE USER
router.get('/users/:username', userController.getUserDetails)

// GET FOLLOWINGS FOR A PARTICULAR USER
router.get('/users/followings/:username', userController.getFollowingsUsers)

// GET FOLLOWERS FOR A PARTICULAR USER
router.get('/users/followers/:username' , userController.getFollowersUsers)

// GET USER IMAGE
router.get('/image/:user', userController.getUserImage)

// GET ADMIN FOLLOWINGS
router.get('/admin/followings/:username' , userController.getAdminFollowings)

// SIGNUP
router.post('/user/signup', userController.userSignup)

// LOGIN
router.post('/user/login', userController.userLogin)

// FOLLOW REQUEST
router.post('/request/follow', userController.requestFollow)

// UNFOLLOW REQUEST
router.post('/request/unfollow', userController.requestUnfollow)


module.exports = router