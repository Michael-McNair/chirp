import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  textContent: {
    type: String,
    maxLength: [50, 'Message must be 50 characters or shorter'],
    required: [true, 'Please provide text content'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
});

export default mongoose.model('posts', PostSchema);
