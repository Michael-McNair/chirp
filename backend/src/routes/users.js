import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';

import { myInfo, follow, publicUserInfo } from '../controllers/users.js';

router.route('/follow').post(auth, follow);
router.route('/my-info').get(auth, myInfo);
router.route('/user-info/:id').get(publicUserInfo);

export default router;
