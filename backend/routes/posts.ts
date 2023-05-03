const express = require('express');
const router = express.Router();

import {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/posts';

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getSinglePost).delete(deletePost).patch(updatePost);

module.exports = router;
