import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import asyncWrapper from '../middleware/async-wrapper.js';

const register = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(201).json({ name: user.name, token: token });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token: token });
});

export { register, login };
