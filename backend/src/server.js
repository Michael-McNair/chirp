import express from 'express';
const app = express();
import connectDB from './connectDB.js';
import * as dotenv from 'dotenv';
dotenv.config();

// routes
import postsRoute from './routes/posts.js';
import authRoute from './routes/auth.js';

// middleware
import errorHandler from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';
import auth from './middleware/authentication.js';

app.use(express.json());

// routes
app.use('/api/v1/posts', auth, postsRoute);
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
