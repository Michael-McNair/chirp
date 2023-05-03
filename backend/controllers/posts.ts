import Post from '../models/Post.js';

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.log(err);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOne({ _id: postID });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, msg: `id: ${postID} not found` });
    }

    res.status(200).json({ success: true, post });
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, post });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOneAndDelete({ _id: postID });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, msg: `id: ${postID} not found` });
    }
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  res.send('patch');
};

export { getAllPosts, getSinglePost, createPost, deletePost, updatePost };
