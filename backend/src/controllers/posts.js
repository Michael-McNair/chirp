import Post from '../models/Post.js';
import User from '../models/User.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';
import asyncWrapper from '../middleware/async-wrapper.js';

const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate('createdBy')
    .sort({ createdAt: -1 });
  res.status(200).json({ success: true, posts });
};

const getFollowingPosts = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId).populate('following');

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  const userIds = user.following.map((user) => user._id);

  const posts = await Post.find({ createdBy: { $in: userIds } })
    .populate('createdBy')
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, posts });
};

const createPost = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;

  const post = await Post.create(req.body);

  res.status(201).json({ success: true, post });
});

const deletePost = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOneAndDelete({ _id: postId, createdBy: userId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(200).json({ success: true, id: post.id });
});

const updatePost = asyncWrapper(async (req, res) => {
  const {
    body: { textContent },
    user: { userId },
    params: { id: postId },
  } = req;

  if (textContent === '') {
    throw new BadRequestError('Text content can not be empty');
  }

  const post = await Post.findOneAndUpdate(
    { _id: postId, createdBy: userId },
    { textContent: textContent },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res
    .status(200)
    .json({ success: true, post: { textContent: post.textContent } });
});

export { getAllPosts, getFollowingPosts, createPost, deletePost, updatePost };
