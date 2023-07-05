import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';

import {
  register,
  login,
  myInfo,
  follow,
  publicUserInfo,
} from '../controllers/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/follow').post(auth, follow);
router.route('/my-info').get(auth, myInfo);
router.route('/user-info/:id').get(publicUserInfo);

export default router;
