const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middlewares/auth');

// Post routes
router.get('/', postController.getAllPosts); // Public route to get all posts
router.get('/:id', postController.getPostById); // Public route to get post by id

// Protected routes
router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);
router.post('/:id/like', protect, postController.toggleLike);
router.post('/:id/comments', protect, postController.addComment);
router.delete('/:id/comments/:commentId', protect, postController.deleteComment);

module.exports = router;
