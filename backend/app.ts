import express from 'express';
const app = express();
import connectDB from './connectDB';
require('dotenv').config();

// routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

// middleware
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

app.use(express.json());

// routes
app.use('/api/v1/posts', postsRoute);
app.use('/api/v1', authRoute);

// middleware
app.use(errorHandler);
app.use(notFound);

// server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();

// to fix stupid typescript error
export {};
