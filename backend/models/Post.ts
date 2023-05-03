const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const PostSchema = new Schema({
  textContent: {
    type: String,
    required: [true, 'The post text field is required'],
  },
});

// Create model for todo
const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
