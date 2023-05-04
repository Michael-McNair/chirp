import Post from '../models/Post.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';
import asyncWrapper from '../middleware/async-wrapper.js';

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ success: true, posts });
};

const getSinglePost = asyncWrapper(async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(200).json({ success: true, post });
});

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

export { getAllPosts, getSinglePost, createPost, deletePost, updatePost };
