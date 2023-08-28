import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';

import {
  myInfo,
  follow,
  publicUserInfo,
  usersToFollow,
} from '../controllers/users.js';

router.route('/follow').post(auth, follow);
router.route('/my-info').get(auth, myInfo);
router.route('/user-info/:id').get(publicUserInfo);
router.route('/users-to-follow').get(usersToFollow);

export default router;
