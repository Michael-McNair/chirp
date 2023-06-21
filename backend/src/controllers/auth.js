import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import asyncWrapper from '../middleware/async-wrapper.js';

const register = asyncWrapper(async (req, res) => {
  const colors = ['0079FF', '00DFA2', 'F6FA70', 'FF0060'];
  req.body.color = colors[Math.floor(Math.random() * colors.length)];

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

const userInfo = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.status(200).json({
    color: user.color,
    email: user.email,
    name: user.name,
    id: user.id,
  });
});

const follow = asyncWrapper(async (req, res) => {
  const { userIdToFollow } = req.body;
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the user to be followed
  const userToFollow = await User.findById(userIdToFollow);
  if (!userToFollow) {
    return res.status(404).json({ message: 'User to follow not found' });
  }

  // Check if the user is already following the target user
  if (user.following.includes(userIdToFollow)) {
    return res
      .status(400)
      .json({ message: 'User is already following this user' });
  }

  // Add the user ID to the following array
  user.following.push(userIdToFollow);
  await user.save();

  res.status(200).json({ message: 'User followed successfully' });

  res.status(200).json({ user });
});

export { register, login, userInfo, follow };
