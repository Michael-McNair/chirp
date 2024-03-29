import express, { application } from 'express';
const app = express();
import connectDB from './connectDB.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// routes
import postsRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';

// middleware
import errorHandler from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';

// cors
app.use(cors());
app.options('*', cors());

app.use(express.json());

// routes
app.use('/api/v1/posts', postsRoute);
app.use('/api/v1', authRoute);
app.use('/api/v1', usersRoute);

// middleware
app.use(notFound);
app.use(errorHandler);

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
