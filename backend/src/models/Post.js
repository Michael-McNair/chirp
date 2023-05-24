import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    textContent: {
      type: String,
      maxLength: [300, 'Message must be 300 characters or shorter'],
      required: [true, 'Please provide text content'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('posts', PostSchema);
