const express = require('express');
const router = express.Router();

import { register, login } from '../controllers/auth';

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
