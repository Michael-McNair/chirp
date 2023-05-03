import express from 'express';
const router = express.Router();

import {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/posts.js';

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getSinglePost).delete(deletePost).patch(updatePost);

export default router;
