const express = require("express");
const router = express.Router();

const commentsController = require('../controllers/commentsController')

// GET COMMENT FOR EACH POST
router.get("/comments/:id", commentsController.getComment);

 // POST A COMMENT 
router.post('/comments', commentsController.postComment)

// POST A LIKE
router.post('/likes', commentsController.postLike)

// GET A LIKE
router.get('/likes/:postId', commentsController.getLike)

module.exports = router