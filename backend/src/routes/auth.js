import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';

import { register, login, loginInfo } from '../controllers/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/login-info').get(auth, loginInfo);

export default router;
