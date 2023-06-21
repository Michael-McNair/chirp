import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';

import { register, login, userInfo, follow } from '../controllers/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/follow').post(auth, follow);
router.route('/user-info').get(auth, userInfo);

export default router;
