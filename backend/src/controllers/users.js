import User from '../models/User.js';
import Post from '../models/Post.js';
import asyncWrapper from '../middleware/async-wrapper.js';

const myInfo = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    response: {
      color: user.color,
      email: user.email,
      name: user.name,
      id: user.id,
      following: user.following,
    },
  });
});

const follow = asyncWrapper(async (req, res) => {
  const { userIdToFollow } = req.body;
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: 'Could not find your data' });
  }

  const userToFollow = await User.findById(userIdToFollow);
  if (!userToFollow) {
    return res
      .status(404)
      .json({ success: false, message: 'User to follow not found' });
  }

  const isFollowing = user.following.includes(userIdToFollow);

  if (isFollowing) {
    // If the user is already following, remove them from the array
    user.following.pull(userIdToFollow);
  } else {
    // If not following, add the user to the array
    user.following.push(userIdToFollow);
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: isFollowing
      ? 'User unfollowed successfully'
      : 'User followed successfully',
  });
});

const publicUserInfo = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({ success: false });
  }

  const posts = await Post.find({ createdBy: req.params.id }).select(
    '_id textContent createdBy createdAt updatedAt'
  );

  res.status(200).json({
    success: true,
    response: {
      color: user.color,
      name: user.name,
      id: user.id,
      posts: posts,
    },
  });
});

const usersToFollow = asyncWrapper(async (req, res) => {
  const users = await User.find();

  const data = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      color: user.color,
      email: user.email,
    };
  });

  res.status(200).json({
    success: true,
    response: data,
  });
});

export { myInfo, follow, publicUserInfo, usersToFollow };
