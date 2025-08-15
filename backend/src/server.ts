import express from 'express';
import dotenv from "dotenv";

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from "path"
import cookieParser from "cookie-parser";

import connectToMongoDB from './db/connectToMongoDB.js';

import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import reviewRoutes from './routes/review.routes.js'

const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`)
}); 