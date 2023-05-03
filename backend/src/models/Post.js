import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create schema for todo
const PostSchema = new Schema({
  textContent: {
    type: String,
    required: [true, 'The post text field is required'],
  },
});

export default mongoose.model('posts', PostSchema);
