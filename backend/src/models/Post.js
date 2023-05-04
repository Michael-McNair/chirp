import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  textContent: {
    type: String,
    maxLength: [50, 'Message must be 50 characters or shorter'],
    required: [true, 'Please provide text content'],
  },
});

export default mongoose.model('posts', PostSchema);
