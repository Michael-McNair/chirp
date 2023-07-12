import express from 'express';
import auth from '../middleware/authentication.js';
const router = express.Router();

import {
  getAllPosts,
  getFollowingPosts,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/posts.js';

router.route('/').get(getAllPosts).post(auth, createPost);
router.route('/following').post(getFollowingPosts);
router.route('/:id').delete(auth, deletePost).patch(auth, updatePost);

export default router;
