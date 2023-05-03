const mongoose = require('mongoose');

export default function connectDB(url) {
  return mongoose.connect(url, {});
}
