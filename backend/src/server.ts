import express from 'express';
import dotenv from "dotenv";

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import connectToMongoDB from './db/connectToMongoDB.js';

import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import reviewRoutes from './routes/review.routes.js'

const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`)
}); 