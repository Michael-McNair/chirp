import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();

    res.status(201).json({ name: user.name, token: token });
  } catch (err) {
    // console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(400).send('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(200).json({ name: user.name, token: token });
};

export { register, login };
