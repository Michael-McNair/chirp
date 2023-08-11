import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token does not start with Bearer' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Failed to verify token' });
  }
}
